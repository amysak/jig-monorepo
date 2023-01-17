import {
  Form as AntForm,
  FormItemProps as AntFormItemProps,
  FormProps as AntFormProps,
} from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { isNil } from "lodash-es";
import { FC, useMemo } from "react";

import { ErrorListProps as AntErrorListProps } from "antd/lib/form/ErrorList";

import "./Form.style.scss";

const { Item: AntItem, ErrorList: AntErrorList, useForm: AntUseForm } = AntForm;

type FormProps = AntFormProps & { children?: React.ReactNode };

export const Form: FC<FormProps> = ({ children, ...props }) => {
  return <AntForm {...props}>{children}</AntForm>;
};

type FormItemProps = AntFormItemProps;

export const FormItem: FC<FormItemProps> = (props) => {
  return <AntItem {...props} />;
};

type ErrorListProps = AntErrorListProps;

export const ErrorList: FC<ErrorListProps> = ({ className, ...props }) => {
  const cn = `custom-errorList ${className}`;
  const { errors } = props;
  const _errors = errors?.filter((e) => !(e === false));

  const isNoErrors = useMemo(
    () => isNil(_errors) || _errors?.length === 0,
    [_errors]
  );

  return (
    <motion.div>
      <AnimatePresence mode="wait">
        {!isNoErrors && (
          <motion.section
            transition={{
              duration: 0.7,
            }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AntErrorList {...props} className={cn} errors={_errors} />
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
/* #endregion */

/* #region  useForm */
export const useForm = AntUseForm;
/* #endregion */
