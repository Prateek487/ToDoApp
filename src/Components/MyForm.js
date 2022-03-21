import { useRef, useContext } from "react";

import AuthContext from "./Auth/store/Auth-Context";
import DataContext from "./Auth/store/Data-Context";

import classes from "./myForm.module.css";

const MyForm = (props) => {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const NameVal = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const EnteredItem = NameVal.current.value;
    let url = "";
    let reqBody = {};
    if (dataCtx.data.Email) {
      url = `https://project-1-to-do-app-default-rtdb.firebaseio.com/Users/${dataCtx.stId}/ToDoList.json`;
      reqBody = {
        Item: EnteredItem,
        IsDone: false,
      };
    } else {
      url = `https://project-1-to-do-app-default-rtdb.firebaseio.com/Users/.json`;
      reqBody = {
        Email: authCtx.email,
        ToDoList: [
          {
            Item: EnteredItem,
            IsDone: false,
          },
        ],
      };
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Email or Password Invalid";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        NameVal.current.value = "";
        if (!dataCtx.data.Email) {
          dataCtx.setData({
            Email: authCtx.email,
            ToDoList: [{ itemId: "0", Item: EnteredItem, IsDone: false }],
          });
          dataCtx.setStId(data.name);
        } else {
          dataCtx.setData({
            Email: authCtx.email,
            ToDoList: [
              ...dataCtx.data.ToDoList,
              { itemId: data.name, Item: EnteredItem, IsDone: false },
            ],
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={classes.Form}>
      <form onSubmit={onSubmitHandler}>
        <label>Add New Item:</label>
        <input ref={NameVal} type="text" />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default MyForm;
