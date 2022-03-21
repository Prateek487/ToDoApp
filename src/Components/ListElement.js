import classes from "./ListElement.module.css";
import { useContext } from "react";
import DataContext from "./Auth/store/Data-Context";

const ListElement = (props) => {
  const dataCtx = useContext(DataContext);
  const onClickHandler = (id, val) => {
    fetch(
      `https://project-1-to-do-app-default-rtdb.firebaseio.com/Users/${dataCtx.stId}/ToDoList/${id}/.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          IsDone: !val,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
        console.log(data);
        const tempToDoList = [];
        for (const item in dataCtx.data.ToDoList) {
          if (dataCtx.data.ToDoList[item].itemId === id) {
            console.log("got the match");
            tempToDoList.push({
              itemId: id,
              Item: dataCtx.data.ToDoList[item].Item,
              IsDone: !val,
            });
          } else {
            tempToDoList.push(dataCtx.data.ToDoList[item]);
          }
        }
        dataCtx.setData({ Email: dataCtx.data.Email, ToDoList: tempToDoList });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const onDeleteHandler = (id) => {
    fetch(
      `https://project-1-to-do-app-default-rtdb.firebaseio.com/Users/${dataCtx.stId}/ToDoList/${id}.json`,
      {
        method: "DELETE",
      }
    )
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
        console.log(data);
        const tempToDoList = [];
        for (const item in dataCtx.data.ToDoList) {
          if (dataCtx.data.ToDoList[item].itemId === id) {
            console.log("got the match");
          } else {
            tempToDoList.push(dataCtx.data.ToDoList[item]);
          }
        }
        dataCtx.setData({
          Email: dataCtx.data.Email,
          ToDoList: tempToDoList,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={props.Evalue.IsDone ? classes.Done : classes.NotDone}>
      <div className={classes.SetDone}>
        <button
          onClick={onClickHandler.bind(
            this,
            props.Evalue.itemId,
            props.Evalue.IsDone
          )}
        >
          {props.Evalue.Item}
        </button>
      </div>
      <div className={classes.Close}>
        <button onClick={onDeleteHandler.bind(this, props.Evalue.itemId)}>
          X
        </button>
      </div>
    </div>
  );
};

export default ListElement;
