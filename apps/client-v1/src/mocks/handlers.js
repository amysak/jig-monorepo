import { getClients } from 'features/DashboardLine/mock'
import dayjs from 'dayjs'
import { rest } from 'msw'
import { parse } from 'query-string'
import envs from 'utilities/envs'

const prepareUrl = (path) => new URL(path, envs.API_BASE_URL).toString()

export const handlers = [
    rest.get(`${prepareUrl('/clients__/stats')}`, async (req, res, ctx) => {
        const { date, range } = parse(req.url.search)
        return res(
            ctx.delay(1500),
            ctx.json(getClients(dayjs.unix(date), range, 'client'))
        )
    }),
    rest.get(`${prepareUrl('/jobs__/stats')}`, (req, res, ctx) => {
        const { date, range } = parse(req.url.search)
        return res(
            ctx.delay(1500),
            ctx.json(getClients(dayjs.unix(date), range, 'job'))
        )
    }),
    rest.get(`${prepareUrl('/revenue__/stats')}`, (req, res, ctx) => {
        const { date, range } = parse(req.url.search)
        return res(
            ctx.delay(1500),
            ctx.json(getClients(dayjs.unix(date), range, 'revenue'))
        )
    }),
]
