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
    <div className="container">
      <ul className="list-group col-12">
        {items.map(o => (
          <li className="list-group-item">
            <Purchase key={o.id} purchase={o} />
          </li>
        ))}
      </ul>
      <div className="row">
        <div className="to-center">
          {loading && <Loader />} {error && errorEl}
        </div>
      </div>
      <PurchasesSum />
    </div>
  );
}
