import React from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import ToDo from "./ToDo";
import AddItem from "../AddItem";

import "./ToDos.css";

import { addToDo, check } from "../../core/actions";
import { selectedListSelector } from "../../core/selectors";

function ToDos({ selectedList, addToDo, check }) {
  const done = selectedList.toDos.filter(toDo => toDo.checked === true);

  const addToDoHandler = (newToDo, setToDoName) => {
    if (!newToDo) {
      Swal.fire("Oops...", "Provide to do description", "error");
    } else if (selectedList.toDos.find(toDo => toDo.name === newToDo)) {
      Swal.fire("Oops...", "Such to do description already exist", "error");
    } else {
      addToDo(newToDo);
      setToDoName("");
    }
  };

  return (
    <div className="ToDos">
      <div className="ToDos-list">
        <h1 className="title"> {selectedList.name}</h1>
        <div className="done">
          {done.length} of {selectedList.toDos.length} Done
        </div>
        {selectedList.toDos.map(toDo => (
          <ToDo
            key={toDo.name}
            name={toDo.name}
            checked={toDo.checked}
            handleCheck={event => check(event.target.name)}
          />
        ))}
      </div>
      <AddItem placeholder="Enter new list name" addItem={addToDoHandler} />
    </div>
  );
}

export default connect(
  state => ({ selectedList: selectedListSelector(state) }),
  { addToDo, check }
)(ToDos);
