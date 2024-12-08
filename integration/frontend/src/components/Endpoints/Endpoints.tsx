import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import {
  addEndpoints,
  deleteEndpoints,
  editEndpoints,
  getEndpoints,
  getNetworks,
  getContours,
  getSystems
} from "../../controllers/EndpointsController";
import {
  checkIsArrayDataFromModal,
  uniqArrayForModal,
} from "../../utills/dataUtil";
import Header from "../Header/Header";
import styles from "./Endpoints.module.sass";

const columns: GridColDef[] = [
  { field: "name", headerName: "URL", type: "string" },
  { field: "ip", headerName: "IP адрес", type: "string" },
  { field: "port", headerName: "Порт", type: "integer" },
  { field: "network", headerName: "Сеть" },
  { field: "networkSelect", headerName: "Сеть", type: "select" },
  { field: "contour", headerName: "Контур" },
  { field: "contourSelect", headerName: "Контур", type: "select" },
  { field: "system", headerName: "Система" },
  { field: "systemSelect", headerName: "Система", type: "select" },
  { field: "desc", headerName: "Описание", type: "string" },
];

const Endpoints: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [networkSelect, setNetwork] = React.useState<any>([]);
  const [contourSelect, setContour] = React.useState<any>([]);
  const [systemSelect, setSystem] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const [editData, setEditData] = React.useState<any>(null);

  const fetchDataNetworks = React.useCallback(async () => {
    const network = await getNetworks();
    if (network.length) {
      setNetwork(network);
    } else {
      setNetwork([]);
    }
  }, []);

  const fetchDataContour = React.useCallback(async () => {
    const contour = await getContours();
    if (contour.length) {
      setContour(contour);
    } else {
      setContour([]);
    }
  }, []);

  const fetchDataSystem = React.useCallback(async () => {
    const system = await getSystems();
    if (system.length) {
      setSystem(system);
    } else {
      setSystem([]);
    }
  }, []);

  const fetchData = React.useCallback(async () => {
    const dataTable = await getEndpoints();
    fetchDataNetworks();
    fetchDataContour();
    fetchDataSystem();
    if (dataTable.length) {
      setData(dataTable);
    } else {
      setData([]);
    }
  }, [fetchDataNetworks, fetchDataContour, fetchDataSystem]);

  const handleOpen = React.useCallback((id?: string) => {
    setOpen((openModal) => !openModal);
    setId(id);
  }, []);

  const handleSetCurrentData = React.useCallback(
    (currentData: any) => {
      let newObj = uniqArrayForModal(networkSelect, currentData, "network");
      newObj = uniqArrayForModal(contourSelect, currentData, "contour");
      newObj = uniqArrayForModal(systemSelect, currentData, "system");
      setEditData(newObj);
    },
    [networkSelect, contourSelect, systemSelect]
  );

  const handleAdd = React.useCallback((data: any) => {
    addEndpoints(
        data.name,
        data.ip,
        data.port,
        checkIsArrayDataFromModal(data.networkSelect),
        checkIsArrayDataFromModal(data.contourSelect),
        checkIsArrayDataFromModal(data.systemSelect),
        data.desc
    );
    fetchData();
  }, [fetchData]);

  const handleEdit = React.useCallback((data: any) => {
    editEndpoints(
      data.id,
      data.name,
      data.ip,
      data.port,
      checkIsArrayDataFromModal(data.networkSelect),
      checkIsArrayDataFromModal(data.contourSelect),
      checkIsArrayDataFromModal(data.systemSelect),
      data.desc
    );
    setOpen(false);
  }, []);

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
      <h2 className={styles.users_title}>Endpoints</h2>
          <TableData
        isShowAddBtn={false}
        columns={columns}
        openModal={open}
        data={editData || {
          networkSelect: networkSelect,
          contourSelect: contourSelect,
          systemSelect: systemSelect,
        }}
        handleAdd={handleAdd}
        handleClose={handleOpen}
        handleEdit={handleEdit}
        handleDelete={handleDelete}>
        {data.length &&
          data.map((row: any) => (
            <TableRow
              key={row.id}
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
