import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ProgressBar from "../../components/progressbar/ProgressBar";
import { CircularProgress } from "@mui/material";
import Modal from "../modal/Modal";

const List = () => {
  
  const [modal, setModal] = useState({isOpen:false, type:"add", id:""})
  const [data, setData] = useState({});
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  let amount = 0;

  useEffect(() => {
    const fetchData = async () => {
      let list = [];

      try {
        const querySnapshot = await getDocs(collection(db, "my_goals"));
        const querySnapshotBalance = await getDocs(collection(db, "balance"));
        querySnapshot.forEach((doc) => {
          // list.push({ id: doc.id, ...doc.data() });
          setData({ id: doc.id, ...doc.data() });
        });

        querySnapshotBalance.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          if (doc.data().type === "deposit") {
            amount += parseInt(doc.data().amount);
          } else {
            amount -= parseInt(doc.data().amount);
          }
        });

        setBalance(amount);
        setAccount(list);
        setLoading(false);
      } catch (error) {
        console.error("error fetching balance:", error);
      }
    };
    fetchData();
  }, []);

  function toMoney(amount) {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  return (
    <div className="list">
      <Sidebar />
      {loading ? (
        <div className="listContainer">
          <Navbar />
          <div className="loading">
            <CircularProgress className="spinner" />
          </div>
        </div>
      ) : (
        <div className="listContainer">
          <Navbar />
         
          <div className="title-time">
            <h2>Goal: {data.goal_name} </h2>
            {/* <h4>{JSON.stringify(account)}</h4> */}
          </div>
          <div className="grid">
            <div className="item-current">{toMoney(balance)}</div>
            <div className="item"></div>
            <div className="item-remining">
              {toMoney(data.target - data.balance)}
            </div>
            <div className="item"></div>
            <div className="item-target">{toMoney(data.target)}</div>
          </div>
          <ProgressBar progress={(balance * 100) / data.target} />
          <div className="datatableTitle">
            List of Transactions
            <button className="link" onClick={() => {setModal({isOpen:true, type:"add"})}}>
              Add Transaction
            </button>
          </div>
          <Datatable transactionData={account}  setModal={setModal} />
        </div>
      )}
       {modal.isOpen && <Modal setModal={setModal} modal={modal} />}
    
    </div>
  );
};

export default List;
