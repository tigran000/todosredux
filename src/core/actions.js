import * as types from "./constants";

export const addList = name => ({
  type: types.ADD_LIST,
  name
});

export const addToDo = name => ({
  type: types.ADD_TODO,
  name
});

export const selectList = selectedList => ({
  type: types.SELECT_LIST,
  selectedList
});

export const check = checkedToDo => ({
  type: types.CHECK_TODO,
  checkedToDo
});
