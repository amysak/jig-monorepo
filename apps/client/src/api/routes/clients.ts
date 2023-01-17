import { Client } from "type-defs";
import { client } from "../http";

export const getById = (clientId: string): Promise<Client> => {
  return client.get(`/clients/${clientId}`);
};
export type TGetClientsData = { clients: Client[]; count: number };

// Could later be changed to something like:
// export const getClients(opts?: => {
//     limit?: number
// }): Promise<TGetClientsData> {
export const getAll = async (query = ""): Promise<TGetClientsData> => {
  const data = await client.get(`/clients?${query}`);

  return {
    count: data.total,
    clients: data.clients,
  };
};

export const create = (payload: { name: string }): Promise<Client> => {
  return client.post("/clients", payload);
};

export const updateById = (
  id: string | number,
  payload: Partial<Client>
): Promise<Client> => {
  return client.update(`/clients/${id}`, payload);
};

export const deleteById = (clientId: string | number): Promise<any> => {
  return client.delete(`/clients/${clientId}`);
};
