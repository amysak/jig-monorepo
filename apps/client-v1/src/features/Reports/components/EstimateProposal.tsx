import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { Checkbox, Radio, RadioChangeEvent } from "antd";
import { Button, Col, Form, FormItem, Popover, Row } from "@jigbid/ui";
import { useModal } from "hooks/useModal";
import { isNil, upperFirst } from "lodash";
import React, { FC, useCallback } from "react";
import {
  Control,
  Controller,
  useForm,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { useAppState } from "../../../store";
import { selectEPJobs } from "../model/selectors";

import {
  defaultValues,
  FormValues,
  FORM_FIELDS,
  FORM_FIELDS_VALUES,
  FORM_NAME,
  FORM_VALUES,
  itemListingOptions,
  ItemListingPresetNames,
  itemListingPresets,
} from "../utils";

import "./EstimateProposal.styles.scss";

const yourCompanyName = {
  display: "flex" as const,
  flexDirection: "column" as const,
  alignItems: "flex-start" as const,
  justifyContent: "flex-start" as const,
  border: "1px solid red",
};

const styles = StyleSheet.create({
  main: {
    height: 600,
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // fontFamily: 'SimSun, sans-serif',
  },
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    height: "100%",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: "15%",
    // maxHeight: '10%',
    // minHeight: '10%',
    border: "1px solid yellow",
  },
  yourCompanyName: { ...yourCompanyName },
  logo: { ...yourCompanyName, border: "1px solid green" },
  reportType: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  defaultFont: {
    fontSize: "10px",
    // fontFamily: 'SimSun, sans-serif',
  },
  boldFont: {
    fontWeight: "heavy",
  },
  h5: {
    fontSize: "16px",
    fontWeight: "heavy",
  },
  yourCompanyNameText: { fontSize: "12px" },
});

type DefaultTextProps = {
  bold?: boolean;
  style?: Record<any, any>;
  children: React.ReactNode;
};

const DefaultText: FC<DefaultTextProps> = ({
  children,
  bold = false,
  style = {},
}) => {
  let _styles = { ...styles.defaultFont, ...style };
  if (bold) _styles = { ..._styles, ...styles.boldFont };
  return <Text style={_styles}>{children}</Text>;
};

const P = ({ control }: { control: Control<FormValues> }) => {
  const reportType = useWatch<FormValues>({
    name: FORM_FIELDS.report_type,
    control,
  });

  const jobs = useAppState(selectEPJobs);

  return (
    <PDFViewer style={styles.main}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View style={styles.yourCompanyName}>
              <DefaultText bold style={styles.yourCompanyNameText}>
                YourCompany Name
              </DefaultText>
              <DefaultText>Your City, ST 00000</DefaultText>
              <DefaultText>Office: 111-111-1111</DefaultText>
              <DefaultText>Cell: 222-222-2222</DefaultText>
              <DefaultText>Fax: 444-444-4444</DefaultText>
              <DefaultText>E-Mail: you@yourdomain.com</DefaultText>
              <DefaultText>State License#: BR549</DefaultText>
            </View>
            <View style={styles.logo}>
              <DefaultText>Your logo here</DefaultText>
            </View>
            <View>
              {!isNil(reportType) && (
                <DefaultText>{upperFirst(reportType as string)}</DefaultText>
              )}
              <DefaultText>Job Name: Entertainment System</DefaultText>
              <DefaultText>Lot Number: {jobs.data?.lotNumber}</DefaultText>
              <DefaultText>Subdivision: {jobs.data?.subdivision}</DefaultText>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const IncludePriceRest = ({
  control,
  register,
}: {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
}) => {
  const output = useWatch<FormValues>({
    name: "include_prices",
    control,
  });

  return (
    <>
      {output === "true" && (
        <Controller
          {...register(FORM_FIELDS.include_prices_other)}
          control={control}
          shouldUnregister
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem label="Include Tax, Markups, Discounts">
                <Radio.Group
                  value={value}
                  onChange={({ target: { value } }) => onChange(value)}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            );
          }}
        />
      )}
    </>
  );
};

