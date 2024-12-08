import {deleteRequest, getRequest, postRequest, putRequest} from "../axios/http";

export const getNetworks = async () => {
    const data = await getRequest('/api/networks');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const getContours = async () => {
    const data = await getRequest('/api/contours');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const getSystems = async () => {
    const data = await getRequest('/api/systems');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const getEndpoints = async () => {
    const data = await getRequest('/api/endpoints');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const addEndpoints = async (name: string, ip: string, port: number, network: number, contour: number, system: number, desc: string) => {
    const res = await postRequest(`/api/endpoints/add`, {}, { name, ip, port, network, contour, system, desc });
    if (res) {
        getEndpoints()
        return res;
    } else {
        return "Не получилось добавить";
    }
};

export const editEndpoints = async (id: number, name: string, ip: string, port: number, network: number, contour: number, system: number, desc: string) => {
    const res = await putRequest(`/api/endpoints/edit/${id}`, {}, { id, name, ip, port, network, contour, system, desc });
    if (res) {
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};


export const deleteEndpoints = async (id: string) => {
    const data = await deleteRequest(`/api/endpoints/delete/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Не получилось удалить";
    }
};