import React from "react";
import { connect } from "react-redux";

import MenuModal from "../components/MenuModal";
import { dict } from "@/common/store";
import { useSelectEnum } from "@/common/hooks";

export default connect(
  (state) => {
    const { dictData } = dict.selectors.getState(state);
    return {
      dictShowHide: useSelectEnum(
        dictData["sys_show_hide"],
        "dictValue",
        "dictLabel"
      ),
    };
  },
  (dispatch) => {
    return {
      getDictData() {
        dispatch(dict.actions.getDictData(["sys_show_hide"]));
      },
    };
  }
)(MenuModal);
