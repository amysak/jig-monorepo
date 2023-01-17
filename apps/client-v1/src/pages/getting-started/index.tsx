import { SyncOutlined } from "@ant-design/icons";
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
import { isEmpty } from "lodash";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import EnterCard from '../../components/molecules/billing/EnterCard'
import FallbackUI from "../../components/organisms/fallbackui";
import AuthLayout from "../../components/templates/authLayout";
import { AccountContext } from "../../store/account";
import { AuthContext } from "../../store/auth";

import "./style.scss";

// const stripePromise = loadStripe(process.env.STRIPE_PK)

export default function GettingStarted() {
  const navigate = useNavigate();
  const accountCtx = useContext(AccountContext);
  const authCtx = useContext(AuthContext);

  // const stripeCustomerId = useMemo(
  //     () => accountCtx.account?.stripe_customer_id,
  //     [accountCtx.account.stripe.customerId]
  // )

  const stripeCustomerId = null;

  useEffect(() => {
    if (authCtx.loaded && accountCtx.account.hasCard) {
      navigate("/", { replace: true });
    }
  }, [accountCtx.account.hasCard, authCtx.loaded, navigate]);

  useEffect(() => {
    if (!accountCtx.loading && isEmpty(accountCtx.account)) {
      accountCtx.getAccount();
    }
  }, [accountCtx]);

  return <div>Getting Started</div>;
  // <AuthLayout useTitle={false} contenStyle={{ width: '550px' }}>
  // {
  /* {!stripeCustomerId ? ( */
  // }
  // <FallbackUI
  //     info="Setting up your build tools."
  //     Icon={SyncOutlined}
  // />
  // ) : (
  //     <></>
  // <Elements stripe={stripePromise}>
  //     <EnterCard />
  // </Elements>
  // )}
  // </AuthLayout>
  // )
}
