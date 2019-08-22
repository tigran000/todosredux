import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import List from "./List";
import AddItem from "../AddItem";
import "./Lists.css";

import { addList, selectList } from "../../core/actions";
import { listsSelector, selectedListSelector } from "../../core/selectors";

function Lists({ addList, selectList, selectedList, lists }) {
  const [displayedLists, setDisplayedLists] = useState(lists);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const filteredList = lists.filter(list =>
      list.name.toLowerCase().includes(searchValue)
    );
    setDisplayedLists(filteredList);
  }, [lists, searchValue]);

  const addListHandler = (newList, setListName) => {
    if (!newList) {
      Swal.fire("Oops...", "Provide name for list", "error");
    } else if (lists.find(list => list.name === newList)) {
      Swal.fire("Oops...", "Such list name already exist", "error");
    } else {
      addList(newList);
      setListName("");
    }
  };

  const selectListHandler = event => {
    const selectedList = displayedLists.find(
      list => list.name === event.target.name
    );
    selectList(selectedList);
  };

  const searchList = event => {
    const searchString = event.target.value.trim().toLowerCase();
    setSearchValue(searchString);
    const filteredList = lists.filter(list =>
      list.name.toLowerCase().includes(searchString)
    );
    setDisplayedLists(filteredList);
  };
  return (
    <div className="Lists">
      <h2 className="title"> Todo Lists</h2>
      <input
        className="search"
        placeholder="Search for List"
        onChange={searchList}
        maxLength="40"
      />
      <div className="Lists-names">
        {displayedLists.map(list => (
          <List
            list={list}
            key={list.name}
            selectList={selectListHandler}
            selectedList={selectedList}
          />
        ))}
      </div>
      <AddItem placeholder="Enter new list name" addItem={addListHandler} />
    </div>
  );
}

export default connect(
  state => ({
    lists: listsSelector(state),
    selectedList: selectedListSelector(state)
  }),
  { addList, selectList }
)(Lists);
