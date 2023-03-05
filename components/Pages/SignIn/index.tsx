import { Auth, TCredentials } from '@/components/Templates/Auth';
import { AUTH_TYPE } from '@/constants/type';
import { createSignInService } from "@/modules/SignIn/SignInProvider";

export function SignIn() {
  const {data, isLoading, mutate } = createSignInService().useSignIn();

  const onDispatch = async ({ value }: { value: TCredentials }) => {
    const credentials = {
      username: value.username,
      password: value.password,
    };

    await mutate(credentials as any);
  };

  return <Auth type={AUTH_TYPE.SIGN_IN} dispatch={onDispatch} isLoading={isLoading} />;
}
