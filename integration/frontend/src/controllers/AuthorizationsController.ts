import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getAuthorizations = async () => {
    const data = await getRequest('/api/authorizations');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const deleteAuthorizations = async (id: string) => {
    const data = await deleteRequest(`/api/authorizations/delete/${id}`, {}, { id });
    if (data) {
        getAuthorizations()
        return data;
    } else {
        return "Не получилось удалить";
    }
};

export const editAuthorizations = async (id: number, name: string) => {
    const res = await putRequest(`/api/authorizations/edit/${id}`, {}, { id, name });
    if (res) {
        getAuthorizations()
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};

export const addAuthorizations = async (name: string) => {
    const res = await postRequest(`/api/authorizations/add`, {}, { name });
    if (res) {
        getAuthorizations()
        return res;
    } else {
        return "Не получилось добавить новое";
    }
};
