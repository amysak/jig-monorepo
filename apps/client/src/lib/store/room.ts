import { Room } from "type-defs";
import { proxy, useSnapshot } from "valtio";

export const roomStore = proxy<Room>();

export const roomActions = {
  setRoom(room: Room) {
    Object.assign(roomStore, room);
  },
};

export const useRoomStore = () => useSnapshot(roomStore);

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
