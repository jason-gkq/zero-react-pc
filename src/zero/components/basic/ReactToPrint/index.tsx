import React, { useCallback } from "react";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";

export default ({ title, componentRef }: any) => {
  const reactToPrintContent = useCallback(
    () => componentRef.current,
    [componentRef.current]
  );

  const reactToPrintTrigger = useCallback(() => <PrinterOutlined />, []);

  return (
    <ReactToPrint
      // pageStyle={""}
      content={reactToPrintContent}
      documentTitle={title}
      // onAfterPrint={handleAfterPrint}
      // onBeforeGetContent={handleOnBeforeGetContent}
      // onBeforePrint={handleBeforePrint}
      removeAfterPrint
      trigger={reactToPrintTrigger}
    />
  );
};
