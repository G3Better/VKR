import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getStatus = async () => {
    const data = await getRequest('/api/status');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const deleteStatus = async (id: string) => {
    const data = await deleteRequest(`/api/status/delete/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Не получилось удалить";
    }
};

export const editStatus = async (id: number, name: string) => {
    const res = await putRequest(`/api/status/edit/${id}`, {}, { id, name });
    if (res) {
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};

export const addStatus = async (name: string) => {
    const res = await postRequest(`/api/status/add`, {}, { name });
    if (res) {
        getStatus()
        return res;
    } else {
        return "Не получилось добавить новый статус";
    }
};
