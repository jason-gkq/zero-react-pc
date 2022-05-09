import React from "react";
import { connect } from "react-redux";

import UserInfo from "../components/UserInfo";
import { dict } from "@/common/store";
import { useSelectEnum } from "@/common/hooks";

export default connect(
  (state) => {
    const { dictData } = dict.selectors.getState(state);
    return {
      dictUserSex: useSelectEnum(
        dictData["sys_user_sex"],
        "dictValue",
        "dictLabel"
      ),
    };
  },
  (dispatch) => {
    return {
      getDictData() {
        dispatch(dict.actions.getDictData(["sys_user_sex"]));
      },
    };
  }
)(UserInfo);
