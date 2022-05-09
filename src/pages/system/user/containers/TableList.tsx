import React from "react";
import { connect } from "react-redux";

import TableList from "../components/TableList";
import { dict } from "@/common/store";
import { useSelectEnum } from "@/common/hooks";

export default connect(
  (state) => {
    const { dictData } = dict.selectors.getState(state);
    return {
      dictNormalDisable: useSelectEnum(
        dictData["sys_normal_disable"],
        "dictValue",
        "dictLabel"
      ),
      dictUserSex: useSelectEnum(
        dictData["sys_user_sex"],
        "dictValue",
        "dictLabel"
      ),
    };
  },
  (dispatch) => {
    return {
      getEnumData() {
        dispatch(
          dict.actions.getDictData(["sys_normal_disable", "sys_user_sex"])
        );
      },
    };
  }
)(TableList);
