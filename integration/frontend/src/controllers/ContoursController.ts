import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getContours = async () => {
    const data = await getRequest('/api/contours');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const deleteContours = async (id: string) => {
    const data = await deleteRequest(`/api/contours/delete/${id}`, {}, { id });
    if (data) {
        getContours()
        return data;
    } else {
        return "Не получилось удалить";
    }
};

export const editContours = async (id: number, name: string) => {
    const res = await putRequest(`/api/contours/edit/${id}`, {}, { id, name });
    if (res) {
        getContours()
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};

export const addContours = async (name: string) => {
    const res = await postRequest(`/api/contours/add`, {}, { name });
    if (res) {
        getContours()
        return res;
    } else {
        return "Не получилось добавить новое";
    }
};
