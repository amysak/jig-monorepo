import { all, fork } from "typed-redux-saga";

import {
  createClientJobWatcher,
  getClientJobsWatcher,
  getJobsWatcher,
  getOneJobWatcher,
} from "./jobs";

import {
  createClientWatcher,
  getClientsWatcher,
  getOneClientWatcher,
  updateClientWatcher,
} from "./clients";

import {
  createRoomWatcher,
  getJobRoomsWatcher,
  getOneRoomWatcher,
  getRoomsWatcher,
  updateRoomWatcher,
} from "./rooms";

import {
  getAccountPreferenceWatcher,
  getAccountUsersWatcher,
  getCompanyWatcher,
  updateAccountPreferenceWatcher,
  updateAccountWatcher,
} from "./account";

import {
  createTermWatcher,
  getDefaultTermsWatcher,
  getJustOneTermWatcher,
  getOneTermWatcher,
  updateTermWatcher,
} from "./terms";

import { createTaxWatcher, getOneTaxWatcher, updateTaxWatcher } from "./taxes";

import {
  createDeliveryWatcher,
  getOneDeliveryWatcher,
  updateDeliveryWatcher,
} from "./delivery";

import {
  createMarkupWatcher,
  getDefaultMarkupsWatcher,
  getOneMarkupByIdWatcher,
  getOneMarkupWatcher,
  updateMarkupWatcher,
} from "./markups";

import {
  createCabinetWatcher,
  getCabinetsByRoomWatcher,
  getOneCabinetByIdWatcher,
  getOneCabinetWatcher,
  getSetupCabinetsWatcher,
  updateCabinetWatcher,
} from "./cabinets";

import {
  createCabinetSpecificationWatcher,
  getCabinetSpecificationWatcher,
  updateCabinetSpecificationWatcher,
} from "./cabinets/specifications";

import {
  createRoomMaterialWatcher,
  getDefaultMaterialNamesWatcher,
  getDefaultMaterialsWatcher,
  getOneMaterialWatcher,
  getRoomMaterialWatcher,
  getSetupMaterialNamesWatcher,
  getSetupMaterialsWatcher,
  updateMaterialWatcher,
} from "./materials";

import {
  createHardwareWatcher,
  getDefaultHardwaressWatcher,
  getOneHardwareWatcher,
  getSetupHardwareWatcher,
  updateHardwareWatcher,
} from "./hardwares";

import {
  getDefaultLettersWatcher,
  getOneLetterWatcher,
  updateLetterWatcher,
} from "./letters";

import { getDoorProfilesWatcher, getDoorWatcher } from "./doors";

import {
  createRoomAccessoryWatcher,
  getAccessoriesWatcher,
  getDefaultAccessoriesWatcher,
  getRoomAccessoriesWatcher,
} from "./accessories";

import {
  createTrimMoldingWatcher,
  getDefaultTrimsWatcher,
  getOneTrimMoldingWatcher,
  getRoomTrimMoldingsWatcher,
  getTrimMoldingClassificationWatcher,
  getTrimMoldingSubclassificationWatcher,
  getTrimsWatcher,
  updateTrimMoldingWatcher,
} from "./trims";

import { getSetupFinishesWatcher, updateSetupFinishWatcher } from "./finishes";

import {
  createPanelWatcher,
  getRoomPanelsWatcher,
  getSetupPanelsWatcher,
} from "./panels";

import {
  getProfileEdgesWatcher,
  getProfileFramesWatcher,
  getProfilePanelsWatcher,
} from "./profiles";

function* appSaga() {
  yield* all([
    fork(getJobsWatcher),
    fork(getOneJobWatcher),
    fork(getClientJobsWatcher),
    fork(createClientJobWatcher),

    fork(getClientsWatcher),
    fork(getOneClientWatcher),
    fork(updateClientWatcher),
    fork(createClientWatcher),

    fork(getRoomsWatcher),
    fork(getOneRoomWatcher),
    fork(getJobRoomsWatcher),
    fork(createRoomWatcher),
    fork(updateRoomWatcher),

    fork(getCompanyWatcher),
    fork(updateAccountWatcher),
    fork(getAccountUsersWatcher),
    fork(getAccountPreferenceWatcher),
    fork(updateAccountPreferenceWatcher),

    fork(createTermWatcher),
    fork(getOneTermWatcher),
    fork(getDefaultTermsWatcher),
    fork(getJustOneTermWatcher),
    fork(updateTermWatcher),

    fork(createTaxWatcher),
    fork(updateTaxWatcher),
    fork(getOneTaxWatcher),

    fork(createDeliveryWatcher),
    fork(updateDeliveryWatcher),
    fork(getOneDeliveryWatcher),

    fork(getOneMarkupWatcher),
    fork(createMarkupWatcher),
    fork(getDefaultMarkupsWatcher),
    fork(getOneMarkupByIdWatcher),
    fork(updateMarkupWatcher),

    fork(getOneCabinetWatcher),
    fork(createCabinetWatcher),
    fork(getSetupCabinetsWatcher),
    fork(getCabinetsByRoomWatcher),
    fork(getOneCabinetByIdWatcher),
    fork(updateCabinetWatcher),

    fork(getCabinetSpecificationWatcher),
    fork(updateCabinetSpecificationWatcher),
    fork(createCabinetSpecificationWatcher),

    fork(getSetupPanelsWatcher),
    fork(getRoomPanelsWatcher),
    fork(createPanelWatcher),

    fork(getDefaultMaterialsWatcher),
    fork(getSetupMaterialsWatcher),
    fork(getOneMaterialWatcher),
    fork(updateMaterialWatcher),
    fork(getDefaultMaterialNamesWatcher),
    fork(getSetupMaterialNamesWatcher),
    fork(getRoomMaterialWatcher),
    fork(createRoomMaterialWatcher),

    fork(getDefaultHardwaressWatcher),
    fork(createHardwareWatcher),
    fork(getOneHardwareWatcher),
    fork(updateHardwareWatcher),
    fork(getSetupHardwareWatcher),

    fork(getDefaultLettersWatcher),
    fork(getOneLetterWatcher),
    fork(updateLetterWatcher),

    fork(getDoorProfilesWatcher),
    fork(getDoorWatcher),

    fork(getAccessoriesWatcher),
    fork(getRoomAccessoriesWatcher),
    fork(getDefaultAccessoriesWatcher),
    fork(createRoomAccessoryWatcher),

    fork(getTrimsWatcher),
    fork(getDefaultTrimsWatcher),
    fork(getOneTrimMoldingWatcher),
    fork(updateTrimMoldingWatcher),
    fork(getTrimMoldingClassificationWatcher),
    fork(getTrimMoldingSubclassificationWatcher),
    fork(createTrimMoldingWatcher),
    fork(getRoomTrimMoldingsWatcher),

    fork(getSetupFinishesWatcher),
    fork(updateSetupFinishWatcher),

    fork(getProfilePanelsWatcher),
    fork(getProfileEdgesWatcher),
    fork(getProfileFramesWatcher),
  ]);
}

export { appSaga };
