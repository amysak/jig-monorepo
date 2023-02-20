import { client } from "../http";

import { User, UserStats } from "type-defs";

// TODO: Can be typed generically
export const getUserStats = (
  query: Record<string, unknown>
): Promise<UserStats> => {
  return client.get(`users/stats?${client.getQueryString(query)}`);
};

export const getCompany = (): Promise<User> => {
  return client.get("/users");
};

export const retryPayment = (payload: {
  customerId: string;
  paymentMethodId: string;
  invoiceId: string;
}): Promise<any> => {
  return client.post("/users/payment/retry", payload);
};

export interface IGetAllSubscriptions {
  id: string;
  unit_amount: number;
  currency: string;
  interval: any;
}

export const getAllSubscriptions = (): Promise<IGetAllSubscriptions[]> => {
  return client.get("/users/subscriptions");
};

export interface CreateSubscriptionDto {
  paymentMethodId: string;
  customerId: string;
  priceId: string;
}

export const createSubscription = (
  payload: CreateSubscriptionDto
): Promise<User> => {
  return client.post("/users/subscriptions", payload);
};

export const createTrialSubscription = (
  payload: CreateSubscriptionDto
): Promise<User> => {
  return client.post("/users/subscriptions/trial", payload);
};

export const cancelSubscription = (subscriptionId: string): Promise<any> => {
  return client.update(`/users/subscriptions/${subscriptionId}/cancel`);
};

export const getCustomer = (): Promise<any> => {
  return client.get("/users/customer");
};

export const getSubscriptionCard = (): Promise<any> => {
  return client.get("/users/subscriptions/card");
};

export const updateSubscription = (): Promise<any> => {
  return client.update("/users/subscriptions");
};

export const uploadAccountImage = (payload: FormData): Promise<any> => {
  return client.post("/users/uploadlogo", payload);
};

export const getPlans = (): Promise<any> => {
  return client.get("/users/subscriptions/plans");
};
