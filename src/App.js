import React from "react";
import styles from "./App.module.css";
import PurchasesProvider from "./components/PurchasesProvider/PurchasesProvider";
import PurchaseEditForm from "./components/PurchaseEditForm/PurchaseEditForm";
import PurchasesList from "./components/PurchasesList/PurchasesList";

function App() {
  return (
    <div className={styles.reduxBlock}>
      <div className={styles.App}>
      <PurchasesProvider>
        <PurchaseEditForm />
        <PurchasesList />
      </PurchasesProvider>
      </div>
    </div>
    
  );
}

export default App;
