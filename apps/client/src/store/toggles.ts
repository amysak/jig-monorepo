import { proxy, subscribe, useSnapshot } from "valtio";

export type SetupViews = "table" | "card";

interface ToggleStore {
  // TOOD: create enum
  view: SetupViews;
}

const initialStore: ToggleStore = {
  view: "table",
};
const retrievedStore = localStorage.getItem("toggles");

export const toggleStore = proxy<ToggleStore>(
  retrievedStore ? JSON.parse(retrievedStore) : initialStore
);

export const toggleActions = {
  setView(view: SetupViews) {
    toggleStore.view = view;
  },
};

export const useToggles = () => {
  return useSnapshot(toggleStore);
};

subscribe(toggleStore, () => {
  localStorage.setItem("toggles", JSON.stringify(toggleStore));
});

// export const filters: Filter[] = ['all', 'completed']
// type Filter = 'all' | 'completed'

// export function useTodos() {
//   const snapShot = useSnapshot(store)

//   switch (snapShot.filter) {
//     case 'all':
//       return snapShot.todos
//     case 'completed':
//       return snapShot.todos.filter((todo) => todo.completed)
//     default:
//       throw Error('Error: un supported filter')
//   }
// }

// export function useFilter() {
//   return useSnapshot(store).filter
// }
