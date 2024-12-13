import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { roles } from "../../utills/roleUtills";
import AddModal from "../Modals/AddModal/AddModal";
import MiniModal from "../Modals/MiniModal/MiniModal";
import styles from "./TableData.module.sass";
import GetModal from "../Modals/GetModal/GetModal";

interface ITable {
  row_id?: string | undefined;
  isShowAddBtn?: boolean;
  isShowEditBtns?: boolean;
  isShowGetModel?: boolean;
  isShowCreateMode?: boolean;
  columns: GridColDef[];
  children: any;
  handleAdd?: (data: any) => void;
  handleClose: () => void;
  handleDelete: () => void;
  handleEdit: (data: any) => void;
  openModal: boolean;
  data: any;
  fetchData?: any;
}

const TableData: React.FC<ITable> = ({
  row_id,
  isShowAddBtn=true,
  isShowEditBtns=true,
  isShowGetModel=false,
  isShowCreateMode=false,
  columns,
  children,
  handleAdd,
  handleClose,
  handleEdit,
  handleDelete,
  openModal,
  data,
  fetchData,
}) => {
  const [isShowAddModal, setShowAddModal] = React.useState(false);
  const handleShowAddModal = React.useCallback(() => {
    setShowAddModal((prev) => !prev);
  }, []);
  return (
    <div>
      {isShowAddBtn && (
          <div className={styles.add_btn}>
            <Button
              onClick={handleShowAddModal}
              variant="contained"
              color="success"
              size="large"
              sx={{ width: "25ch" }}>
              Add
            </Button>
          </div>)}
      {isShowCreateMode && (
          <div className={styles.add_btn}>
          <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ width: "25ch" }}
              component="a" // Используем компонент <a>
              href={"http://localhost:3000/orders/add"} // Динамически сформированный URL
              rel="noopener noreferrer" // Безопасность для внешних ссылок
          >
            Создать
          </Button>
          </div>
      )}

      <TableContainer component={Paper} className={styles.table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(
                (elem) =>
                  !elem.field.includes("Select") && (
                    <TableCell className={styles.table_cell} key={elem.field}>
                      {elem.headerName}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
        <>
          {isShowEditBtns && (
          <MiniModal
            open={openModal}
            handleClose={handleClose}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            data={data}
            fields={columns}
          />)}
          {isShowGetModel && (
          <GetModal
            row_id={row_id}
            open={openModal}
            handleClose={handleClose}
          />)}
          <AddModal
            isShow={isShowAddModal}
            handleAdd={handleAdd}
            onClose={handleShowAddModal}
            fields={columns}
            data={data}
          />
        </>
    </div>
  );
};
export default React.memo(TableData);
