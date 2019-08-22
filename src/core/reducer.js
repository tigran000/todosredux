import produce from "immer";

import { ADD_LIST, ADD_TODO, CHECK_TODO, SELECT_LIST } from "./constants";
const initalState = {
  lists: [
    { name: "Private", toDos: [] },
    { name: "Work", toDos: [] },
    { name: "Training", toDos: [] },
    { name: "Friends", toDos: [] }
  ],
  selectedList: { name: "Private", toDos: [] }
};

function toDos(state = initalState, action) {
  switch (action.type) {
    case ADD_LIST: {
      const { name } = action;
      const nextState = produce(state, draftState => {
        draftState.lists.push({ name, toDos: [] });
      });
      return nextState;
    }
    case ADD_TODO: {
      const { name } = action;
      const { selectedList } = state;
      const selectedListIndex = state.lists.findIndex(
        list => list.name === selectedList.name
      );
      const nextState = produce(state, draftState => {
        draftState.lists[selectedListIndex].toDos.push({
          name,
          checked: false
        });
        draftState.selectedList = draftState.lists[selectedListIndex];
      });
      return nextState;
    }
    case CHECK_TODO: {
      const { checkedToDo } = action;
      const { lists, selectedList } = state;
      const selectedListIndex = lists.findIndex(
        list => list.name === selectedList.name
      );

      const selectedToDoIndex = lists[selectedListIndex].toDos.findIndex(
        toDo => toDo.name === checkedToDo
      );
      const nextState = produce(state, draftState => {
        draftState.lists[selectedListIndex].toDos[
          selectedToDoIndex
        ].checked = !draftState.lists[selectedListIndex].toDos[
          selectedToDoIndex
        ].checked;
        draftState.selectedList = draftState.lists[selectedListIndex];
      });
      return nextState;
    }
    case SELECT_LIST: {
      const { selectedList } = action;
      const nextState = produce(state, draftState => {
        draftState.selectedList = selectedList;
      });
      return nextState;
    }
    default:
      return state;
  }
}

export default toDos;
