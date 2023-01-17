import { proxy, useSnapshot } from "valtio";
// import type { Account } from "shared";

// // export const filters: Filter[] = ['all', 'completed']
// // type Filter = 'all' | 'completed'

// interface Store {
//   account?: Partial<Account>;
//   isAuth: boolean;
// }

// export const store = proxy<Store>({
//   account: null,
//   isAuth: false,
// });

// let id = 0;
// export const actions = {
//   setAccount(account: Omit<Account, "id">) {
//     store.account = account;
//   },
//   removeTodo(id: number) {
//     store.todos = store.todos.filter((todo) => todo.id !== id);
//   },
//   toggleFilter(filter: Filter) {
//     store.filter = filter;
//   },
// };

// // export function useTodos() {
// //   const snapShot = useSnapshot(store)

// //   switch (snapShot.filter) {
// //     case 'all':
// //       return snapShot.todos
// //     case 'completed':
// //       return snapShot.todos.filter((todo) => todo.completed)
// //     default:
// //       throw Error('Error: un supported filter')
// //   }
// // }

// // export function useFilter() {
// //   return useSnapshot(store).filter
// // }

// function useAccount() {
//   return useSnapshot(store);
// }
