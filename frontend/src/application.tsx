import * as React from "react";

import { Scope } from "effector/fork";
import { Provider } from "effector-react/ssr";
import { Provider as ReakitProvider } from "reakit/Provider";

import { Pages } from "./pages";

interface Props {
  root: Scope;
}

export const Application: React.FC<Props> = ({ root }) => (
  <Provider value={root}>
    <ReakitProvider>
      <div>
        <Pages />
      </div>
    </ReakitProvider>
  </Provider>
);
