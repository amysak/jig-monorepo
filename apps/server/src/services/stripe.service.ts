import { Injectable } from '@nestjs/common';
// import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  // private stripe: Stripe;

  constructor() {
    // this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
    //   apiVersion: '2022-11-15',
    // });
  }
}
