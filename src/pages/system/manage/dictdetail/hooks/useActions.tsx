import { useMemo } from "react";
import { Modal, message } from "antd";
import { delDictData, getDictData } from "../service";

export default (ref: any, formRef: any, showModal: any) => {
  return useMemo(() => {
    /** 删除按钮操作 */
    const handleDelete = (dictCode: string) => {
      Modal.confirm({
        title: '是否确认删除字典编码为"' + dictCode + '"的数据项?',
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          delDictData(dictCode)
            .then(() => {
              message.success("删除成功");
              ref.current.reloadAndRest();
            })
            .catch((e) => {
              message.error(e?.msg || "删除失败");
            });
        },
      });
    };

    /** 修改按钮操作 */
    const handleUpdate = async (dictCode: number) => {
      const { data } = await getDictData(dictCode);
      if (!data) return;
      showModal({
        modalInfo: {
          ...data,
          dictCode: dictCode,
        },
      }).then(() => {
        ref.current.reloadAndRest();
      });
    };

    const handleAdd = (modalInfo: any) => {
      showModal({ modalInfo }).then(() => {
        ref.current.reloadAndRest();
      });
    };
    return {
      handleDelete,
      handleUpdate,
      handleAdd,
    };
  }, [ref, formRef, showModal]);
};
