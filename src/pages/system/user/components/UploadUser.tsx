import React, { useMemo, useState } from "react";
import { Modal, Checkbox, Button } from "antd";
import { importTemplate } from "../service";

import { useDownload } from "@/common/hooks";
import { UploadFile } from "@/zero/components";
import { useEnv } from "@/zero/api";

type IUpdateProps = {
  isUploadModalVisible: boolean;
  setIsUploadModalVisible: Function;
};

export default (props: IUpdateProps) => {
  const { isUploadModalVisible, setIsUploadModalVisible } = props;
  const [updateSupport, setUpdateSupport] = useState(0);
  const [startUpload, setStartUpload] = useState(false);
  const { FILE_SERVICE_URL } = useEnv();
  // FILE_SERVICE_URL
  const [handleOk, handleCancel, finishUpload] = useMemo(() => {
    const handleOk = () => {
      setStartUpload(true);
    };

    const handleCancel = () => {
      setIsUploadModalVisible(false);
    };

    const finishUpload = (status: boolean) => {
      setIsUploadModalVisible(!status);
      setStartUpload(false);
    };
    return [handleOk, handleCancel, finishUpload];
  }, []);

  return (
    <>
      <Modal
        title='上传用户'
        visible={isUploadModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText='取消'
        okText='确定'
        width='450px'
        confirmLoading={startUpload}
      >
        <div>
          <Button
            type='link'
            onClick={() => {
              importTemplate().then((response) => {
                response && response.msg && useDownload(response.msg);
              });
            }}
          >
            下载模板
          </Button>
        </div>
        <div style={{ margin: "0 0 10px 0" }}>
          <Checkbox
            onChange={(e: any) => {
              setUpdateSupport(Number(e.target.checked));
            }}
          >
            是否更新已经存在的用户数据
          </Checkbox>
        </div>
        <UploadFile
          data={{ updateSupport }}
          tip='提示：仅允许导入“xls”或“xlsx”格式文件！'
          accept='.xls,.xlsx'
          // maxSize={0.02}
          action={`${FILE_SERVICE_URL}/system/user/importData`}
          startUpload={startUpload}
          finishUpload={finishUpload}
          // types={["image/png", "image/jpg", "image/jpeg"]}
        />
      </Modal>
    </>
  );
};
