import React from "react";
import styles from "./Modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";


const Modal = ({ modal, setModal }) => {
  const expences = [
    {
      id: "amount",
      label: "Amount",
      type: "number",
      placeholder: "Enter Amount",
    },
    {
      id: "type",
      label: "Deposit | Withdraw",
      type: "text",
      placeholder: "Deposit",
    },
    {
      id: "from",
      label: "income from",
      type: "text",
      placeholder: "full-time Tesla",
    },
    {
      id: "Date",
      label: "Income Date",
      type: "text",
      placeholder: "06/01/2023",
    },
  ];

  const [data, setData] = useState({});

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "balance"), data);
      console.log("Document written with ID: ", docRef.id);
      setModal({isOpen: false });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "balance", modal.id));
      console.log("Document deleted successfully!");
      setModal({isOpen: false });
    } catch (e) {
      console.error("error when delete doc");
    }
  };

  return (
    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div
          className={modal.type === "delete" ? styles.deleteModal : styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{modal.type} transaction</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setModal({ ...modal, isOpen: false })}>
            <CloseIcon style={{ marginBottom: "-3px" }} />
          </button>
          {modal.type === "delete" ? (
            <>
              <div className={styles.modalContent}>
                {modal.type} doc id {modal.id}
              </div>
            </>
          ) : (
            <>
              <div className={styles.modalContent}>Add Transfer amount</div>
              <div className="form-add">
                <form>
                   
                  {expences.map((input) => (
                    <div className={styles.formInput} key={input.id}>
                      <label>{input.label}</label>
                      <input
                        id={input.id}
                        type={input.type}
                        placeholder={input.placeholder}
                        onChange={handleInput}
                      />
                    </div>
                  ))}
               
                </form>
              </div>
            </>
          )}
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={
                  modal.type === "delete" ? styles.deleteBtn : styles.Btn
                }
                onClick={(modal.type === "add") ? handleAdd : handleDelete}
              >
                {modal.type}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setModal({ ...modal, isOpen: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
