import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const New = ({ inputs, title }) => {

  const [ data, setData] = useState({});
  
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({...data, [id]:value});
  }

  console.log(data);
 
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "balance"), {...data, timestamp:Date.now()});
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="from">
            <form onSubmit={handleAdd} >
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    id={input.id}
                    type={input.type} 
                    placeholder={input.placeholder}
                    onChange={handleInput} />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
