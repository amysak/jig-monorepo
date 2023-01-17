import { TGetClientJobsData } from 'api/jobs'
import { Job } from 'entities'
import { IFetchResponse } from 'utilities/types'

export const JOBS_SLICE_NAME = 'JOBS_SLICE_NAME'

export interface JobsState {
    job: IFetchResponse<Job>
    jobs: IFetchResponse<TGetClientJobsData>
}
