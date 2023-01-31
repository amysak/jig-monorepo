export {};
// import { client } from "../http";
// import { Markup } from "type-defs";

// function createMarkup(payload: {
//   is_default: boolean;
//   status: any;
// }): Promise<Markup> {
//   return client.post("/markups", payload);
// }

// export async function getMarkup(id: string): Promise<Markup> {
//   return client.get(`/markups/${id}}`);
// }

// function getMarkupById(markupId: string): Promise<Markup> {
//   return client.get(`/markups/${markupId}`);
// }

// function updateMarkup(id: string, payload: Partial<Markup>): Promise<Markup> {
//   return client.update(`/markups/${id}`, payload);
// }

// function deleteMarkup(id: string): Promise<any> {
//   return client.delete(`/markups/${id}`);
// }

// function duplicateMarkup(payload: { id: any }): Promise<Markup> {
//   return client.post("/markups/duplicate", payload);
// }

// export {
//   createMarkup,
//   getMarkupById,
//   updateMarkup,
//   deleteMarkup,
//   duplicateMarkup,
// };
