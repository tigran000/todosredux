import { createSelector } from "reselect";

export const listsSelector = createSelector(
  state => state.lists,
  lists => lists
);

export const selectedListSelector = createSelector(
  state => state.selectedList,
  selectedList => selectedList
);
