import { Client } from "entities";
import { api, apiV2, AsyncResponse } from "./Api";

async function getClient(clientId: string): AsyncResponse<Client> {
  return api.get(`/clients/${clientId}`);
}
export type TGetClientsData = { clients: Client[]; count: number };

// Could later be changed to something like:
// async function getClients(opts?: {
//     limit?: number
// }): AsyncResponse<TGetClientsData> {
async function getClients(query = ""): Promise<TGetClientsData> {
  const data = await apiV2.get(`/clients?${query}`);

  return {
    count: data.total,
    clients: data.clients,
  };
}

async function createClient(payload: { name: string }): AsyncResponse<Client> {
  return api.post("/clients", payload);
}

async function updateClient(
  id: string,
  payload: Partial<Client>
): AsyncResponse<Client> {
  return apiV2.update(`/clients/${id}`, payload);
}

async function deleteClient(clientId: string): AsyncResponse<any> {
  return api.delete(`/clients/${clientId}`);
}

export { getClient, getClients, createClient, updateClient, deleteClient };
