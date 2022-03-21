import { Fragment, useContext } from "react";
import DataContext from "./Auth/store/Data-Context";
import ListElement from "./ListElement";

import classes from "./ListComp.module.css";

const ListComp = (props) => {
  const dataCtx = useContext(DataContext);
  return (
    <Fragment>
      <h1 className={classes.UserList}>To Do List</h1>
      <div className={classes.ListComp}>
        {dataCtx.data.ToDoList.map((element) => (
          <div>
            <ListElement id={element.itemId} Evalue={element}></ListElement>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ListComp;
