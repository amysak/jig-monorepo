import { debounce } from "lodash-es";
// import { FC, useEffect, useMemo, useState } from "react";

// import {
//   Col,
//   Form,
//   FormItem,
//   Input,
//   InputTextArea,
//   Paragraph,
//   Row,
//   Select,
//   Text,
//   Title,
//   useForm,
// } from "@jigbid/ui";
// import { Terms } from "type-defs";
// import { TERM_TYPES } from "utilities/constants";
// import { IFetchResponse } from "utilities/types";
// import { JobsState } from "../model/types";
// import { TermsPayment } from "./job-info/components";

// import "./TermForm.styles.scss";

// const subForms = TERM_TYPES.reduce((forms, label) => {
//   forms[label] = TermsPayment;
//   return forms;
// }, {});

// interface TermFormProps extends Pick<JobsState, "job" | "jobs"> {
//   fetchTerms: (clientId: string) => void;
//   fetchClientTerm: (clientId: string) => void;
//   defaultTermByClientTermId: Terms;
//   clientTermForm: IFetchResponse<undefined>;
// }

// export const TermForm: FC<TermFormProps> = ({
//   job,
//   fetchTerms,
//   fetchClientTerm,
//   defaultTermByClientTermId,
// }) => {
//   const [form] = useForm();

//   const params = useParams<{ id?: string }>();

//   const [_termData, setTermData] = useState(null);

//   const onValuesChange = debounce(
//     async (value: { is_default: boolean; status: any }, values) => {
//       try {
//         if (!job.data)
//           // return createTerm({ ...value, client: params.id })

//           setTermData({ ...job.data, ...values });
//         // await updateTerm({ termId: job.data.id, payload: values })
//         fetchClientTerm(params.id);
//       } catch (error) {
//         setTermData(null);
//       } finally {
//         setTermData(null);
//       }
//     },
//     1000
//   );

//   useEffect(() => {
//     form.resetFields();
//   }, [job]);

//   useEffect(() => {
//     fetchTerms(params.id);
//   }, []);

//   useEffect(() => {
//     defaultTermByClientTermId?.type &&
//       form.setFieldValue("type", defaultTermByClientTermId.type);
//   }, [defaultTermByClientTermId?.type, form]);

//   const isTermSelectorLoading = useMemo(() => job.isLoading, [job.isLoading]);

//   const termType = useMemo(
//     () => defaultTermByClientTermId?.type || TERM_TYPES[0],
//     [defaultTermByClientTermId?.type]
//   );

//   const SubForm = useMemo(() => subForms[termType?.toLowerCase()], [termType]);
//   // const options = useMemo(
//   //     () =>
//   //         jobs?.data?.[0]?.map((term) => (
//   //             <Option value={job.id} key={job.id}>
//   //                 {job.name}
//   //             </Option>
//   //         )),
//   //     [jobs?.data]
//   // )

//   return (
//     <Form
//       form={form}
//       initialValues={_termData || job.data}
//       onValuesChange={onValuesChange}
//       layout="vertical"
//     >
//       <Row justify="space-between" gutter={{ xs: 0, xl: 22 }}>
//         <Col span={24} xl={12}>
//           <Title level={3}>Terms</Title>
//           <Row>
//             <Col xs={24}>
//               <FormItem
//                 name={["name"]}
//                 label="Select default terms for this client (do not leave blank)"
//               >
//                 <Select loading={isTermSelectorLoading}>
//                   {/* {options} */}
//                 </Select>
//               </FormItem>
//             </Col>

//             <Col xs={24}>
//               <FormItem label="Term Choice" name={["term_type"]}>
//                 <Input disabled />
//               </FormItem>
//             </Col>

//             <Col xs={24}>
//               <FormItem
//                 name={["term_read"]}
//                 label="The Terms for Estimates and Proposals will read as follows:"
//               >
//                 <InputTextArea rows={2} />
//               </FormItem>
//             </Col>
//           </Row>

//           <Title level={3}>Optional</Title>
//           <Text>
//             You may customize the text for these Terms by entering into the
//             following field:{" "}
//           </Text>
//           <Paragraph type="danger" style={{ fontStyle: "italic" }}>
//             *IMPORTANT!You must still enter the discount percentages (when
//             applicable) for calculation purposes.
//           </Paragraph>

//           <FormItem shouldUpdate name={["customised_text"]}>
//             <InputTextArea className="client-text-area" rows={2} />
//           </FormItem>
//         </Col>

//         <Col xs={24} xl={12} className="client-sub-form">
//           <FormItem shouldUpdate>
//             {() => (SubForm ? <SubForm /> : null)}
//           </FormItem>
//         </Col>
//       </Row>
//     </Form>
//   );
// };
