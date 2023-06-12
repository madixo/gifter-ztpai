import {
  ChangeEvent,
  cloneElement,
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import cn from "classnames";

import Button, {ButtonProps} from "components/common/Button/Button";
import {FaEye, FaPenSquare, FaPlus, FaTrash} from "react-icons/fa";

import styles from "./Table.module.scss";

export type TableActions = "create" | "edit" | "remove" | "view";

export interface TableColumn {
  id: string;
  title: string;
  key: string;
  renderCell?: (value: TableDataItemValue) => ReactNode;
  width?: "fit" | string;
}

export type TableActionOnClick = (
  event: MouseEvent<HTMLButtonElement>,
  row: TableDataRow,
) => void;

export interface TableAction
  extends Omit<ButtonProps, "children" | "onClick" | "label"> {
  id: TableActions;
  label?: string;
  onClick?: TableActionOnClick;
  children?: ReactNode;
}

export type TableOnRowSelect = (selectedRows: TableDataRow[]) => void;

export interface TableDataRow extends TableDataItem {
  rowIndex: number;
}

// export type TableDataItemValue = string | number | boolean | null;
export type TableDataItemValue = any;

export type TableDataItem = { [key: string]: TableDataItemValue };

// export interface TableDataStateItem extends TableDataItem {
//   isChecked: boolean;
//   rowIndex: number;
// }

export interface TableProps {
  className?: string;
  data: TableDataItem[];
  columns: TableColumn[];
  onRowSelect?: TableOnRowSelect;
  actions?: TableAction[];
}

const ADD_ACTION_TEXT = "Dodaj";
const EDIT_ACTION_TEXT = "Edytuj";
const REMOVE_ACTION_TEXT = "Usuń";
const VIEW_ACTION_TEXT = "Zobacz";

/*
TODO:
---------------------------------------
- auto calc column width
- better rwd
- internal table state (?)
*/

export default function Table(
  { className, columns, data, actions, onRowSelect }: TableProps,
) {
  const [selectedRows, setSelectedRows] = useState<TableDataRow[]>([]);
  // const [tableDataState, setTableDataState] = useState<TableDataStateItem[]>(
  //   data.map((item: TableDataItem, index) => ({
  //     ...item,
  //     isChecked: false,
  //     rowIndex: index,
  //   })),
  // );

  // Default attributes that will be added to the row element
  const defaultRowProps = {
    className: styles["table-row"],
    role: "row",
  };
  // Default props that will be added to cell element
  const defaultCellProps = {
    className: styles["table-col"],
    role: "cell",
  };
  // Default attributes that will be added to every action element
  const defaultActionProps = {
    className: styles["table-action"],
  };
  // Predefinied actions accessible by "id" key in passed "actions" prop
  const defaultActions = useMemo(() => ({
    create: (
      <Button label="Dodaj" icon={<FaPlus />} iconPlacement="left">
        {ADD_ACTION_TEXT}
      </Button>
    ),
    edit: (
      <Button label="Edytuj" icon={<FaPenSquare />} iconPlacement="left">
        {EDIT_ACTION_TEXT}
      </Button>
    ),
    remove: (
      <Button label="Usuń" icon={<FaTrash />} iconPlacement="left">
        {REMOVE_ACTION_TEXT}
      </Button>
    ),
    view: (
      <Button label="Zobacz" icon={<FaEye />} iconPlacement="left">
        {VIEW_ACTION_TEXT}
      </Button>
    ),
  }), []) satisfies Record<TableActions, ReactNode>;

  const renderCell = (item: TableDataItem, column: TableColumn) => {
    const itemValue = item?.[column.key];

    if (column.renderCell) {
      return column.renderCell(itemValue);
    }

    if (!itemValue) {
      return (
        <i
          dangerouslySetInnerHTML={{
            __html: `<!-- ${"Inavlid key or no key in object."} -->`,
          }}
        />
      );
    }

    if (typeof itemValue === "boolean") {
      return itemValue ? "true" : "false";
    }

    return itemValue;
  };

  const renderActions = (item: TableDataItem, rowIndex: number) => {
    const row: TableDataRow = { rowIndex, ...item };
    return actions?.map((action, index) => {
      /*
    Renders a custom action item. If the user decides
    to pass "children", other object keys such as "label"
    or "icon" - these will be ignored.
    */
      if (action.children) {
        return (
          <div {...defaultCellProps} key={index}>
            {action.children}
          </div>
        );
      }

      // Props that will be added to cloned base action button below
      const passedActionProps = {
        ...(
          action.onClick && {
            onClick: (e: MouseEvent<HTMLButtonElement>) =>
              action.onClick?.(e, row),
          }
        ),
        ...(action.label && { label: action.label }),
        ...(action.title && { onClick: action.title }),
        ...(action.icon && { onClick: action.icon }),
        ...(action.iconPlacement && { onClick: action.iconPlacement }),
      };

      const actionWithCustomProps = cloneElement(defaultActions[action.id], {
        ...defaultActionProps,
        ...passedActionProps,
      });

      return (
        <div {...defaultCellProps} key={index}>
          {actionWithCustomProps}
        </div>
      );
    });
  };

  const renderSelectOption = (item: TableDataItem, rowIndex: number) => {
    const updateSelectedRows = (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      const row: TableDataRow = { rowIndex, ...item };

      const filterExistingRows = (prevState: TableDataRow[]) => {
        // First things first - add row when prevState is empty
        if (prevState.length <= 0) {
          return [row];
        }

        const selectedIndexInState = prevState.findIndex(i => i.rowIndex === rowIndex);
        const doesSelectedExist = selectedIndexInState > -1;

        // Add another only if checkbox is checked
        if (!doesSelectedExist && isChecked) {
          return [
            ...prevState,
            row
          ]
        }

        // Remove one
        if (doesSelectedExist && !isChecked) {
          prevState.splice(selectedIndexInState, 1);
        }

        return prevState;
      };

      setSelectedRows((prevState) => [
        ...filterExistingRows(prevState),
      ]);
    };

    return (
      <div
        {...defaultCellProps}
        className={cn(
          defaultCellProps?.className,
          styles["table-checkbox-cell"],
        )}
      >
        <input
          onChange={updateSelectedRows}
          type="checkbox"
          name={`row_${rowIndex}`}
        />
      </div>
    );
  };

  useEffect(() => {
    onRowSelect && onRowSelect(selectedRows);
  }, [selectedRows, onRowSelect]);

  return (
    <div role="table" className={cn(styles.table, className)}>
      {data.map((item, index) => (
        /* Render rows. */
        <div key={index} {...defaultRowProps}>
          {
            /* Renders a checkbox that allows the user to select a line. */
            renderSelectOption(item, index)
          }
          {columns.map((column) => (
            <div
              {...defaultCellProps}
              style={{
                minWidth: column.width,
                width: column.width,
              }}
              key={column.key}
            >
              {renderCell(item, column)}
            </div>
          ))}
          {
            /* Last cell is alwayes reserved for row actions. */


              <div className={styles["table-actions"]}>
                {renderActions(item, index)}
              </div>

          }
        </div>
      ))}
    </div>
  );
}
