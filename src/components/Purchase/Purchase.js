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
            class="btn btn-outline-info"
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
          <button className="btn btn-outline-danger" onClick={handleProcessDesc}>Да</button>
          <button className="btn btn-outline-danger" onClick={handleCancelDesc}>Нет</button>
        </div>
      );
    }
    const { item } = descPurchase;

    return <div>description: {item}</div>;
  }
  const getFooter = () => {
    if (removedPurchase.id !== purchase.id) {
      return (
        <>
          <button class="btn btn-outline-dark btn-sm" onClick={handleEdit}>
            <i class="fa fa-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-sm " onClick={handleRemove}>
            <i className="fa fa-trash"></i>
          </button>
        </>
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
          <button  className="btn btn-outline-danger" onClick={handleCancel}>Нет</button>
        </div>
      );
    }
    return (
      <div>
        Вы уверены, что хотите удалить элемент?
        <button className="btn btn-outline-danger" onClick={handleProcess}>
          Да
        </button>
        <button className="btn btn-outline-danger" onClick={handleCancel}>Нет</button>
      </div>
    );
  };
  return (
    <>
      <article>
        <div className="card">
          <h5 className="card-header">
            Покупка №{purchase.id} <span className="to-right">{getFooter()}</span>
          </h5>
          <div className="card-body">
            <h5 className="card-title center">Цена: {purchase.price}$</h5>
            <p className="card-text center">Категория: {purchase.category}</p>
            <span >{getDescription()}</span>
            
          </div>
        </div>
      </article>
    </>
  );
}