export default function EstimateProposal() {
  const { handleSubmit, control, register, setValue } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  const handlePresetChange = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      setValue("items_listing", itemListingPresets[value]);
    },
    [setValue]
  );

  const { showModal } = useModal();

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      className="estimate-proposal-form"
      name={FORM_NAME}
    >
      <Controller
        name={FORM_FIELDS.report_type}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <FormItem label="Select Report Type">
              <Radio.Group
                value={value}
                onChange={({ target: { value } }) => onChange(value)}
              >
                <Radio
                  value={FORM_FIELDS_VALUES[FORM_FIELDS.report_type].estimate}
                >
                  Estimate
                </Radio>
                <Radio
                  value={FORM_FIELDS_VALUES[FORM_FIELDS.report_type].proposal}
                >
                  Proposal
                </Radio>
              </Radio.Group>
            </FormItem>
          );
        }}
      />

      <Controller
        name={FORM_FIELDS.report_include}
        control={control}
        render={({ field }) => {
          return (
            <FormItem label="Select Report to Include" {...field}>
              <Checkbox>Job Information</Checkbox>
            </FormItem>
          );
        }}
      />

      <Row>
        <Col xs={12}>
          <Controller
            name={FORM_FIELDS.include_prices}
            control={control}
            render={({ field }) => {
              return (
                <FormItem label="Include Prices" {...field}>
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              );
            }}
          />
        </Col>

        <Col xs={12}>
          <IncludePriceRest control={control} register={register} />
        </Col>
      </Row>

      <Controller
        name={FORM_FIELDS.items_listing}
        control={control}
        render={({ field }) => {
          return (
            <FormItem label="Items Listing">
              <Row className="item-listing-preset">
                <Col xs={12}>
                  <Radio.Group onChange={handlePresetChange}>
                    <Radio.Button value={ItemListingPresetNames.All}>
                      Include All
                    </Radio.Button>
                    <Radio.Button value={ItemListingPresetNames.None}>
                      Include None
                    </Radio.Button>
                    <Radio.Button value={ItemListingPresetNames.Standard}>
                      Include Standard
                    </Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>

              <Checkbox.Group {...field}>
                <Row>
                  {itemListingOptions.map(({ label, value }) => (
                    <Col span={12} key={value}>
                      <Checkbox value={value}>{label}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </FormItem>
          );
        }}
      />

      <Controller
        name={FORM_FIELDS.selected_on_reports}
        control={control}
        render={({ field }) => {
          return (
            <FormItem {...field}>
              <Radio.Group>
                <Radio value="all">All</Radio>
                <Radio value="selected">Selected to Show on Reports</Radio>
              </Radio.Group>
            </FormItem>
          );
        }}
      />

      <Controller
        name={FORM_FIELDS.contact_terms_other}
        control={control}
        render={({ field }) => {
          return (
            <FormItem {...field}>
              <Checkbox>
                Contract Terms and Conditions, Estimate or Proposal Totals, and
                Payment Schedule.
              </Checkbox>
            </FormItem>
          );
        }}
      />

      <Controller
        name={FORM_FIELDS.include_second_copy}
        control={control}
        render={({ field }) => {
          return (
            <FormItem
              label="Include Second Copy for Customer/Builder?"
              {...field}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </FormItem>
          );
        }}
      />

      <Controller
        name={FORM_FIELDS.job_notes}
        control={control}
        render={({ field }) => {
          return (
            <Col xs={12} style={{ padding: 0 }}>
              <FormItem {...field}>
                <Checkbox>Job Notes</Checkbox>
              </FormItem>
            </Col>
          );
        }}
      />

      <Controller
        name={FORM_FIELDS.printing_options}
        control={control}
        render={({ field }) => {
          return (
            <FormItem label={FORM_VALUES.printing_options.label} {...field}>
              <Radio.Group>
                <Row>
                  {(FORM_VALUES.printing_options.value as Array<string>).map(
                    (value) => (
                      <Col xs={12} key={value}>
                        <Radio key={value} value={value}>
                          {upperFirst(value)}
                        </Radio>
                      </Col>
                    )
                  )}
                </Row>
              </Radio.Group>
            </FormItem>
          );
        }}
      />

      <Controller
        name={FORM_FIELDS.show_print_dialog}
        control={control}
        render={({ field }) => {
          return (
            <FormItem label="Show Print Dialog Box?" {...field}>
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </FormItem>
          );
        }}
      />

      <FormItem>
        <Popover
          content={
            <div style={{ width: 700, height: 600 }}>
              <P control={control} />
            </div>
          }
          trigger="click"
          placement="rightTop"
        >
          <Button onClick={showModal} className="jig-button">
            Print Reports
          </Button>
        </Popover>
      </FormItem>
    </Form>
  );
}

/**
 * 1. Sourcing research respondents
 *    Communities for each field
 *    Target audience sourcing (by age, schools)
 * 2. The platform should be primarily focused on the creator and less for the responder
 * 3. Auto suggest/improves questionnaire (grammar, ambiguity, scale choice/options, presentation)
 * 4. Incentives for responders
 *    Points as part of community service
 *    Result of the study
 * 5.
 */
