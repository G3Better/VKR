import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

export const getSrcSystems = async () => {
    const data = await getRequest('/api/src_systems');
    if (data) {
        return data
    } else {
        return 'Данные не обнаружены'
    }
}

export const getResponsible = async () => {
    const data = await getRequest('/api/responsible');
    if (data) {
        return data
    } else {
        return 'Данные не обнаружены'
    }
}

export const getIps = async () => {
    const data = await getRequest('/api/ips');
    if (data) {
        return data
    } else {
        return 'Данные не обнаружены'
    }
}

export const deleteSrcSystems = async (id: string) => {
    const data = await deleteRequest(`/api/src_systems/delete/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Не получилось выполнить удаление";
    }
};

export const editSrcSystems = async (id: number, name: string, responsible: number, test: string, test_ip: number, cert: string, cert_ip: number, prod: string, prod_ip: number) => {
    const res = await putRequest(`/api/src_systems/edit/${id}`, {}, { id, name, responsible, test, test_ip, cert, cert_ip, prod, prod_ip});
    if (res) {
        return res;
    } else {
        return "Не получилось выполнить редактирование";
    }
};

export const addSrcSystems = async (name: string, responsible: number, test: string, test_ip: number, cert: string, cert_ip: number, prod: string, prod_ip: number) => {
    const res = await postRequest(`/api/src_systems/add`, {}, { name, responsible, test, test_ip, cert, cert_ip, prod, prod_ip });
    if (res) {
        getSrcSystems()
        return res;
    } else {
        return "Не получилось выполнить добавление новой системы источника";
    }
};
