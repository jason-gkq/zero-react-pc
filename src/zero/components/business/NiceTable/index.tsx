import React from "react";
import ProTable from "@ant-design/pro-table";
import type { ProTableProps } from "@ant-design/pro-table";
import type { ParamsType } from "@ant-design/pro-provider";

export default <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = "text"
>(
  props: ProTableProps<DataType, Params, ValueType>
) => {
  const defaultProps = {
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultPageSize: 10,
      defaultCurrent: 1,
      // onChange: (page, pageSize) => {
      //   console.log("pagination.onChange", page, pageSize);
      // },
    },
    onRequestError: (error: any) => {
      console.error(error);
    },
    options: {
      fullScreen: false,
      reload: false,
      setting: false,
      density: false,
    },
    search: { defaultCollapsed: false },
    defaultSize: "small",
    dateFormatter: "string",
    ...props,
  } as ProTableProps<DataType, Params, ValueType>;

  return <ProTable<DataType, Params, ValueType> {...defaultProps} />;
};
