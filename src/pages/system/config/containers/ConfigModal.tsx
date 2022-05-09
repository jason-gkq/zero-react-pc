import React from "react";
import { connect } from "react-redux";

import ConfigModal from "../components/ConfigModal";
import { dict } from "@/common/store";
import { useSelectEnum } from "@/common/hooks";

export default connect(
  (state) => {
    const { dictData } = dict.selectors.getState(state);
    return {
      dictYesNo: useSelectEnum(
        dictData["sys_yes_no"],
        "dictValue",
        "dictLabel"
      ),
    };
  },
  (dispatch) => {
    return {
      getDictData() {
        dispatch(dict.actions.getDictData(["sys_yes_no"]));
      },
    };
  }
)(ConfigModal);
