import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getOrders = async () => {
    const data = await getRequest('/api/orders_table');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}
