import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import {
  addStatus,
  deleteStatus,
  editStatus,
  getStatus,
} from "../../controllers/StatusController";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Status.module.sass";
import {checkIsArrayDataFromModal, uniqArrayForModal} from "../../utills/dataUtil";

const columns: GridColDef[] = [
  { field: "name", headerName: "Статус", type: "string" }
];

const Status: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const [editData, setEditData] = React.useState<any>(null);
  const fetchData = React.useCallback(async () => {
    const dataTable = await getStatus();
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
    addStatus(
        data.name,
    );
    fetchData();
  }, [fetchData]);

  const handleEdit = React.useCallback(
      (data: any) => {
        editStatus(
            data.id,
            data.name,
        );
        fetchData();
        setOpen(false);
      },
      [fetchData]
  );

  const handleDelete = React.useCallback(async () => {
    if (id) {
      const data = await deleteStatus(id);
      await fetchData();
      if (data) setOpen(false);
    }
  }, [fetchData, id]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData, open]);
  return (
      <>
        <Header />
        <h2 className={styles.systems_title}>Status</h2>
        <TableData
            columns={columns}
            openModal={open}
            data={editData}
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
                    <TableCell align="left">{row.name}</TableCell>
                  </TableRow>
              ))}
        </TableData>
      </>
  );
};
export default Status;