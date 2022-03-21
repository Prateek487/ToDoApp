import Header from "./Components/Header";
import MyButton from "./Components/MyButton";
import AuthForm from "./Components/Login/AuthForm";
import { Navigate, Route, Routes } from "react-router-dom";
import ListComp from "./Components/ListComp";

import React, { Fragment, useContext } from "react";
import UserList from "./Components/UserList";
import AuthContext from "./Components/Auth/store/Auth-Context";

const Users = [{ Name: "Prateek", ToDoList: ["Task1", "Task2"] }];
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              !authCtx.isLoggedIn ? (
                <AuthForm isLogin={true} />
              ) : (
                <Navigate to="/userlist" replace />
              )
            }
          ></Route>
          <Route
            path="/register"
            element={<AuthForm isLogin={false} />}
          ></Route>
          <Route
            path="/userlist"
            element={
              authCtx.isLoggedIn ? (
                <UserList Users={Users}></UserList>
              ) : (
                <Navigate to="/login" replace></Navigate>
              )
            }
          ></Route>
          <Route
            path="/todolist"
            element={
              authCtx.isLoggedIn ? (
                <Fragment>
                  <MyButton></MyButton>
                  <ListComp />
                </Fragment>
              ) : (
                <Navigate to="/login" replace></Navigate>
              )
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
