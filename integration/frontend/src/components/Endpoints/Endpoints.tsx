import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import {
  addEndpoints,
  deleteEndpoints,
  editEndpoints,
  getSystems,
  getNetworks,
  getContours, getEndpoints,
} from "../../controllers/EndpointsController";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Endpoints.module.sass";
import {checkIsArrayDataFromModal, uniqArrayForModal} from "../../utills/dataUtil";

const columns: GridColDef[] = [
  { field: "name", headerName: "Название", type: "string" },
  { field: "ip", headerName: "IP адрес", type: "string" },
  { field: "port", headerName: "Порт", type: "string" },
  { field: "network", headerName: "Сеть" },
  { field: "networkSelect", headerName: "Сеть", type: "select" },
  { field: "contour", headerName: "Контур" },
  { field: "contourSelect", headerName: "Контур", type: "select" },
  { field: "system", headerName: "Система" },
  { field: "systemSelect", headerName: "Система", type: "select" },
  { field: "desc", headerName: "Описание", type: "string" },
];

const Endpoints: React.FC = () => {
  const [responsibleSelect, setResponsible] = React.useState<any>([]);
  const [networkSelect, setNetwork] = React.useState<any>([]);
  const [contourSelect, setContour] = React.useState<any>([]);
  const [systemSelect, setSystem] = React.useState<any>([]);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const [editData, setEditData] = React.useState<any>(null);

  const fetchNetwork = React.useCallback(async () => {
    const networkSelect = await getNetworks();
    if (networkSelect.length) {
      setNetwork(networkSelect);
    } else {
      setNetwork([]);
    }
  }, []);

  const fetchContour = React.useCallback(async () => {
    const contourSelect = await getContours();
    if (contourSelect.length) {
      setContour(contourSelect);
    } else {
      setContour([]);
    }
  }, []);

  const fetchSystem = React.useCallback(async () => {
    const systemSelect = await getSystems();
    if (systemSelect.length) {
      setSystem(systemSelect);
    } else {
      setSystem([]);
    }
  }, []);

  const fetchData = React.useCallback(async () => {
    fetchNetwork();
    fetchContour();
    fetchSystem();
    const dataTable = await getEndpoints();
    if (dataTable.length) {
      setData(dataTable);
    } else {
      setData([]);
    }
  }, [fetchNetwork, fetchSystem, fetchContour]);


  const handleOpen = React.useCallback((id?: string) => {
    setOpen((openModal) => !openModal);
    setId(id);
  }, []);

  const handleSetCurrentData = React.useCallback((currentData: any) => {
    let newObj = uniqArrayForModal(networkSelect, currentData, "network");
    newObj = uniqArrayForModal(contourSelect, newObj, "contour");
    newObj = uniqArrayForModal(systemSelect, newObj, "system");
    setEditData(newObj);
    setEditData(currentData);
  }, [networkSelect, contourSelect, systemSelect]);

  const handleAdd = React.useCallback((data: any) => {
    addEndpoints(
        data.name,
        data.ip,
        data.port,
        checkIsArrayDataFromModal(data.networkSelect),
        checkIsArrayDataFromModal(data.contourSelect),
        checkIsArrayDataFromModal(data.systemSelect),
        data.desc,
    );
    fetchData();
  }, [fetchData, networkSelect, contourSelect, systemSelect]);

  const handleEdit = React.useCallback(
      (data: any) => {
        editEndpoints(
            data.id,
            data.name,
            data.ip,
            data.port,
            checkIsArrayDataFromModal(data.networkSelect),
            checkIsArrayDataFromModal(data.contourSelect),
            checkIsArrayDataFromModal(data.systemSelect),
            data.desc,
        );
        fetchData();
        setOpen(false);
      },
      [fetchData, networkSelect, contourSelect, systemSelect]
  );

  const handleDelete = React.useCallback(async () => {
    if (id) {
      const data = await deleteEndpoints(id);
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
        <h2 className={styles.endpoints_title}>Endpoints</h2>
        <TableData
            columns={columns}
            openModal={open}
            data={editData || {
              networkSelect: networkSelect,
              contourSelect: contourSelect,
              systemSelect: systemSelect,
            }}
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
                <TableCell align="left">{row.ip}</TableCell>
                <TableCell align="left">{row.port}</TableCell>
                <TableCell align="left">{row.network}</TableCell>
                <TableCell align="left">{row.contour}</TableCell>
                <TableCell align="left">{row.system}</TableCell>
                <TableCell align="left">{row.desc}</TableCell>
              </TableRow>
          ))}
        </TableData>
      </>
  );
};
export default Endpoints;