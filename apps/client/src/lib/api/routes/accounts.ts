import { client } from "../http";

import { LocationGenerics } from "router";
import { Account, AccountStats } from "type-defs";

// TODO: Can be typed generically
export const getAccountStats = (
  query: LocationGenerics["Search"]
): Promise<AccountStats> => {
  return client.get(`accounts/stats?${client.getQueryString(query)}`);
};

export const getCompany = (): Promise<Account> => {
  return client.get("/accounts");
};

// export interface IUpdateAccountDTO {
//   name?: string;
//   email?: string;
//   trial?: boolean;
//   subscription?: IAccountSubscription;
//   stripe_customer_id?: string;
// }

// export const  updateAccount = (payload: IUpdateAccountDTO): Promise<Account> => {
//   return client.update("/accounts", payload);
// }

export const retryPayment = (payload: {
  customerId: string;
  paymentMethodId: string;
  invoiceId: string;
}): Promise<any> => {
  return client.post("/accounts/payment/retry", payload);
};

export interface IGetAllSubscriptions {
  id: string;
  unit_amount: number;
  currency: string;
  interval: any;
}

export const getAllSubscriptions = (): Promise<IGetAllSubscriptions[]> => {
  return client.get("/accounts/subscriptions");
};

export interface CreateSubscriptionDto {
  paymentMethodId: string;
  customerId: string;
  priceId: string;
}

export const createSubscription = (
  payload: CreateSubscriptionDto
): Promise<Account> => {
  return client.post("/accounts/subscriptions", payload);
};

export const createTrialSubscription = (
  payload: CreateSubscriptionDto
): Promise<Account> => {
  return client.post("/accounts/subscriptions/trial", payload);
};

export const cancelSubscription = (subscriptionId: string): Promise<any> => {
  return client.update(`/accounts/subscriptions/${subscriptionId}/cancel`);
};

export const getCustomer = (): Promise<any> => {
  return client.get("/accounts/customer");
};

export const getSubscriptionCard = (): Promise<any> => {
  return client.get("/accounts/subscriptions/card");
};

export const updateSubscription = (): Promise<any> => {
  return client.update("/accounts/subscriptions");
};

export const uploadAccountImage = (payload: FormData): Promise<any> => {
  return client.post("/accounts/uploadlogo", payload);
};

export const getPlans = (): Promise<any> => {
  return client.get("/accounts/subscriptions/plans");
};
