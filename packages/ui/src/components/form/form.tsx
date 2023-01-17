import { Form as AntForm, FormProps as AntFormProps } from "antd";
import { ErrorListProps } from "antd/es/form";
import { AnimatePresence, motion } from "framer-motion";
import { isNil } from "lodash-es";
import { FC, useMemo } from "react";

const { ErrorList: AntErrorList } = AntForm;

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
