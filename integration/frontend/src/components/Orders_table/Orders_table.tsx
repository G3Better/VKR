import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import {
  getOrders,
} from "../../controllers/Orders_tableController";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Orders_table.module.sass";
import {checkIsArrayDataFromModal, uniqArrayForModal} from "../../utills/dataUtil";
import {getResponsible, getSystems} from "../../controllers/SystemsController";

const columns: GridColDef[] = [
  { field: "id", headerName: "Номер заявки", type: "number" },
  { field: "title", headerName: "Заголовок", type: "string" },
  { field: "source", headerName: "Система-источник", type: "string" },
  { field: "dest", headerName: "Система-получатель", type: "string" },
  { field: "status", headerName: "Статус", type: "string" },
];

const Orders_table: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const [editData, setEditData] = React.useState<any>(null);

  const fetchData = React.useCallback(async () => {
    const dataTable = await getOrders();
    if (dataTable.length) {
      setData(dataTable);
    } else {
      setData([]);
    }
  }, []);

  const handleOpen = React.useCallback((id?: string) => {
    setOpen((openModal) => !openModal);
    setId(id);
  }, []);

  const handleSetCurrentData = React.useCallback((currentData: any) => {
    setEditData(currentData);
  }, []);

  const handleAdd = React.useCallback((data: any) => {
    fetchData();
  }, [fetchData]);

  const handleCreate = React.useCallback((data: any) => {
    fetchData();
  }, [fetchData]);

  const handleEdit = React.useCallback(
      (data: any) => {
        fetchData();
        setOpen(false);
      },
      [fetchData]
  );

  const handleDelete = React.useCallback(async () => {

  }, [fetchData, id]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData, open]);
  return (
      <>
        <Header />
        <h2 className={styles.systems_title}>Orders</h2>
        <TableData
            isShowAddBtn={false}
            isShowCreateMode={true}
            isShowEditBtns={false}
            isShowGetModel={true}
            row_id={id}
            columns={columns}
            openModal={open}
            data={data}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
            handleClose={handleOpen}
            handleDelete={handleDelete}>
          {data.length &&
              data.map((row: any, index: number) => (
                  <TableRow
                      key={`${row.id}${index}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className={styles.table_cell}
                      onClick={() => {
                        handleOpen(row.id);
                        handleSetCurrentData(row);
                      }}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.source}</TableCell>
                    <TableCell align="left">{row.dest}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                  </TableRow>
              ))}
        </TableData>
      </>
  );
};
export default Orders_table;
