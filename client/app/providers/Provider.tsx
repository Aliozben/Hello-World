import React from "react";

import {Routes} from "../stacks/Routes";
import AuthProvider from "./AuthProvider";
import ToastProvider from "./ToastProvider";
interface Props {}

export const Provider = (props: Props) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </AuthProvider>
  );
};
