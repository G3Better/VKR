import * as React from "react";
import {inspect} from "util";
import styles from "./OrderData.module.sass"

// Интерфейс для пропсов компонента
interface IOrder {
  data: any; // Предполагаем, что data — это объект с ключами (названиями полей) и значениями
  children?: React.ReactNode; // Дополнительно, если нужно передать дочерние элементы
}

const OrderData: React.FC<IOrder> = ({ data }) => {
    return (
        <div className={styles.container}>
            <form>
                <div className={styles.fieldContainer_id}>
                        <label className={styles.label}>
                            Номер заявки:
                        </label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            placeholder={data[0]?.id}
                            className={styles.input_id}
                        />
                        <label htmlFor="field2" className={styles.label}>
                            Заголовок:
                        </label>
                        <input
                            type="text"
                            id="field2"
                            name="field2"
                            value={data[0]?.title}
                            className={styles.input}
                        />
                </div>
                {/* Поле 3 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="field3" className={styles.label}>
                        Field3:
                    </label>
                    <input
                        type="text"
                        id="field3"
                        name="field3"
                        value={data[0]?.source}
                        className={styles.input}
                    />
                </div>
                {/* Поле 4 */}
                <div className={styles.fieldContainer}>
                    <label htmlFor="field4" className={styles.label}>
                        Field4:
                    </label>
                    <input
                        type="text"
                        id="field4"
                        name="field4"
                        placeholder={data[0]?.dest}
                        className={styles.input}
                    />
                </div>
            </form>
        </div>
    );
}

export default React.memo(OrderData);