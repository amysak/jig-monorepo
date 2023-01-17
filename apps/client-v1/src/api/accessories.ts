import { api } from "./Api";

function getDefaultAccessories(query = "") {
  return api.get(`/defaultsetup/accessories${query}`);
}

function getRoomAccessories(roomId: any, query = "") {
  return api.get(`/accessorysetup/rooms/${roomId}${query}`);
}

function createRoomAccessory(payload: any) {
  return api.post("/accessorysetup/rooms", payload);
}

function getOneAccessorySetup(id: any) {
  return api.get(`/accessorysetup/${id}`);
}

function updateAccessory(
  id: any,
  payload: {
    [x: number]: any;
    unit_of_measurement?: any;
    classification?: any;
  }
) {
  //@ts-ignore
  return api.update(`/accessorysetup/${id}`, payload);
}

function getAccessoryCategories() {
  return api.get("/accessorysetup/categories");
}

function getAccessoryClassification(category = "") {
  return api.get(`/accessorysetup/classifications?category=${category}`);
}

function createAccessorySetup(payload: any) {
  return api.post(`/accessorysetup/`, payload);
}

function uploadAccessoryImage(payload: FormData) {
  return api.post("/accessorysetup/upload", payload);
}

function deleteOneAccessory(id: any) {
  return api.delete(`/accessorysetup/${id}`);
}

function duplicateAccessory(payload: { id: any }) {
  return api.post("/accessorysetup/duplicate", payload);
}

function createAccessoryClassification(payload: { name: any }) {
  return api.post("/accessorysetup/classifications", payload);
}

function getUnits() {
  return api.get("/accessorysetup/units");
}

export {
  getDefaultAccessories,
  getRoomAccessories,
  createRoomAccessory,
  getOneAccessorySetup,
  updateAccessory,
  getAccessoryCategories,
  getAccessoryClassification,
  createAccessorySetup,
  uploadAccessoryImage,
  deleteOneAccessory,
  duplicateAccessory,
  createAccessoryClassification,
  getUnits,
};
