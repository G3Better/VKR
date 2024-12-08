import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getRequestRates = async () => {
    const data = await getRequest('/api/request_rates');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const deleteRequestRates = async (id: string) => {
    const data = await deleteRequest(`/api/request_rates/delete/${id}`, {}, { id });
    if (data) {
        getRequestRates()
        return data;
    } else {
        return "Не получилось удалить";
    }
};

export const editRequestRates = async (id: number, name: string) => {
    const res = await putRequest(`/api/request_rates/edit/${id}`, {}, { id, name});
    if (res) {
        getRequestRates()
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};

export const addRequestRates = async (name: string) => {
    const res = await postRequest(`/api/request_rates/add`, {}, { name });
    if (res) {
        getRequestRates()
        return res;
    } else {
        return "Не получилось добавить новую частоту запросов";
    }
};
