const createClientJobWatcher = () => ({} as any);
const getClientJobsWatcher = () => ({} as any);
const getJobsWatcher = () => ({} as any);
const getOneJobWatcher = () => ({} as any);

export {
  createClientJobWatcher,
  getClientJobsWatcher,
  getJobsWatcher,
  getOneJobWatcher,
};

// import { call, put, takeLatest } from "typed-redux-saga";

// import { ActionTypes } from "../../actions/types";
// import * as jobSvc from "../../api/jobs";
// import { serializeResponse } from "../../utilities/utils";

// import { getOneCabinetRequest } from "../../actions/cabinets";
// import { getOneDeliveryRequest } from "../../actions/delivery";
// import {
//   createClientJobFailure,
//   createClientJobSuccess,
//   getClientJobsFailure,
//   getClientJobsSuccess,
//   getJobsFailure,
//   getJobsSuccess,
//   getOneJobFailure,
//   getOneJobSuccess,
// } from "../../actions/jobs";
// import { getOneMarkupRequest } from "../../actions/markups";
// import { sendNotificationRequest } from "../../actions/notification";
// import { getOneTaxRequest } from "../../actions/taxes";
// import { getOneTermRequest } from "../../actions/terms";
// import { ENTITIES } from "../../utilities/constants";

// function* getJobsWorker(action: { query: string }) {
//   try {
//     const { jobs } = yield* call(jobSvc.getJobs, action.query);

//     yield* put(getJobsSuccess(serializeResponse(jobs)));
//   } catch (error) {
//     yield* put(getJobsFailure(error));
//   }
// }

// function* getJobsWatcher() {
//   // @ts-expect-error TS(2769): No overload matches this call.
//   yield* takeLatest(ActionTypes.GET_JOBS_REQUEST, getJobsWorker);
// }

// function* getOneJobWorker(action: { jobId: any }) {
//   try {
//     const job = yield* call(jobSvc.getJob, action.jobId);

//     yield* put(getOneJobSuccess(job));
//   } catch (error) {
//     yield* put(getOneJobFailure(error));
//   }
// }

// function* getOneJobWatcher() {
//   // @ts-expect-error TS(2769): No overload matches this call.
//   yield* takeLatest(ActionTypes.GET_ONE_JOB_REQUEST, getOneJobWorker);
// }

// function* getClientJobsWorker(action: { clientId: any }) {
//   try {
//     const { jobs } = yield* call(jobSvc.getClientJobs, action.clientId);

//     yield* put(getClientJobsSuccess(serializeResponse(jobs)));
//   } catch (error) {
//     yield* put(getClientJobsFailure(error));
//   }
// }

// function* getClientJobsWatcher() {
//   // @ts-expect-error TS(2769): No overload matches this call.
//   yield* takeLatest(ActionTypes.GET_CLIENT_JOBS_REQUEST, getClientJobsWorker);
// }

// function* createClientJobWorker(action: { payload: any }) {
//   try {
//     const job = yield* call(jobSvc.createJob, action.payload);

//     yield* put(
//       sendNotificationRequest({
//         message: "Successfully created Job.",
//         type: "success",
//       })
//     );
//     yield* put(createClientJobSuccess(job));

//     yield* put(getOneTermRequest(ENTITIES.jobs, job.id));

//     yield* put(getOneTaxRequest(ENTITIES.jobs, job.id));

//     yield* put(getOneMarkupRequest(ENTITIES.jobs, job.id));

//     yield* put(getOneDeliveryRequest(ENTITIES.jobs, job.id));

//     yield* put(getOneCabinetRequest(ENTITIES.jobs, job.id));
//   } catch (error) {
//     yield* put(
//       sendNotificationRequest({
//         message: "Error creating Client Job.",
//         type: "error",
//       })
//     );
//     yield* put(createClientJobFailure(error));
//   }
// }

// function* createClientJobWatcher() {
//   yield* takeLatest(
//     // @ts-expect-error TS(2769): No overload matches this call.
//     ActionTypes.CREATE_CLIENT_JOB_REQUEST,
//     createClientJobWorker
//   );
// }

// export {
//   getJobsWatcher,
//   getOneJobWatcher,
//   getClientJobsWatcher,
//   createClientJobWatcher,
// };
