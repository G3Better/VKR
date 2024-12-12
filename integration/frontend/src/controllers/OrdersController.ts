import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"
import {getEndpoints} from "./EndpointsController";

export const getOrders = async (id: string) => {
    const data = postRequest(`/api/order/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Не получилось получить данные";
    }
};

export const addOrders = async (title: string, source: number, dest: number, rr: number, status: number, auth: number, customer: number, test: number, cert: number, prod: number, isAcceptedByIS: boolean, isAcceptedByCorpArch: boolean, isAcceptedByArc: boolean, desc: string, swagger:string) => {
    console.log("some shit");
    const res = await postRequest(`/api/o/add`, {}, { title, source, dest, rr, status, auth, customer, test, cert, prod, isAcceptedByIS, isAcceptedByCorpArch, isAcceptedByArc, desc, swagger });
    if (res) {
        return res;
    } else {
        return "Не получилось добавить заявку";
    }
};

export const editOrders = async (id: number, title: string, source: number, dest: number, rr: number, status: number, auth: number, customer: number, test: number, cert: number, prod: number, isAcceptedByIS: boolean, isAcceptedByCorpArch: boolean, isAcceptedByArc: boolean, desc: string, swagger:string) => {
    const res = await putRequest(`/api/order/edit/${id}`, {}, { id, title, source, dest, rr, status, auth, customer, test, cert, prod, isAcceptedByIS, isAcceptedByCorpArch, isAcceptedByArc, desc, swagger});
    if (res) {
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};