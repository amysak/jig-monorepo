import { Col } from 'antd';
import React, { useState } from 'react';
import SubscriptionForm from './SubscriptionForm';
import { TrialCard } from './TrialCard';

export default function TrialSubscriptionView() {
  const [subscribing, setSubscribing] = useState(false);

  return subscribing ?
    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
      <SubscriptionForm />
    </Col>
    : <TrialCard setSubscribing={setSubscribing} />;
}
