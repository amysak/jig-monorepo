import { useMutation, useQueryClient } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { signIn } from "api/authentication";
import {
  Alert,
  Button,
  ErrorList,
  Form,
  FormItem,
  Input,
  InputPassword,
  Row,
} from "@jigbid/ui";
import AuthLayout from "components/templates/authLayout";

import { apiV2 } from "api/Api";
import { refreshTokenStorage, tokenStorage } from "utilities/token-storage";
import "./signin.scss";

const formLayout = {
  wrapperCol: { span: 24 },
};

function ForgotYourPasswordLink() {
  return <Link to="/password-reset">Forgot your password?</Link>;
}

function SigninPage() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: { email: "", password: "" },
    shouldFocusError: false,
    shouldUseNativeValidation: false,
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const onSubmit = useMutation(signIn, {
    onSettled: () => {
      // TODO encapsulate invalidate logic & create a CONST for each query key
      queryClient.invalidateQueries(["account", "me"]);
    },
    onSuccess: ({ accessToken, refreshToken }) => {
      apiV2.setAuthorizationToken(accessToken);

      tokenStorage.set(accessToken);
      refreshTokenStorage.set(refreshToken);

      navigate("/dashboard");
      // This needs to be done to somehow reset the cache for a user and make them sign in again to avoid getting to sign in page
      //  queryClient.invalidateQueries('todos')
    },
  });

  return (
    <AuthLayout>
      <Form
        onFinish={handleSubmit(() => onSubmit.mutate(getValues()))}
        name="signinform"
        {...formLayout}
        layout="vertical"
        className="authlayout__centerCol-signinform"
      >
        {!isEmpty(errors) && (
          <Alert
            message="Incorrect email/password. Try again."
            type="error"
            showIcon
            banner
          />
        )}

        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid Email",
            },
          }}
          render={({ field: { value, onChange, onBlur, ...rest } }) => {
            const handler = (e) => {
              if (!(e.target.value.length >= 100)) onChange(e);
            };
            return (
              <FormItem label="Email" name="Email">
                <Input
                  size="middle"
                  placeholder="Email"
                  onChange={handler}
                  onBlur={onBlur}
                  value={value}
                  {...rest}
                  status={!isEmpty(errors?.email) ? "error" : undefined}
                />
              </FormItem>
            );
          }}
        />

        <ErrorList
          errors={[
            errors?.email?.type === "required" && (
              <p key="required">Enter an email</p>
            ),
            errors?.email?.type === "pattern" && (
              <p key="pattern">{errors?.email?.message}</p>
            ),
          ]}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 6,
              message: "Password is too short",
            },
            pattern: {
              value: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
              message:
                "Must contain atleast one capital, lowercase letters and a number",
            },
          }}
          render={({ field: { value, onChange, onBlur, ...rest } }) => {
            const handler = (e) => {
              if (!(e.target.value.length >= 32)) onChange(e);
            };
            return (
              <FormItem name="Password" label="Password">
                <InputPassword
                  visibilityToggle
                  size="middle"
                  placeholder="Password"
                  onChange={handler}
                  onBlur={onBlur}
                  value={value}
                  {...rest}
                  status={
                    errors?.password?.type === "required" ? "error" : undefined
                  }
                />
              </FormItem>
            );
          }}
        />

        <ErrorList
          errors={[
            errors?.password?.type === "pattern" && (
              <p>{errors?.password?.message}</p>
            ),
            errors?.password?.type === "minLength" && (
              <p>{errors?.password?.message}</p>
            ),
          ]}
        />

        <ForgotYourPasswordLink />

        <br />
        <br />

        {/* @ts-expect-error TS(2322): Type '"end"' is not assignable to type '"top" | "m... Remove this comment to see the full error message */}
        <Row align="end">
          <Button
            className="jig-button"
            htmlType="submit"
            size="small"
            loading={onSubmit.isLoading}
          >
            Sign in
          </Button>
        </Row>

        <Row justify="end" style={{ marginTop: "30px" }}>
          <span>{"Don't have an account?"}</span>{" "}
          <Link to="/signup">&nbsp; Sign up</Link>
        </Row>
      </Form>
    </AuthLayout>
  );
}

export default SigninPage;
