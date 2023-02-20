// import * as mjml2html from 'mjml';
import { User } from "database/entities";
// import { options } from '../options';
// import { logo } from '../assets/image-links';

// export const sendOTPEmailTemplate = (otp: string, user: User) =>
//   mjml2html(
//     `
//   <mjml>
//     <mj-body>
//       <mj-section>
//         <mj-column>

//           <mj-image width="50px" src="${logo}"></mj-image>

//           <mj-divider border-color="#611f69"></mj-divider>

//           <mj-text font-size="14px" color="rgba(0, 0, 0, 0.65)">
//             Hey ${user.first_name}, looks like you made an OTP code request. Please use the OTP code below to reset your password.
//           </mj-text>

//           <mj-text font-size="30px" align="center">
//             ${otp}
//           </mj-text>

//           <mj-text font-size="14px" color="rgba(0, 0, 0, 0.65)">
//             Thank you.
//           </mj-text>

//         </mj-column>
//       </mj-section>
//     </mj-body>
//   </mjml>
// `,
//     options
//   );
