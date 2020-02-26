import React, { useContext, useEffect } from "react";
import Loader from "../Loader/Loader";
import Purchase from "../Purchase/Purchase";
import { getPurchases } from "../../actions/actionCreators";
import PurchasesContext from "../../contexts/PurchasesContext";
import PurchasesSum from "../PurchasesSum/PurchasesSum";

export default function PurchasesList() {
  const { state, dispatch } = useContext(PurchasesContext);

  const {
    purchases: { items, loading, error }
  } = state;

  const handleRetry = async () => {
    try {
      await getPurchases(dispatch);
    } catch (e) {}
  };

  useEffect(() => {
    (async () => {
      try {
        await getPurchases(dispatch);
      } catch (e) {}
    })();
  }, [dispatch]);

  const errorEl = (
    <div>
      <div>Произошла ошибка</div>
      <div>
        <button class="btn btn-outline-dark" onClick={handleRetry}>
          Попробовать ещё раз
        </button>
      </div>
    </div>
  );

  return (
    <div className="left">
      {loading && <Loader />}
      <ul className="list-group col-6 purchases-list  ">
        {items.map(o => (
          <li className="list-group-item">
            {" "}
            <Purchase key={o.id} purchase={o} />
          </li>
        ))}
      </ul>
      {error && errorEl}
      <PurchasesSum className="purchases-list" />
    </div>
  );
}
