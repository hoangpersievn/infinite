import React from "react";
import { FormattedMessage } from "react-intl";

// --

export declare interface IInjectMassage {
  [key: string]: unknown;
}

// --

export function IntlMessages(props: IInjectMassage) {
  return <FormattedMessage {...props} />;
}
