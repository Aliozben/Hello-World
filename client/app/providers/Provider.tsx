import React from "react";

import {Routes} from "../stacks/Routes";
import AuthProvider from "./AuthProvider";

interface Props {}

export const Provider = (props: Props) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
