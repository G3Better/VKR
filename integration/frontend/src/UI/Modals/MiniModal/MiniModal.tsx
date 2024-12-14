import React from "react";
import Button from "@mui/material/Button";
import { GridColDef } from "@mui/x-data-grid";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import styles from "./MiniModal.module.sass";

interface IMiniModal {
    open?: boolean;
    handleClose: () => void;
    handleEdit: (data: any) => void;
    handleDelete: () => void;
    data: any;
    fields: GridColDef[];
}

const MiniModal: React.FC<IMiniModal> = ({
                                             open = false,
                                             handleClose,
                                             handleEdit,
                                             handleDelete,
                                             data,
                                             fields,
                                         }) => {
    const [isShowDelete, setShowDelete] = React.useState(false);
    const [isShowEdit, setShowEdit] = React.useState(false);

    // Обработчик для открытия EditModal
    const onEdit = React.useCallback(() => {
        setShowEdit(true); // Показать EditModal
        handleClose(); // Скрыть MiniModal
    }, [handleClose]);

    // Обработчик для переключения DeleteModal
    const onDelete = React.useCallback(() => {
        setShowDelete((prev) => !prev);
    }, []);

    // Закрытие EditModal
    const closeEditModal = React.useCallback(() => {
        setShowEdit(false); // Скрыть EditModal
    }, []);

    if (!open && !isShowEdit) return null; // Если MiniModal и EditModal скрыты, ничего не рендерим

    return (
        <>
            {open && (
                <div>
                    <div className={styles.body_bg}></div>
                    <div className={styles.modal}>
                        <div className={styles.group_btn}>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{ width: "12ch" }}
                                onClick={onEdit} // Нажатие на кнопку "Edit"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{ width: "12ch" }}
                                color="error"
                                onClick={onDelete}
                            >
                                Delete
                            </Button>
                        </div>
                        <div className={styles.close_btn}>
                            <Button onClick={handleClose}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
            {isShowDelete && (
                <DeleteModal
                    isShow={isShowDelete}
                    onDelete={handleDelete}
                    onClose={onDelete}
                />
            )}
            {isShowEdit && (
                <EditModal
                    isShow={isShowEdit}
                    handleEdit={handleEdit}
                    onClose={closeEditModal} // Закрыть EditModal
                    data={data}
                    fields={fields}
                />
            )}
        </>
    );
};

export default React.memo(MiniModal);
