import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getRoles = async () => {
    const data = await getRequest('/api/roles');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const deleteRoles = async (id: string) => {
    const data = await deleteRequest(`/api/roles/delete/${id}`, {}, { id });
    if (data) {
        getRoles()
        return data;
    } else {
        return "Не получилось удалить";
    }
};

export const editRoles = async (id: number, name: string) => {
    const res = await putRequest(`/api/roles/edit/${id}`, {}, { id, name });
    if (res) {
        getRoles()
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};

export const addRoles = async (name: string) => {
    const res = await postRequest(`/api/roles/add`, {}, { name });
    if (res) {
        getRoles()
        return res;
    } else {
        return "Не получилось добавить новую роль";
    }
};
