import React, { useContext } from "react";
import PurchasesContext from "../../contexts/PurchasesContext";

export default function PurchasesSum() {
  const { state } = useContext(PurchasesContext);
  const {
    purchases: { items }
  } = state;
  console.log(items);
  return (
    <div className="input-group mb-3 col-6 purchases-list">
  <div className="input-group-prepend">
    <span className="input-group-text">Итого</span>
  </div>
  <input type="text" class="form-control"  value={items.reduce((acc, curr) => acc + parseInt(curr.price,0), 0)}/>
</div>   
  );
}
