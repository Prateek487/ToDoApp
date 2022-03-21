import { Fragment, useContext } from "react";
import AuthContext from "./Auth/store/Auth-Context";
import { Link } from "react-router-dom";

import classes from "./header.module.css";
import DataContext from "./Auth/store/Data-Context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const logoutHandler = () => {
    dataCtx.removeData();
    dataCtx.removeStId();
    authCtx.removeEmail();
    authCtx.logout();
  };
  return (
    <Fragment>
      <div className={classes.HeaderBar}>My To-Do App</div>
      {authCtx.isLoggedIn && (
        <Fragment>
          <div className={classes.NavBar}>
            <Link to="/userlist">Users</Link>
            <Link to="/todolist">To Do List</Link>
          </div>
          <div className={classes.LogoutButton}>
            <button
              onClick={logoutHandler}
              type="button"
              className={classes.Button}
            >
              Logout
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Header;
