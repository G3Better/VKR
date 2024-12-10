import * as React from "react";
import {inspect} from "util";
import styles from "./OrderData.module.sass"
import {useEffect, useState} from "react";

// Интерфейс для пропсов компонента
interface IOrder {
  customer_data: any;
  rr_data: any,
  auth_data: any;
  endpoints_data: any;
  systems_data: any;
  status_data: any;
  data: any; // Предполагаем, что data — это объект с ключами (названиями полей) и значениями
  children?: React.ReactNode; // Дополнительно, если нужно передать дочерние элементы
}

const OrderData: React.FC<IOrder> = ({ data, status_data, systems_data, endpoints_data, auth_data, rr_data, customer_data }) => {
    const [isAcceptedByIS, setIsAcceptedByIS] = React.useState<boolean>(data[0]?.isAcceptedByIS);
    const [isAcceptedByCorpArch, setIsAcceptedByCorpArch] = React.useState<boolean>(data[0]?.isAcceptedByCorpArch);
    const [isAcceptedByArc, setIsAcceptedByArc] = React.useState<boolean>(data[0]?.isAcceptedByArc);
    const [selectedCustomer, setSelectedCustomer] = React.useState(data[0]?.customer);
    const [selectedStatus, setSelectedStatus] = React.useState(data[0]?.status);
    const [selectedSource, setSelectedSource] = React.useState(data[0]?.source);
    const [selectedDest, setSelectedDest] = React.useState(data[0]?.dest);
    const [selectedTestEp, setSelectedTestEp] = React.useState(data[0]?.test);
    const [selectedCertEp, setSelectedCertEp] = React.useState(data[0]?.cert);
    const [selectedProdEp, setSelectedProdEp] = React.useState(data[0]?.prod);
    const [selectedAuth, setSelectedAuth] = React.useState(data[0]?.authorization);
    const [selectedRr, setSelectedRr] = React.useState(data[0]?.rate);
    useEffect(() => {
        if (data) {
            setSelectedCustomer(data[0]?.customer);
            setSelectedStatus(data[0]?.status);
            setSelectedSource(data[0]?.source);
            setSelectedDest(data[0]?.dest);
            if (data[0]?.test=='') {
                setSelectedTestEp('Null')
            } else {
            setSelectedTestEp(data[0]?.test);
            }
            if (data[0]?.cert=='') {
                setSelectedCertEp('Null')
            } else {
                setSelectedCertEp(data[0]?.cert);
            }
            setSelectedProdEp(data[0]?.prod);
            setSelectedAuth(data[0]?.authorization);
            setSelectedRr(data[0]?.rate);
            setIsAcceptedByIS(data[0]?.isAcceptedByIS);
            setIsAcceptedByCorpArch(data[0]?.isAcceptedByCorpArch);
            setIsAcceptedByArc(data[0]?.isAcceptedByArc);
        }
    }, [data]);

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };

    const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSource(event.target.value);
    };

    const handleDestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDest(event.target.value);
    };

    const handleTestEpChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTestEp(event.target.value);
    };

    const handleCertEpChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCertEp(event.target.value);
    };

    const handleProdEpChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProdEp(event.target.value);
    };

    const handleAuthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAuth(event.target.value);
    };

    const handleRrChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRr(event.target.value);
    };

    const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCustomer(event.target.value);
    };

    const handleIsAcceptedByISChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAcceptedByIS(event.target.checked);
    };

    const handleIsAcceptedByCorpArchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAcceptedByCorpArch(event.target.checked);
    };

    const handleIsAcceptedByArcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAcceptedByArc(event.target.checked);
    };

    return (
        <div className={styles.container}>
            <form>
                <div className={styles.fieldContainer_id}>
                        <label htmlFor="idField" className={styles.label}>
                            Номер заявки:
                        </label>
                        <input
                            type="text"
                            id="idField"
                            name="idField"
                            placeholder={data[0]?.id}
                            className={styles.input_id}
                        />
                        <label htmlFor="titleField" className={styles.label}>
                            Заголовок:
                        </label>
                        <input
                            type="text"
                            id="titleField"
                            name="titleField"
                            placeholder={data[0]?.title}
                            className={styles.input_title}
                        />
                </div>
                {/* Поле 3-4 */}
                <div className={styles.fieldContainer_systems}>
                    <label htmlFor="sourceSelect" className={styles.label}>
                        Система-источник:
                    </label>
                    <select
                        name="sourceSelect"
                        id="sourceSelect"
                        className={styles.select}
                        value={selectedSource} // Связываем со значением состояния
                        onChange={handleSourceChange} // Обновляем состояние при изменении
                    >
                        {systems_data.map((systems: { id: number; name: string }) => (
                            <option key={systems.id} value={systems.name}>
                                {systems.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="destSelect" className={styles.label}>
                        Система-получатель:
                    </label>
                    <select
                        name="destSelect"
                        id="destSelect"
                        className={styles.select}
                        value={selectedDest} // Связываем со значением состояния
                        onChange={handleDestChange} // Обновляем состояние при изменении
                    >
                        {systems_data.map((systems: { id: number; name: string }) => (
                            <option key={systems.id} value={systems.name}>
                                {systems.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Поле 5 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="statusSelect" className={styles.label}>
                        Статус:
                    </label>
                    <select
                        name="statusSelect"
                        id="statusSelect"
                        className={styles.select_status}
                        value={selectedStatus} // Связываем со значением состояния
                        onChange={handleStatusChange} // Обновляем состояние при изменении
                    >
                        {status_data.map((status: { id: number; name: string }) => (
                            <option key={status.id} value={status.name}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Поле 6-8 */}
                <div className={styles.fieldContainer_endpoints}>
                    <label htmlFor="testSelect" className={styles.label}>
                        TestEp:
                    </label>
                    <select
                        name="testSelect"
                        id="testSelect"
                        className={styles.select}
                        value={selectedTestEp} // Связываем со значением состояния
                        onChange={handleTestEpChange} // Обновляем состояние при изменении
                    >
                        <option key='0' value='Null'>Null</option>
                        {endpoints_data.map((endpoint: { id: number; name: string }) => (
                            <option key={endpoint.id} value={endpoint.name}>
                                {endpoint.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="certSelect" className={styles.label}>
                        CertEp:
                    </label>
                    <select
                        name="certSelect"
                        id="certSelect"
                        className={styles.select}
                        value={selectedCertEp} // Связываем со значением состояния
                        onChange={handleCertEpChange} // Обновляем состояние при изменении
                    >
                        <option key='0' value='Null'>Null</option>
                        {endpoints_data.map((endpoint: { id: number; name: string }) => (
                            <option key={endpoint.id} value={endpoint.name}>
                                {endpoint.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="prodSelect" className={styles.label}>
                        ProdEp:
                    </label>
                    <select
                        name="prodSelect"
                        id="prodSelect"
                        className={styles.select}
                        value={selectedProdEp} // Связываем со значением состояния
                        onChange={handleProdEpChange} // Обновляем состояние при изменении
                    >
                        {endpoints_data.map((endpoint: { id: number; name: string }) => (
                            <option key={endpoint.id} value={endpoint.name}>
                                {endpoint.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Поле 9-10 */}
                <div className={styles.fieldContainer_auth_rr}>
                    <label htmlFor="authSelect" className={styles.label}>
                        Тип авторизации:
                    </label>
                    <select
                        name="authSelect"
                        id="authSelect"
                        className={styles.select}
                        value={selectedAuth} // Связываем со значением состояния
                        onChange={handleAuthChange} // Обновляем состояние при изменении
                    >
                        {auth_data.map((auth: { id: number; name: string }) => (
                            <option key={auth.id} value={auth.name}>
                                {auth.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="rrSelect" className={styles.label}>
                        Частота запроса:
                    </label>
                    <select
                        name="rrSelect"
                        id="rrSelect"
                        className={styles.select}
                        value={selectedRr} // Связываем со значением состояния
                        onChange={handleRrChange} // Обновляем состояние при изменении
                    >
                        {rr_data.map((rr: { id: number; name: string }) => (
                            <option key={rr.id} value={rr.name}>
                                {rr.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Поле 11 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="customerSelect" className={styles.label}>
                        Отвественный:
                    </label>
                    <select
                        name="customerSelect"
                        id="customerSelect"
                        className={styles.select_status}
                        value={selectedCustomer} // Связываем со значением состояния
                        onChange={handleCustomerChange} // Обновляем состояние при изменении
                    >
                        {customer_data.map((customer: { id: number; fio: string }) => (
                            <option key={customer.id} value={customer.fio}>
                                {customer.fio}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Поле 12 - 14 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="idField" className={styles.label}>
                        Согласовано информационной безопасностью:
                    </label>
                    <input
                        type="checkbox"
                        id="isAcceptedByIS"
                        name="isAcceptedByIS"
                        checked={isAcceptedByIS}
                        onChange={handleIsAcceptedByISChange}
                        className={styles.input}
                    />
                    <label htmlFor="idField" className={styles.label}>
                        Согласовано корпоративным архитектором:
                    </label>
                    <input
                        type="checkbox"
                        id="isAcceptedByCorpArch"
                        name="isAcceptedByCorpArch"
                        checked={isAcceptedByCorpArch}
                        onChange={handleIsAcceptedByCorpArchChange}
                        className={styles.input}
                    />
                    <label htmlFor="idField" className={styles.label}>
                        Согласовано архитектором интеграции:
                    </label>
                    <input
                        type="checkbox"
                        id="isAcceptedByArc"
                        name="isAcceptedByArc"
                        checked={isAcceptedByArc}
                        onChange={handleIsAcceptedByArcChange}
                        className={styles.input}
                    />
                </div>
                {/* Поле 15 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="descField" className={styles.label}>
                        Описание:
                    </label>
                    <input
                        type="text"
                        id="descField"
                        name="descField"
                        placeholder={data[0]?.desc}
                        className={styles.input}
                    />
                </div>
                {/* Поле 16 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="swaggerField" className={styles.label}>
                        Сваггер или Wsdl:
                    </label>
                    <input
                        type="text"
                        id="swaggerField"
                        name="swaggerField"
                        placeholder={data[0]?.swagger}
                        className={styles.input}
                    />
                </div>
                <div>
                    <button name="Save">Save</button>
                </div>
            </form>
        </div>
    );
}

export default React.memo(OrderData);