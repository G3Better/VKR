import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import {
  getOrders,
} from "../../controllers/OrdersController";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Orders.module.sass";
import {checkIsArrayDataFromModal, uniqArrayForModal} from "../../utills/dataUtil";
import OrderData from "../../UI/Order/OrderData";
import {getStatus} from "../../controllers/StatusController";
import {getSystems} from "../../controllers/SystemsController";
import {getEndpoints} from "../../controllers/EndpointsController";
import {getAuthorizations} from "../../controllers/AuthorizationsController";
import {getRequestRates} from "../../controllers/RequestRatesController";
import {getUsers} from "../../controllers/UsersController";

const columns: GridColDef[] = [
  { field: "id", headerName: "Номер заявки", type: "number" },
  { field: "source", headerName: "Система-источник" },
  { field: "sourceSelect", headerName: "Source", type: "select" },
  { field: "dest", headerName: "Система-получатель" },
  { field: "destSelect", headerName: "Dest", type: "select" },
  { field: "request_rate", headerName: "Частота запросов" },
  { field: "request_rateSelect", headerName: "Request_rate", type: "select" },
  { field: "status", headerName: "Статус заявки" },
  { field: "statusSelect", headerName: "Status", type: "select" },
  { field: "authorization", headerName: "Тип авторизации" },
  { field: "authorizationSelect", headerName: "Authorization", type: "select" },
  { field: "customer", headerName: "Заказчик" },
  { field: "customerSelect", headerName: "Сustomer", type: "select" },
  { field: "description", headerName: "Описание", type: "string" },
  { field: "swagger", headerName: "Сваггер или WSDL", type: "string" }
];

const Orders: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [customer_data, setCustomerData] = React.useState([]);
  const [rr_data, setRrData] = React.useState([]);
  const [auth_data, setAuthData] = React.useState([]);
  const [endpoints_data, setEndpointsData] = React.useState([]);
  const [status_data, setStatusData] = React.useState([]);
  const [systems_data, setSystemsData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const [editData, setEditData] = React.useState<any>(null);
  const fetchData = React.useCallback(async () => {
    const currentUrl = window.location.pathname; // Например, "/order/13"
    const urlParts = currentUrl.split("/"); // Разделяем строку по "/"
    const id = urlParts[urlParts.length - 1]; // Берем последний элемент массива (ID)
    setId(id);

    const customer_data = await getUsers();
    if (customer_data.length) {
      setCustomerData(customer_data);
    } else {
      setCustomerData([]);
    }

    const rr_data = await getRequestRates();
    if (rr_data.length) {
      setRrData(rr_data);
    } else {
      setRrData([]);
    }

    const auth_data = await getAuthorizations();
    if (auth_data.length) {
      setAuthData(auth_data);
    } else {
      setAuthData([]);
    }

    const endpoints_data = await getEndpoints();
    if (endpoints_data.length) {
      setEndpointsData(endpoints_data);
    } else {
      setEndpointsData([]);
    }

    const status_data = await getStatus();
    if (status_data.length) {
      setStatusData(status_data);
    } else {
      setStatusData([]);
    }

    const systems_data = await getSystems();
    if (systems_data.length) {
      setSystemsData(systems_data);
    } else {
      setSystemsData([]);
    }

    const dataTable = await getOrders(id);
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

  React.useEffect(() => {
    fetchData();
  }, [fetchData, open]);
  return (
      <>
        <Header />
        <h2 className={styles.systems_title}>Orders</h2>
        <OrderData
            data={data}
            status_data={status_data}
            systems_data={systems_data}
            endpoints_data={endpoints_data}
            auth_data={auth_data}
            rr_data={rr_data}
            customer_data={customer_data}
        />
      </>
  );
};
export default Orders;
