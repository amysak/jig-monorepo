import { Profile } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetProfilePanelsData = ResponseDataWithCount<Profile>;

function getProfilePanels(): AsyncResponse<TGetProfilePanelsData> {
  return api.get("/profiles/panels");
}

export type TGetProfileEdgesData = TGetProfilePanelsData;

function getProfileEdges(): AsyncResponse<TGetProfileEdgesData> {
  return api.get("/profiles/edges");
}

export type TGetProfileFramesData = TGetProfilePanelsData;

function getProfileFrames(): AsyncResponse<TGetProfileFramesData> {
  return api.get("/profiles/frames");
}

function getProfilesByCategory(category: string): AsyncResponse<Profile> {
  return api.get(`/profiles/${category}`);
}

function createProfile(payload: any): AsyncResponse<Profile[]> {
  return api.post("/profiles", payload);
}

function getProfile(profileId: string): AsyncResponse<Profile> {
  return api.get(`/profiles/${profileId}`);
}

function updateProfile(
  profileId: string,
  payload: { [x: number]: any }
): AsyncResponse<Profile> {
  return api.update(`/profiles/${profileId}`, payload);
}

function uploadProfileImage(payload: FormData): AsyncResponse<any> {
  return api.post("/profiles/upload", payload);
}

function deleteOneProfile(id: any) {
  return api.delete(`/profiles/${id}`);
}

function duplicateProfile(payload: { id: any }) {
  return api.post("/profiles/duplicate", payload);
}

export {
  getProfilePanels,
  getProfileEdges,
  getProfileFrames,
  getProfilesByCategory,
  createProfile,
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteOneProfile,
  duplicateProfile,
};
