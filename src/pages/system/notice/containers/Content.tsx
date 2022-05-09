import React from "react";
import { connect } from "react-redux";

import Content from "../components/Content";
import { dict } from "@/common/store";
import { useSelectEnum } from "@/common/hooks";

export default connect(
  (state) => {
    const { dictData } = dict.selectors.getState(state);
    return {
      dictNoticeStatus: useSelectEnum(
        dictData["sys_notice_status"],
        "dictValue",
        "dictLabel"
      ),
      dictNoticeType: useSelectEnum(
        dictData["sys_notice_type"],
        "dictValue",
        "dictLabel"
      ),
    };
  },
  (dispatch) => {
    return {
      getDictData() {
        dispatch(
          dict.actions.getDictData(["sys_notice_status", "sys_notice_type"])
        );
      },
    };
  }
)(Content);
