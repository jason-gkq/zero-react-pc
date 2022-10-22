import { Modal, message } from "antd";

export default (props: any) => {
  const { onOk, payload, successMsg, errorMsg, ...restProps } = props;
  return new Promise((resolve, reject) => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        if (onOk && typeof onOk == "function") {
          try {
            const res = await onOk(payload);
            message.success(successMsg || "操作成功");
            return resolve(res);
          } catch (error) {
            message.error(errorMsg || "操作失败");
            return reject(error);
          }
        }
      },
      ...restProps,
    });
  });
};
