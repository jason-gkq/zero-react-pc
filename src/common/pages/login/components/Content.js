import React from "react";
import { Text, Flex } from "@/common/components";
import backBlack from "@/assets/img/back-black.svg";

const styles = {
  backgroundColor: "blue",
  headerIcon: {
    width: 17,
    height: 17,
    display: "block",
  },
};

const tabs2 = [
  { title: "First Tab", sub: "1" },
  { title: "Second Tab", sub: "2" },
  { title: "Third Tab", sub: "3" },
];

export default (props) => {
  const { onLoginAction, mobile } = props;
  return (
    <div className='psl-page-content'>
      <Text>Text</Text>

      <div className='psl-tel-wrap clearfix fix-content'>
        <input
          className='psl-tel'
          type='tel'
          placeholder='请输入手机号'
          value={mobile}
        />
      </div>
      <button className='login-btn' onClick={onLoginAction}>
        登录
      </button>
    </div>
  );
};
