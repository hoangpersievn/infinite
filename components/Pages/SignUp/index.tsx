import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Auth } from '@/components/Templates/Auth';
import { AUTH_TYPE } from '@/constants/type';

export function SignUp() {
  const onFinish = (values: Record<string, string>) => {
    console.log("finish", values);
    // dispatch(showAuthLoader());
    // dispatch(userSignIn(values));
  };

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<Record<string, string>>
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onDispatch = ({ type, value }: { type: string; value: unknown }) => {
    console.log({ type, value });
  };

  return <Auth type={AUTH_TYPE.SIGN_UP} dispatch={onDispatch} isLoading={false} />;
}
