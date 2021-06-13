import React from "react";

import { NumberOfPosts } from "./components/number_of_posts/component";
import { Dates } from "./components/dates/component";
import { Price } from "./components/price/component";
import { SelectGroup } from "./components/select_group/feature";
import { css } from "@emotion/css";
import { useStore } from "effector-react";
import { $groupsSettings } from "../../models/group_settings/model";

const styles = css`
  display: flex;
  flex-direction: column;
  max-width: 250px;
`;

export const GroupSettings = () => {
  const groupsSettings = useStore($groupsSettings);

  return (
    <>
      {groupsSettings.map((groupSettings) => (
        <div className={styles} key={groupSettings.id}>
          <SelectGroup id={groupSettings.id} />
          <Dates id={groupSettings.id} />
          <Price id={groupSettings.id} />
          <NumberOfPosts id={groupSettings.id} />
        </div>
      ))}
    </>
  );
};
