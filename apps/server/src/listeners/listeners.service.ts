import { Injectable, Inject } from "@nestjs/common";
// this module is supposed to connect typeorm repositories and create/modify records

// user.created
// mailService.sendOneTimePassword(user)

// user.verified
// setupService.onUserVerify(user)

// account.created
// setupService.onAccountCreate(account)

// client.created
// setupService.onClientCreate(client)

// job.created
// setupService.onJobCreate(job)

// room.cabinet:created
// -> add cabinet parts based on material set
// -> create toes (?)

// room.cabinet:changed
// -> update cabinet parts based on cabinet changes

//
// room.cabinet:deleted
// should remove connected records from db by cascade implemented by typeorm
//

// room.materialset.changed(oldMaterialSet, newMaterialSet)
// roomService.changeMaterials() <- can be run against old materialset and change less values
// invalidate cache

// room.laborRates:changed
// invalidate cache

// Below is what was setup.service.ts. This logic can be implemented here to get rid of setup

// Preffil an account with boilerplate ready-to-use examples
// onAccountCreate:
// -> setupDefaultTerms
// -> setupDefaultMarkups
// -> setupDefaultMaterialSets
// -> setupDefaultHardwareSets

// onClientCreate:
// -> set terms for client to a default terms for an account
// -> set markups for client to a default markups for an account

// onJobCreate:
// -> set terms for job to a default terms for a selected client, if no client to an account's
// -> set markups for job to a default markups for a selected client, if no client to an account's
// -> set default cabinetspecifications

// onRoomCreate:

// createJob:
// ->
// createRoom
