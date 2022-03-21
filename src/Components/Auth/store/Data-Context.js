import React, { useState } from "react";

const DataContext = React.createContext({
  data: {Email:"",ToDoList : []},
  stId : "",
  setData : (data) => {},
  removeData : () => {},
  setStId : (stId) => {},
  removeStId : () => {}
});

export const DataContextProvider = (props) => {
  const [data, setData] = useState({Email:"",ToDoList : []});
  const [stId, setStId] = useState("");
  const setDataHandler = (data) => {
    setData(data);
  };

  const removeDataHandler = () => {
    setData({Email:"",ToDoList : []});
  };
  
  const setStIdHandler = (stId) => {
    setStId(stId);
  };

  const removeStIdHandler = () => {
    setStId("");
  };

  const contextValue = {
    data: data,
    stId : stId,
    setData : setDataHandler,
    removeData : removeDataHandler,
    setStId : setStIdHandler,
    removeStId : removeStIdHandler
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
