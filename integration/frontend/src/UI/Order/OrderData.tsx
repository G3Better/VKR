import * as React from "react";

// Интерфейс для пропсов компонента
interface IOrder {
  openModal: boolean; // Указывает, отображать ли модальное окно
  data: any; // Предполагаем, что data — это объект с ключами (названиями полей) и значениями
  children?: React.ReactNode; // Дополнительно, если нужно передать дочерние элементы
}

const OrderData: React.FC<IOrder> = ({ openModal, data }) => {
  // Локальное состояние для управления значениями формы
  const [formData, setFormData] = React.useState(data);

  // Если модальное окно закрыто, ничего не отображаем
  if (!openModal) return null;

  return (
      <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <form>
          {/* Генерация полей формы на основе ключей объекта data */}
          {Object.keys(data)
              .slice(0, 8) // Берём только первые 8 полей
              .map((key, index) => (
                  <div key={index} style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor={key}
                        style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </label>
                    <input
                        type="text"
                        id={key}
                        name={key}
                        value={formData[key] || ""} // Значение из состояния
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                        }}
                    />
                  </div>
              ))}
          <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
          >
            Submit
          </button>
        </form>
      </div>
  );
};

export default React.memo(OrderData);