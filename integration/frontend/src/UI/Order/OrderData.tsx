import * as React from "react";
import {inspect} from "util";
import classNames from 'classnames';
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
    const [idFieldText, setIdField] = React.useState(data[0]?.id);
    const [titleFieldText, setTitleField] = React.useState(data[0]?.title);
    const [descFieldText, setDescField] = React.useState(data[0]?.desc);
    const [swaggerFieldText, setSwaggerField] = React.useState(data[0]?.swagger);
    const [hidden, setIsHidden] = React.useState<boolean>(true);
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
            setIdField(data[0]?.id);
            setTitleField(data[0]?.title);
            setDescField(data[0]?.desc);
            setSwaggerField(data[0]?.swagger);
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

    const handleHiddenButtonsChange = (isVisible: boolean) => {
        setIsHidden(isVisible);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleField(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescField(event.target.value);
    };

    const handleSwaggerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSwaggerField(event.target.value);
    };

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdField(event.target.value);
    };

    const handleButtonSave = async () => {
        const formData: Record<string, string | boolean> = {}; // Учтём, что для чекбоксов может быть boolean
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        const textareas = document.querySelectorAll('textarea'); // Выбираем все textarea

        // Обрабатываем input
        inputs.forEach((input) => {
            if (input.type === 'checkbox') {
                // Если это чекбокс, сохраняем его состояние (true/false)
                formData[input.name] = input.checked;
            } else {
                // Для остальных типов input сохраняем значение
                formData[input.name] = input.value;
            }
        });

        // Обрабатываем select
        selects.forEach((select) => {
            formData[select.name] = select.value;
        });

        // Обрабатываем textarea
        textareas.forEach((textarea) => {
            formData[textarea.name] = textarea.value;
        });

        console.log('Собранные данные:', formData);
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
                            placeholder={idFieldText}
                            value={idFieldText}
                            onChange={handleIdChange}
                            disabled={hidden}
                            className={classNames(styles.input_id, { [styles.input_disabled]: hidden })}
                        />
                        <label htmlFor="titleField" className={styles.label}>
                            Заголовок:
                        </label>
                        <input
                            type="text"
                            id="titleField"
                            name="titleField"
                            placeholder={titleFieldText}
                            value={titleFieldText}
                            onChange={handleTitleChange}
                            disabled={hidden}
                            className={classNames(styles.input_title, { [styles.input_disabled]: hidden })}
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
                        className={classNames(styles.select, { [styles.select_disabled]: hidden })}
                        value={selectedSource} // Связываем со значением состояния
                        onChange={handleSourceChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.select, { [styles.select_disabled]: hidden })}
                        value={selectedDest} // Связываем со значением состояния
                        onChange={handleDestChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.select, { [styles.select_disabled]: hidden })}
                        value={selectedStatus} // Связываем со значением состояния
                        onChange={handleStatusChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.select, { [styles.select_disabled]: hidden })}
                        value={selectedTestEp} // Связываем со значением состояния
                        onChange={handleTestEpChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.select, { [styles.select_disabled]: hidden })}
                        value={selectedCertEp} // Связываем со значением состояния
                        onChange={handleCertEpChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.select, { [styles.select_disabled]: hidden })}
                        value={selectedProdEp} // Связываем со значением состояния
                        onChange={handleProdEpChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.select, { [styles.select_disabled]: hidden })}
                        value={selectedAuth} // Связываем со значением состояния
                        onChange={handleAuthChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.select, { [styles.select_disabled]: hidden })}
                        value={selectedRr} // Связываем со значением состояния
                        onChange={handleRrChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.select_status, { [styles.select_disabled]: hidden })}
                        value={selectedCustomer} // Связываем со значением состояния
                        onChange={handleCustomerChange} // Обновляем состояние при изменении
                        disabled={hidden}
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
                        className={classNames(styles.input, { [styles.input_disabled]: hidden })}
                        disabled={hidden}
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
                        className={classNames(styles.input, { [styles.input_disabled]: hidden })}
                        disabled={hidden}
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
                        className={classNames(styles.input, { [styles.input_disabled]: hidden })}
                        disabled={hidden}
                    />
                </div>
                {/* Поле 15 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="descField" className={styles.label}>
                        Описание:
                    </label>
                    <textarea
                        id="descField"
                        name="descField"
                        value={descFieldText}
                        onChange={handleDescChange}
                        disabled={hidden}
                        className={classNames(styles.textarea, { [styles.textarea_disabled]: hidden })}
                    />
                </div>
                {/* Поле 16 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="swaggerField" className={styles.label}>
                        Сваггер или Wsdl:
                    </label>
                    <textarea
                        id="swaggerField"
                        name="swaggerField"
                        value={swaggerFieldText}
                        onChange={handleSwaggerChange}
                        disabled={hidden}
                        className={classNames(styles.textarea, { [styles.textarea_disabled]: hidden })}
                    />
                </div>
                {/* Блок с кнопками */}
                <div className={styles.buttonContainer}>
                    <button className={classNames(styles.button, styles.saveButton, { [styles.disabledButton]: hidden })}
                            disabled={hidden}
                            name="Save"
                            onClick={(e) => {
                                handleButtonSave();
                                e.preventDefault();
                                //window.location.reload();
                            }} // Предотвращаем обновление страницы
                    >
                        Save
                    </button>
                    <button className={classNames(styles.button, styles.noButton, { [styles.disabledButton]: hidden })}
                            disabled={hidden}
                            name="No"
                            onClick={(e) => {
                                window.location.reload();
                            }}
                    >
                        No
                    </button>
                    <button
                        className={styles.button && styles.editButton}
                        onClick={(e) => {
                            e.preventDefault(); // Предотвращаем обновление страницы
                            handleHiddenButtonsChange(false); // Вызываем вашу функцию
                        }} // Оборачиваем вызов функции
                        name="Edit"
                    >
                        Edit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default React.memo(OrderData);