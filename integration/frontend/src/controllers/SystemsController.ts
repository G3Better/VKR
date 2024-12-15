import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getSystems = async () => {
    const data = await getRequest('/api/systems');
    if (data) {
        return data
    } else {
        return 'Данные не были получены'
    }
}

export const getResponsible = async () => {
    const data = await getRequest('/api/responsible');
    if (data) {
        return data
    } else {
        return 'Данных не были получены'
    }
}

export const deleteSystems = async (id: string) => {
    const data = await deleteRequest(`/api/systems/delete/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Удаление не выполнено, произошла ошибка";
    }
};

export const editSystems = async (id: number, name: string, responsible: number) => {
    const res = await putRequest(`/api/systems/edit/${id}`, {}, { id, name, responsible });
    if (res) {
        return res;
    } else {
        return "Редактирование не выполнено, произошла ошибка";
    }
};

export const addSystems = async (name: string, responsible: number) => {
    const res = await postRequest(`/api/systems/add`, {}, { name, responsible });
    if (res) {
        getSystems()
        return res;
    } else {
        return "Добавление не выполнено, произошла ошибка";
    }
};
