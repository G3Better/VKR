import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getOrders = async (id: string) => {
    const data = await getRequest(`/api/orders/${id}`, {}, { id });
    if (data) {
        console.log(data);
        return data;
    } else {
        return "Не получилось получить данные";
    }
};