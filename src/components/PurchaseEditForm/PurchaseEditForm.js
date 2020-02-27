import React, { useContext } from "react";
import {
  editPurchase,
  getPurchases,
  editPurchaseCancel,
  editPurchaseChangeField
} from "../../actions/actionCreators";
import Loader from "../Loader/Loader";
import PurchasesContext from "../../contexts/PurchasesContext";

export default function PurchaseEditForm() {
  const {
    state: { editedPurchase },
    dispatch
  } = useContext(PurchasesContext);

  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      await editPurchase(dispatch, editedPurchase.item);
      await getPurchases(dispatch);
    } catch (e) {}
  };
  const handleCancel = () => {
    dispatch(editPurchaseCancel());
  };
  const handleChange = evt => {
    const {
      target: { name, value }
    } = evt;
    console.log(name, value);
    dispatch(editPurchaseChangeField(name, value));
  };

  const getFooter = () => {
    if (editedPurchase.loading) {
      return <Loader />;
    }
    if (editedPurchase.error) {
      return (
        <>
          <span>Произошла ошибка</span>
          <button>Повторить</button>
          <button type="reset">Отменить</button>
        </>
      );
    }
    return (
      <>
        <button class="btn btn-outline-primary">
          {editedPurchase.item.id === 0 ? "Добавить" : "Сохранить"}
        </button>
        <button class="btn btn-outline-danger" type="reset">
          Отменить
        </button>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleCancel}>
      <div className="input-group col-12">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Категория
          </span>
        </div>
        <select
          name="category"
          onChange={handleChange}
          className="custom-select col-3"
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
          value={editedPurchase.item.category}
        >
          <option selected>Выбрать...</option>
          <option value="Travel">Путишествия</option>
          <option value="Food">Еда</option>
          <option value="Cars">Машины</option>
        </select>
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Цена
          </span>
        </div>
        <input
          name="price"
          onChange={handleChange}
          value={editedPurchase.item.price}
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        ></input>
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Описание
          </span>
        </div>
        <input
          name="description"
          onChange={handleChange}
          value={editedPurchase.item.description}
        />{" "}
        {getFooter()}
      </div>
    </form>
  );
}
