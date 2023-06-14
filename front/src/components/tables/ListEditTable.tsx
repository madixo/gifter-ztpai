import {
    TableColumn,
    TableDataItem,
    TableOnRowSelect
} from "components/common/Table/Table";


export interface ListEditTableProps {
    handleRowSelect: TableOnRowSelect;
    data: TableDataItem[],
    columns: TableColumn[],
}

export default function ListEditTable({handleRowSelect, data, columns}: ListEditTableProps) { return <></>; }
