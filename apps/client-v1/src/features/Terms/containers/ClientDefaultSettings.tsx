import React, { useCallback } from "react";

import { Card, Col, Row } from "@jigbid/ui";

import { Terms } from "entities";
import { useAppDispatch, useAppState } from "store/index";

import { MarkupForm, TaxForm, TermForm } from "../components";
import {
  selectClientTerm,
  selectClientTermForm,
  selectClientTerms,
  selectDefaultTermByClientTermId,
} from "../model/selectors";
import {
  createTerm as _createTerm,
  getClientTerm,
  getTerms,
  ICreateTerm,
  IUpdateTerm,
  updateTerm as _updateTerm,
} from "../model/thunk";

import "./ClientDefaultSettings.styles.scss";

export const ClientDefaultSettings = () => {
  const term = useAppState(selectClientTerm);
  const terms = useAppState(selectClientTerms);
  const defaultTermByClientTermId = useAppState(
    selectDefaultTermByClientTermId
  ) as unknown as Terms;
  const clientTermForm = useAppState(selectClientTermForm);

  const dispatch = useAppDispatch();

  const fetchTerms = useCallback(
    (clientId: string) => dispatch(getTerms(clientId)),
    [dispatch]
  );

  const fetchClientTerm = useCallback(
    (clientId: string) => dispatch(getClientTerm(clientId)),
    [dispatch]
  );

  const createTerm = useCallback(
    (params: ICreateTerm) => dispatch(_createTerm(params)),
    [dispatch]
  );

  const updateTerm = useCallback(
    (params: IUpdateTerm) => dispatch(_updateTerm(params)),
    [dispatch]
  );

  return (
    <Row gutter={[20, 20]} justify="space-between">
      <Col xs={24} lg={24}>
        <Card>
          <TermForm
            term={term}
            terms={terms}
            fetchTerms={fetchTerms}
            createTerm={createTerm}
            updateTerm={updateTerm}
            fetchClientTerm={fetchClientTerm}
            clientTermForm={clientTermForm}
            defaultTermByClientTermId={defaultTermByClientTermId}
          />
        </Card>
      </Col>

      <Col xs={24}>
        <Row gutter={[20, 20]} align="stretch">
          <Col xs={24} lg={12}>
            <Card>
              <MarkupForm />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="client-default-settings-tax-card">
              <TaxForm />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
