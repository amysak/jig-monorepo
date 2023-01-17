import { api, apiV2, AsyncResponse, ResponseDataWithCount } from "./Api";

import { Account, AccountStats, IAccountSubscription } from "entities";
import { Preference, User } from "entities";
import { Ranges, StatsType } from "features/DashboardLine/utils";

// TODO: Can be typed generically
async function getAccountStats(data: {
  type: StatsType;
  date: number;
  range: Ranges;
}): AsyncResponse<AccountStats<any>> {
  return apiV2.get(
    `accounts/stats/?type=${data.type}&date=${data.date}&range=${data.range}`
  );
}

async function getCompany(): AsyncResponse<Account> {
  return apiV2.get("/accounts");
}

export interface IUpdateAccountDTO {
  name?: string;
  email?: string;
  trial?: boolean;
  subscription?: IAccountSubscription;
  stripe_customer_id?: string;
}

async function updateAccount(
  payload: IUpdateAccountDTO
): AsyncResponse<Account> {
  return api.update("/accounts", payload);
}

export type TGetAccountUsersData = ResponseDataWithCount<User>;

async function getAccountUsers(): AsyncResponse<TGetAccountUsersData> {
  return api.get("/accounts/users");
}

async function getAccountPreference(): AsyncResponse<Preference> {
  // return api.get('/accounts/preferences')
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          hasCard: true,
        } as any),
      100
    )
  );
}

async function updateAccountPreference(
  payload: any
): AsyncResponse<Preference> {
  return api.update("/accounts/preferences", payload);
}

async function retryPayment(payload: {
  customerId: string;
  paymentMethodId: string;
  invoiceId: string;
}): AsyncResponse<any> {
  return api.post("/accounts/payment/retry", payload);
}

export interface IGetAllSubscriptions {
  id: string;
  unit_amount: number;
  currency: string;
  interval: any;
}

async function getAllSubscriptions(): AsyncResponse<IGetAllSubscriptions[]> {
  return api.get("/accounts/subscriptions");
}

export interface CreateSubscriptionDto {
  paymentMethodId: string;
  customerId: string;
  priceId: string;
}

async function createSubscription(
  payload: CreateSubscriptionDto
): AsyncResponse<Account> {
  return api.post("/accounts/subscriptions", payload);
}

async function createTrialSubscription(
  payload: CreateSubscriptionDto
): AsyncResponse<Account> {
  return api.post("/accounts/subscriptions/trial", payload);
}

async function cancelSubscription(subscriptionId: string): AsyncResponse<any> {
  return api.update(`/accounts/subscriptions/${subscriptionId}/cancel`);
}

async function getCustomer(): AsyncResponse<any> {
  return api.get("/accounts/customer");
}

async function getSubscriptionCard(): AsyncResponse<any> {
  return api.get("/accounts/subscriptions/card");
}

async function updateSubscription(): AsyncResponse<any> {
  return api.update("/accounts/subscriptions");
}

async function uploadAccountImage(payload: FormData): AsyncResponse<any> {
  return api.post("/accounts/uploadlogo", payload);
}

async function getPlans(): AsyncResponse<any> {
  return api.get("/accounts/subscriptions/plans");
}

export {
  getAccountStats,
  getPlans,
  getCompany,
  updateAccount,
  getAccountUsers,
  getAccountPreference,
  updateAccountPreference,
  retryPayment,
  getAllSubscriptions,
  createSubscription,
  createTrialSubscription,
  cancelSubscription,
  getCustomer,
  getSubscriptionCard,
  updateSubscription,
  uploadAccountImage,
};
