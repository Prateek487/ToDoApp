import { findByText } from "@testing-library/react";
import { useEffect, useContext, useState, Fragment } from "react";

import AuthContext from "./Auth/store/Auth-Context";
import DataContext from "./Auth/store/Data-Context";

import classes from "./UserList.module.css";

const UserList = (props) => {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const [Users, setUsers] = useState([{ Email: "", ToDoList: [] }]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://project-1-to-do-app-default-rtdb.firebaseio.com/Users.json"
      );
      const resData = await response.json();
      const LoadedData = [];

      for (const key in resData) {
        const ToDoList = [];
        for (const item in resData[key].ToDoList) {
          const tempToDoItem = {
            itemId: item,
            Item: resData[key].ToDoList[item].Item,
            IsDone: resData[key].ToDoList[item].IsDone,
          };
          ToDoList.push(tempToDoItem);
        }
        LoadedData.push({
          Email: resData[key].Email,
          ToDoList: ToDoList,
        });
        if (resData[key].Email === authCtx.email) {
          dataCtx.setData({ Email: authCtx.email, ToDoList: ToDoList });
          dataCtx.setStId(key);
        }
      }
      setUsers(LoadedData);
    };

    fetchData();
  }, []);
  return (
    <Fragment>
      <h1 className={classes.UserList}>User List</h1>
      <div className={classes.UserList}>
        {Users.map((item) => {
          return <label>{item.Email}</label>;
        })}
      </div>
    </Fragment>
  );
};

export default UserList;
