import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getNetworks = async () => {
    const data = await getRequest('/api/networks');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const deleteNetworks = async (id: string) => {
    const data = await deleteRequest(`/api/networks/delete/${id}`, {}, { id });
    if (data) {
        getNetworks()
        return data;
    } else {
        return "Не получилось удалить";
    }
};

export const editNetworks = async (id: number, name: string) => {
    const res = await putRequest(`/api/networks/edit/${id}`, {}, { id, name});
    if (res) {
        getNetworks()
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};

export const addNetworks = async (name: string) => {
    const res = await postRequest(`/api/networks/add`, {}, { name });
    if (res) {
        getNetworks()
        return res;
    } else {
        return "Не получилось добавить новую сеть";
    }
};
