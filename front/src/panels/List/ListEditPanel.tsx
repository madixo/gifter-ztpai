import { useCallback, useState } from "react";

import { useParams } from "react-router-dom";

import { useList } from "api/useList";
import Badge from 'components/common/Badge/Badge';
import Button from "components/common/Button/Button";
import Panel from "components/common/Panel/Panel";
import Table, { TableActionOnClick, TableDataItemValue, TableDataRow, TableOnRowSelect } from "components/common/Table/Table";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function ListEditPanel() {
  const [selectedRows, setSelectedRows] = useState<TableDataRow[]>();
  const [removeActionBtnDisabled, setRemoveActionBtnDisabled] = useState(true);
  type ParamsType = {
    id: string;
  };
  const {id} = useParams<ParamsType>();
  const [data, loading, error] = useList({id});

  const removeSelectedItems = () => {
    console.log("Remove selected: ", selectedRows);
  };

  const addItem = () => {
    console.log("Add a new item");
  };

  const handleRowSelect: TableOnRowSelect = useCallback((rows) => {
    setSelectedRows(rows);
    setRemoveActionBtnDisabled(rows.length <= 0);
  }, []);

  const actions = [
    <Button
      onClick={removeSelectedItems}
      danger
      icon={<FaTrash />}
      iconPlacement="left"
      disabled={removeActionBtnDisabled}
      label="Usuń"
      title="Usuń zaznaczone przedmioty"
    >
      Usuń
    </Button>,
    <Button
      onClick={addItem}
      primary
      icon={<FaPlus />}
      iconPlacement="left"
      label="Dodaj"
      title="Dodaj nowy przedmiot"
    >
      Dodaj przedmiot
    </Button>,
  ];

  const columns = [
    {
      id: "itemName",
      title: "Nazwa",
      key: "name",
      width: "300px",
    },
    {
      id: "itemDescription",
      title: "Opis produktu",
      key: "description",
    },
    {
      id: "itemPrice",
      title: "Cena produktu",
      key: "price",
      renderCell: (value: TableDataItemValue) => value,
    },
    {
      id: "itemReserved",
      title: "Czy zarezerwowany",
      key: "taken",
      renderCell: (value: TableDataItemValue) => (
        value && <Badge>Zarezerwowane</Badge>
      ),
      width: "200px",
    },
  ];

  const editAction: TableActionOnClick = (e, row) => {
    console.log("Edit", row);
  };

  const removeAction: TableActionOnClick = (e, row) => {
    console.log("Remove", row);
  };


  return (
    <Panel title="Lista przedmiotów" actions={actions}>
      {loading && "Trwa wczytywanie..."}
      {error && error?.message}
      {
        data && <Table
          onRowSelect={handleRowSelect}
          className="panel-table"
          columns={columns}
          data={data.gifts}
          actions={[
            {
              id: "edit",
              onClick: editAction,
            },
            {
              id: "remove",
              onClick: removeAction,
            },
          ]}
        />
      }
    </Panel>
  );
}
