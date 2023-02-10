import { FormInput, FormPasswordInput } from "@jigbid/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button, Form, message, Row } from "antd";
import { isEmpty } from "lodash-es";

import { AuthLayout } from "layouts/auth";
import { api } from "lib/api";

import "./signin.scss";

const formLayout = {
  wrapperCol: { span: 24 },
};

// TODO:
// function ForgotYourPasswordLink() {
//   return <Link to="/password-reset">Forgot your password?</Link>;
// }

function SigninPage() {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: logIn, isLoading } = useMutation(api.auth.signIn, {
    onSettled: () => {
      queryClient.invalidateQueries(["account", "me"]);
    },
    onSuccess: ({ accessToken, refreshToken }) => {
      // client.setAuthorizationToken(accessToken);

      // tokenStorage.set(accessToken);
      // refreshTokenStorage.set(refreshToken);

      navigate({ to: "/dashboard", replace: true });
    },
    onError: () => {
      message.error("Incorrect email/password. Try again.");
    },
  });

  return (
    <AuthLayout>
      <Form
        form={form}
        onFinish={(values) => logIn(values)}
        name="signinform"
        {...formLayout}
        layout="vertical"
        className="authlayout__centerCol-signinform"
      >
        <FormInput
          name="email"
          label="Email"
          input={{
            size: "middle",
            placeholder: "Email",
            type: "email",
            status: !isEmpty(form.getFieldError("email")) ? "error" : undefined,
          }}
          rules={[
            {
              required: true,
            },
            {
              pattern: /\S+@\S+\.\S+/,
              message: "Please enter a valid e-mail.",
            },
          ]}
        />

        <FormPasswordInput
          name="password"
          label="Password"
          input={{
            visibilityToggle: true,
            size: "middle",
            placeholder: "Password",
            status: !isEmpty(form.getFieldError("password"))
              ? "error"
              : undefined,
          }}
          rules={[
            {
              required: true,
            },
            {
              pattern: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
              message:
                "Must contain atleast one capital, lowercase letters and a number",
            },
            {
              min: 6,
              message: "Password must be at least 6 symbols long",
            },
          ]}
        />

        {/* <ForgotYourPasswordLink /> */}

        <br />
        <br />

        <Row justify="end">
          <Button
            className="jig-button"
            htmlType="submit"
            size="small"
            loading={isLoading}
          >
            Sign in
          </Button>
        </Row>

        <Row justify="end" style={{ marginTop: "30px" }}>
          <span>{"Don't have an account?"}</span>
          {/* TODO */}
          {/* <Link to="/signup">&nbsp; Sign up</Link> */}
        </Row>
      </Form>
    </AuthLayout>
  );
}

export default SigninPage;
