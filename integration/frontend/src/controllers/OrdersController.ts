import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getOrders = async (id: string) => {
    const data = postRequest(`/api/order/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Не получилось получить данные";
    }
};