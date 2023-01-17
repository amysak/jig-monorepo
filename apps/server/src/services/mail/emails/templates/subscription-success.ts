// import * as mjml2html from 'mjml';
// import { options } from '../options';
// import { logo } from '../assets/image-links';
import { Account } from "database/entities";

// export const subscriptionSuccessEmailTemplate = (account: Account, subscription: any) => mjml2html(`
//   <mjml>
//     <mj-body>
//       <mj-section>
//         <mj-column>
//           <mj-image width="50px" src="${logo}"></mj-image>

//           <mj-text font-size="18px" color="rgba(0, 0, 0, 0.85)">
//             Here is your invoice
//           </mj-text>

//           <mj-text font-size="14px" color="rgba(0, 0, 0, 0.65)">
//             Hey ${account.name},
//           </mj-text>

//           <mj-text font-size="14px" color="rgba(0, 0, 0, 0.65)">
//             Thank you for your payment. Your invoice is attached. If you habve questions about this
//             payment or your subscription at any time

//             <a href="#">contact us</a>
//           </mj-text>

//           <mj-text font-size="14px" color="rgba(0, 0, 0, 0.65)">
//             Invoice amount
//           </mj-text>

//           <mj-text font-weight="bold" font-size="14px" color="rgba(0, 0, 0, 0.65)">
//             $${(subscription.plan.amount * 0.1)}
//           </mj-text>mj-text>

//           <mj-spacer></mj-spacer>

//           <mj-text font-size="14px" color="rgba(0, 0, 0, 0.65)">
//           Status
//           </mj-text>

//           <mj-text font-weight="bold" font-size="14px" color="rgba(0, 0, 0, 0.65)">
//             ${subscription.plan.nickname}
//           </mj-text>

//            <mj-spacer></mj-spacer>

//           <mj-text font-size="14px" color="rgba(0, 0, 0, 0.65)">
//             View your subscription details, update payment method and retrieve invoices
//             <a href="jigbid.com/signin">Sign in.</a>
//           </mj-text>

//         </mj-column>
//       </mj-section>
//     </mj-body>
//   </mjml>
// `, options);
