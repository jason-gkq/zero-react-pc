import React, { useMemo, useRef } from "react";
import { message, Modal } from "antd";
import type { ActionType } from "@ant-design/pro-table";

import { delPost } from "../service";

const useDelete = (ids: number[]) => {
  const ref = useRef<ActionType>();
  const handleDelete = useMemo(() => {
    if (!ids.length) return;
    const postIds = ids;
    Modal.confirm({
      title: '是否确认删除岗位编号为"' + postIds + '"的数据项?',
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        delPost(postIds)
          .then(() => {
            message.success("删除成功");
            (ref as any).current.reloadAndRest();
          })
          .catch((e) => {
            message.error(e?.msg || "删除失败");
          });
      },
    });
  }, [ids]);
  return handleDelete;
};

export default useDelete;
