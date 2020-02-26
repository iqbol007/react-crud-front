import {
  FETCH_PURCHASES_REQUEST,
  FETCH_PURCHASES_SUCCESS,
  FETCH_PURCHASES_FAILURE,
  REMOVE_PURCHASE_CONFIRM,
  REMOVE_PURCHASE_CANCEL,
  REMOVE_PURCHASE_REQUEST,
  REMOVE_PURCHASE_SUCCESS,
  REMOVE_PURCHASE_FAILURE,
  EDIT_PURCHASE_FIELD_CHANGE,
  EDIT_PURCHASE_EXISTING,
  EDIT_PURCHASE_CANCEL,
  EDIT_PURCHASE_REQUEST,
  EDIT_PURCHASE_SUCCESS,
  EDIT_PURCHASE_FAILURE,
  GET_PURCHASE_BY_ID_REQUEST,
  GET_PURCHASE_BY_ID_SUCCSES,
  GET_PURCHASE_BY_ID_FAILURE,
  GET_PURCHASE_BY_ID_CANCEL
} from "./actionTypes";

export async function getPurchases(dispatch) {
  dispatch(fetchPurchasesRequest());
  try {
    const response = await fetch(
      "https://some-app-heroku.herokuapp.com/api/purchases"
    );
    if (!response.ok) {
      throw new Error();
    }
    const purchases = await response.json();
    dispatch(fetchPurchasesSuccess(purchases));
  } catch (e) {
    dispatch(fetchPurchasesFailure(e));
    throw e;
  }
}

export function fetchPurchasesRequest() {
  return {
    type: FETCH_PURCHASES_REQUEST,
    payload: {}
  };
}

export function fetchPurchasesSuccess(items) {
  return {
    type: FETCH_PURCHASES_SUCCESS,
    payload: {
      items
    }
  };
}

export function fetchPurchasesFailure(error) {
  return {
    type: FETCH_PURCHASES_FAILURE,
    payload: {
      error
    }
  };
}

export async function removePurchaseById(dispatch, id) {
  dispatch(removePurchaseRequest());
  try {
    const response = await fetch(
      `https://some-app-heroku.herokuapp.com/api/purchases${id}`,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) {
      throw new Error();
    }
    dispatch(removePurchaseSuccess());
  } catch (e) {
    dispatch(removePurchaseFailure(e));
    throw e;
  }
}

export function removePurchaseConfirm(id) {
  return {
    type: REMOVE_PURCHASE_CONFIRM,
    payload: { id }
  };
}

export function removePurchaseCancel() {
  return {
    type: REMOVE_PURCHASE_CANCEL,
    payload: {}
  };
}

export function removePurchaseRequest() {
  return {
    type: REMOVE_PURCHASE_REQUEST,
    payload: {}
  };
}

export function removePurchaseSuccess() {
  return {
    type: REMOVE_PURCHASE_SUCCESS,
    payload: {}
  };
}

export function removePurchaseFailure(error) {
  return {
    type: REMOVE_PURCHASE_FAILURE,
    payload: {
      error
    }
  };
}

export function editPurchaseChangeField(name, value) {
  return {
    type: EDIT_PURCHASE_FIELD_CHANGE,
    payload: {
      name,
      value
    }
  };
}

export function editPurchaseExisting(item) {
  return {
    type: EDIT_PURCHASE_EXISTING,
    payload: {
      item
    }
  };
}

export function editPurchaseCancel() {
  return {
    type: EDIT_PURCHASE_CANCEL,
    payload: {}
  };
}

export async function editPurchase(dispatch, item) {
  dispatch(editPurchaseRequest());
  try {
    const response = await fetch(
      `https://some-app-heroku.herokuapp.com/api/purchases`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      }
    );
    if (!response.ok) {
      throw new Error();
    }
    dispatch(editPurchaseSuccess());
  } catch (e) {
    dispatch(editPurchaseFailure(e));
    throw e;
  }
}

export function editPurchaseRequest() {
  return {
    type: EDIT_PURCHASE_REQUEST,
    payload: {}
  };
}

export function editPurchaseSuccess() {
  return {
    type: EDIT_PURCHASE_SUCCESS,
    payload: {}
  };
}

export function editPurchaseFailure(error) {
  return {
    type: EDIT_PURCHASE_FAILURE,
    payload: {
      error
    }
  };
}

//////////////////////////////////
export function getPurchaseByIdRequest(id) {
  return { type: GET_PURCHASE_BY_ID_REQUEST, payload: { id } };
}
export function getPurchaseByIdSuccses(item, id) {
  return { type: GET_PURCHASE_BY_ID_SUCCSES, payload: { item, id } };
}
export function getPurchaseByIdFailure(error) {
  return { type: GET_PURCHASE_BY_ID_FAILURE, payload: { error } };
}
export function getPurchaseCancel() {
  return {
    type: GET_PURCHASE_BY_ID_CANCEL,
    payload: {}
  };
}
export async function getPurchaseById(dispatch, id) {
  dispatch(getPurchaseByIdRequest(id));
  try {
    const response = await fetch(
      `https://some-app-heroku.herokuapp.com/api/purchases${id}`
    );
    if (!response.ok) {
      throw new Error();
    }
    const item = await response.json();
    console.log(item);

    dispatch(getPurchaseByIdSuccses(item, id));
  } catch (error) {
    dispatch(getPurchaseByIdFailure(error));
    throw error;
  }
}
