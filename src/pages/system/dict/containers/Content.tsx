import React from "react";
import { connect } from "react-redux";

import Content from "../components/Content";
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
    };
  },
  (dispatch) => {
    return {
      getDictData() {
        dispatch(dict.actions.getDictData(["sys_normal_disable"]));
      },
    };
  }
)(Content);
