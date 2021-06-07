import React from "react";

import { useStart, withStart } from "lib/page-routing";
import * as model from "./model";
import { Posts } from "../../features/posts";

export const HomePage = withStart(model.pageLoaded, () => {
  useStart(model.pageLoaded);

  return (
    <section>
      <Posts />
    </section>
  );
});
