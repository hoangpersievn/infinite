import { Form, Input, Checkbox, Button } from "antd";
import Link from "next/link";
import Image from "next/image";
import { IntlMessages } from "@/components/Atoms/IntIMessages";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import {
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
// import CircularProgress from "@/components/Atoms/CircularProgress";

import { AUTH_TYPE } from '@/constants/type';

import Logo from "@/public/images/logo.png";

export declare type TCredentials = {
  username: string;
  password: string;
};

export declare interface IAuth {
  type: AUTH_TYPE.SIGN_IN | AUTH_TYPE.SIGN_UP;
  isLoading: boolean;
  dispatch?: ({
    type,
    value,
  }: {
    type: string;
    value: TCredentials;
  }) => void;
};

export function Auth({
  type = AUTH_TYPE.SIGN_IN,
  isLoading = false,
  dispatch,
}: IAuth) {
  const onFinish = (values: TCredentials) => {
    dispatch?.({ type: "ON_FINISH", value: values });
  };

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<Record<string, string>>
  ) => {
    dispatch?.({
      type: "ON_FAILED",
      value: errorInfo as unknown as TCredentials,
    });
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <Image
                src="https://via.placeholder.com/272x395"
                width={272}
                height={395}
                alt="Neature"
              />
            </div>
            <div className="gx-app-logo-wid">
              <h1>
                <IntlMessages
                  id={`app.userAuth.${
                    type === AUTH_TYPE.SIGN_IN ? "signIn" : "signUp"
                  }`}
                />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.bySigning" />
              </p>
              <p>
                <IntlMessages id="app.userAuth.getAccount" />
              </p>
            </div>
            <div className="gx-app-logo">
              <Image alt="example" width="80" height="80" src={Logo} />
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0"
            >
              <Form.Item
                initialValue="hoangpersievn"
                rules={[
                  { required: true, message: "Please input your username" },
                ]}
                name="username"
              >
                <Input placeholder="username" />
              </Form.Item>
              <Form.Item
                initialValue="demo#123"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                name="password"
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Checkbox>
                  <IntlMessages id="appModule.iAccept" />
                </Checkbox>
                <span className="gx-signup-form-forgot gx-link">
                  <IntlMessages id="appModule.termAndCondition" />
                </span>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="gx-mb-0"
                  htmlType="submit"
                  loading={isLoading}
                >
                  <IntlMessages
                    id={`app.userAuth.${
                      type === AUTH_TYPE.SIGN_IN ? "signIn" : "signUp"
                    }`}
                  />
                </Button>
                <span>
                  <IntlMessages id="app.userAuth.or" />
                </span>{" "}
                <Link
                  href={
                    type === AUTH_TYPE.SIGN_IN ? "/auth/signup" : "/auth/signin"
                  }
                >
                  <IntlMessages
                    id={`app.userAuth.${
                      type === AUTH_TYPE.SIGN_IN ? "signUp" : "signIn"
                    }`}
                  />
                </Link>
              </Form.Item>

              <div className="gx-flex-row gx-justify-content-between">
                <span>or connect with</span>
                <ul className="gx-social-link">
                  {socials.map((el) => {
                    return (
                      <li key={el.key as string}>
                        {
                          el.render({
                            onClick: () => console.log("type", el.key),
                          }) as unknown as JSX.Element
                        }
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Form>
          </div>
{/* 
          {isLoading ? (
            <div className="gx-isLoading-view">
              <CircularProgress />
            </div>
          ) : null}
          {showMessage ? message.error(alertMessage.toString()) : null} */}
        </div>
      </div>
    </div>
  );
}

// --

// const showMessage = false;

// const alertMessage = "";
// const message = {
//   error: (content: string) => content as string,
// };

const socials: {
  key: string;
  render: (rest?: Record<string, unknown>) => JSX.Element;
}[] = [
  {
    key: "GOOGLE",
    render: (rest) => <GoogleOutlined {...rest} />,
  },
  {
    key: "FACEBOOK",
    render: (rest) => <FacebookOutlined {...rest} />,
  },
  {
    key: "GITHUB",
    render: (rest) => <GithubOutlined {...rest} />,
  },
  {
    key: "TWITTER",
    render: (rest) => <TwitterOutlined {...rest} />,
  },
];
