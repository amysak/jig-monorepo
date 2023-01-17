import { Panel } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetSetupPanelsData = ResponseDataWithCount<Panel>;

function getSetupPanels(query = ""): AsyncResponse<TGetSetupPanelsData> {
  return api.get(`/defaultsetup/panels${query}`);
}

export type TGetRoomPanelsData = TGetSetupPanelsData;

function getRoomPanels(
  roomId: string,
  query = ""
): AsyncResponse<TGetRoomPanelsData> {
  return api.get(`/panels/rooms/${roomId}${query}`);
}

function createPanel(payload: any): AsyncResponse<Panel> {
  return api.post("/panels", payload);
}

function getOnePanel(id = ""): AsyncResponse<Panel> {
  return api.get(`/panels/${id}`);
}

function deletePanel(panelId: string): AsyncResponse<any> {
  return api.delete(`/panels/${panelId}`);
}

function updatePanel(
  panelId: string,
  payload: { [x: number]: any }
): AsyncResponse<Panel> {
  return api.update(`/panels/${panelId}`, payload);
}

export {
  getSetupPanels,
  getRoomPanels,
  createPanel,
  getOnePanel,
  deletePanel,
  updatePanel,
};
