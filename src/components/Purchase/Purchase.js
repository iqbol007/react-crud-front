import React, { useContext } from "react";
import Loader from "../Loader/Loader";
import PurchasesContext from "../../contexts/PurchasesContext";

import {
  editPurchaseExisting,
  removePurchaseConfirm,
  removePurchaseById,
  getPurchases,
  getPurchaseCancel,
  getPurchaseById,
  removePurchaseCancel
} from "../../actions/actionCreators";
export default function Purchase({ purchase }) {
  const {
    state: { removedPurchase, descPurchase },
    dispatch
  } = useContext(PurchasesContext);

  const handleEdit = evt => {
    evt.preventDefault();
    dispatch(editPurchaseExisting(purchase));
  };
  const handleRemove = evt => {
    evt.preventDefault();
    dispatch(removePurchaseConfirm(purchase.id));
  };
  const handleProcess = async evt => {
    evt.preventDefault();
    try {
      await removePurchaseById(dispatch, purchase.id);
      await getPurchases(dispatch);
    } catch (e) {}
  };
  const handleCancelDesc = evt => {
    evt.preventDefault();
    dispatch(getPurchaseCancel());
  };
  const handleProcessDesc = async evt => {
    evt.preventDefault();
    try {
      await getPurchaseById(dispatch, purchase.id);
    } catch (error) {}
  };
  const handleCancel = evt => {
    evt.preventDefault();
    dispatch(removePurchaseCancel());
  };

  const handleShowDescription = async evt => {
    evt.preventDefault();
    try {
      await getPurchaseById(dispatch, purchase.id);
    } catch (error) {}
  };

  function getDescription() {
    if (descPurchase.id !== purchase.id) {
      return (
        <div>
          <button
            class="btn btn-outline-info fl"
            onClick={handleShowDescription}
          >
            Показать описание
          </button>
        </div>
      );
    }
    if (descPurchase.loading) {
      return <Loader />;
    }
    if (descPurchase.error) {
      return (
        <div>
          Произошла ошибка при загрузке описания. Повторить?
          <button onClick={handleProcessDesc}>Да</button>
          <button onClick={handleCancelDesc}>Нет</button>
        </div>
      );
    }
    const { item } = descPurchase;

    return <div>description: {item}</div>;
  }
  const getFooter = () => {
    if (removedPurchase.id !== purchase.id) {
      return (
        <div className="left">
          <button class="btn btn-outline-dark fl" onClick={handleEdit}>
            <i class="fa fa-pencil"></i>
          </button>
          <button className="btn btn-outline-danger fl" onClick={handleRemove}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      );
    }
    if (removedPurchase.loading) {
      return <Loader />;
    }

    if (removedPurchase.error) {
      return (
        <div>
          Произошла ошибка при удалении элемента. Повторить?
          <button className="btn btn-outline-danger" onClick={handleProcess}>
            Да
          </button>
          <button onClick={handleCancel}>Нет</button>
        </div>
      );
    }
    return (
      <div>
        Вы уверены, что хотите удалить элемент?
        <button className="btn btn-outline-danger" onClick={handleProcess}>
          Да
        </button>
        <button onClick={handleCancel}>Нет</button>
      </div>
    );
  };
  return (
    <>
      <article>
        {getFooter()}
        <span>id: {purchase.id} - </span>
        <span>category: {purchase.category} - </span>
        <span>price: {purchase.price} </span>
        {getDescription()}
      </article>
    </>
  );
}
