import React from "react";
import * as styles from "../index.less";

import china from "@/assets/img/logo.svg";
import logo from "@/assets/img/logo.jpg";

export default (props) => {
  const { addVoucher, goTo, goBack, pageStatus } = props;
  return (
    <div>
      <div className={styles.testContainer}>
        <div onClick={addVoucher} className={styles.containerDiv}>
          我是一个homedfdfsdsd
          {/* <img src='/public/assets/img/china.svg' />
          <img src='/public/assets/img/logo.jpg' /> */}
          <img src={china} />
          <img src={logo} />
        </div>
        <div onClick={goTo} className={styles.containerDiv}>
          我是一个很多字div---{pageStatus}
        </div>
        <div onClick={goBack} className={styles.containerDiv}>
          我是一个更多字而且第三个div
        </div>
      </div>
    </div>
  );
};
