import Button from "@mui/material/Button";
import React from "react";
import styles from "./GetModal.module.sass";

interface IGetModal {
    open?: boolean;
    handleClose: () => void;
    row_id?: string; // row_id может быть строкой или undefined
}

const GetModal: React.FC<IGetModal> = ({
                                           open = false,
                                           handleClose,
                                           row_id,
                                       }) => {
    if (!open) return null;
    // Формируем URL из статичной строки и row_id
    let url = "http://localhost:3000/order/"+row_id;
    return (
        <>
            <div className={styles.body_bg}></div>
            <div className={styles.modal}>
                <div className={styles.group_btn}>
                    {/* Кнопка "Перейти" с использованием динамического URL */}
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{ width: "12ch" }}
                        component="a" // Используем компонент <a>
                        href={url} // Динамически сформированный URL
                        rel="noopener noreferrer" // Безопасность для внешних ссылок
                    >
                        Перейти
                    </Button>
                </div>
                <div className={styles.close_btn}>
                    <Button onClick={handleClose}>Close</Button>
                </div>
            </div>
        </>
    );
};

export default React.memo(GetModal);