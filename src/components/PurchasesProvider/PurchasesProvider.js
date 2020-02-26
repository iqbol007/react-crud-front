import React, { useReducer } from "react";
import { FETCH_PURCHASES_REQUEST, FETCH_PURCHASES_SUCCESS, FETCH_PURCHASES_FAILURE, REMOVE_PURCHASE_CONFIRM, REMOVE_PURCHASE_CANCEL, REMOVE_PURCHASE_REQUEST, REMOVE_PURCHASE_SUCCESS, REMOVE_PURCHASE_FAILURE, EDIT_PURCHASE_FIELD_CHANGE, EDIT_PURCHASE_EXISTING, EDIT_PURCHASE_CANCEL, EDIT_PURCHASE_REQUEST, EDIT_PURCHASE_SUCCESS, EDIT_PURCHASE_FAILURE, GET_PURCHASE_BY_ID_REQUEST, GET_PURCHASE_BY_ID_SUCCSES, GET_PURCHASE_BY_ID_FAILURE, GET_PURCHASE_BY_ID_CANCEL, HIDE_DESCRIPTION } from "../../actions/actionTypes";
import PurchasesContext from "../../contexts/PurchasesContext";
 
const initialState = {
  purchases: {
    items: [],
    loading: false,
    error: null
  },
  removedPurchase: {
    id: 0,
    loading: false,
    error: null
  },
  editedPurchase: {
    item: {
      id: 0,
      category: "",
      price: "",
      description:''
    },
    loading: false,
    error: null
  },
  descPurchase: {
    item: {},
    id:0,
    loading: false,
    error: null,
  }
};

function purchasesReducer(prevPurchases, action) {
  switch (action.type) {
    case FETCH_PURCHASES_REQUEST:
      return { ...prevPurchases, loading: true, error: null };
    case FETCH_PURCHASES_SUCCESS:
      return { items: action.payload.items, loading: false, error: null };
    case FETCH_PURCHASES_FAILURE:
      return { ...prevPurchases, loading: false, error: action.payload.error };
    default:

      return prevPurchases;
  }

  
}

function purchaseRemoveReducer(prevPurchase, action) {
  switch (action.type) {
    case REMOVE_PURCHASE_CONFIRM:
      return { id: action.payload.id, loading: false, error: null };
    case REMOVE_PURCHASE_CANCEL:
      return { id: 0, loading: false, error: null };
    case REMOVE_PURCHASE_REQUEST:
      return { ...prevPurchase, loading: true, error: null };
    case REMOVE_PURCHASE_SUCCESS:
      return { id: 0, loading: false, error: null };
    case REMOVE_PURCHASE_FAILURE:
      return { ...prevPurchase, loading: false, error: action.payload.error };
    default:
      return prevPurchase;
  }
}

function purchaseEditReducer(prevPurchase, action) {
  switch (action.type) {
    case EDIT_PURCHASE_FIELD_CHANGE:
      return {
        ...prevPurchase,
        item: { ...prevPurchase.item, [action.payload.name]: action.payload.value }
      };
    case EDIT_PURCHASE_EXISTING:
      return { item: { ...action.payload.item }, loading: false, error: null };
    case EDIT_PURCHASE_CANCEL:
      return {
        item: { id: 0, category: "image", price: "",description:'' },
        loading: false,
        error: null
      };
    case EDIT_PURCHASE_REQUEST:
      return { ...prevPurchase, loading: true, error: null };
    case EDIT_PURCHASE_SUCCESS:
      return {
        item: { id: 0, category: "image", price: "",description:'' },
        loading: false,
        error: null
      };
    case EDIT_PURCHASE_FAILURE:
      return { ...prevPurchase, loading: false, error: action.payload.error };
    default:
      return prevPurchase;
  }
}
function descPurchaseReducer(prevDescPurchase, action) {
  
    
  switch (action.type) {
    case GET_PURCHASE_BY_ID_REQUEST:
      return { ...prevDescPurchase,id:action.payload.id, loading: true, error: null  };
    case GET_PURCHASE_BY_ID_SUCCSES:     
      return {
        item:action.payload.item,
        id:action.payload.id,
        loading: false,
        error: null,
        hide: false
      };
    case GET_PURCHASE_BY_ID_FAILURE:
      return {
        ...prevDescPurchase,
        loading: false,
        error: action.payload.error,
        hide: true
      };
      case GET_PURCHASE_BY_ID_CANCEL:
          return {...prevDescPurchase,loading:false,error:null,hide:true}
    default:
      return prevDescPurchase;
  }

  
}

function reducer(prevState, action) {
 
    
  switch (action.type) {
    case FETCH_PURCHASES_REQUEST:
    case FETCH_PURCHASES_SUCCESS:
    case FETCH_PURCHASES_FAILURE:
      return { ...prevState, purchases: purchasesReducer(prevState.purchases, action) };
    case REMOVE_PURCHASE_CONFIRM:
    case REMOVE_PURCHASE_CANCEL:
    case REMOVE_PURCHASE_REQUEST:
    case REMOVE_PURCHASE_SUCCESS:
    case REMOVE_PURCHASE_FAILURE:
      return {
        ...prevState,
        removedPurchase: purchaseRemoveReducer(prevState.removedPurchase, action)
      };
    case EDIT_PURCHASE_FIELD_CHANGE:
    case EDIT_PURCHASE_EXISTING:
    case EDIT_PURCHASE_CANCEL:
    case EDIT_PURCHASE_REQUEST:
    case EDIT_PURCHASE_SUCCESS:
    case EDIT_PURCHASE_FAILURE:
      return {
        ...prevState,
        editedPurchase: purchaseEditReducer(prevState.editedPurchase, action)
      };
    case GET_PURCHASE_BY_ID_REQUEST:
    case GET_PURCHASE_BY_ID_SUCCSES:
    case GET_PURCHASE_BY_ID_FAILURE:
    case GET_PURCHASE_BY_ID_CANCEL:
    case HIDE_DESCRIPTION:   
        
      return {
        ...prevState,
        descPurchase: descPurchaseReducer(prevState.descPurchase, action)
      };
    default:
      return prevState;
  }
}

export default function PurchasesProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
     
    <PurchasesContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PurchasesContext.Provider>
  );
}
