import React, { useEffect, useMemo, useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useEnv, cookieStorage } from "../../../api";

const { Dragger } = Upload;

/**
 * 本组件为文件上传组件，一次只能上传一个文件
 * 参数简介
 * startUpload 触发文件上传
 * finishUpload 上传完成回调，可以接受参数为全量文件的 fileList
 * data 上传附带的其他参数
 * action 文件上传接口 例如： system/user/importData
 * maxSize 文件大小限制
 * tip 提示文案
 * 其他参数参考：https://ant.design/components/upload-cn/
 */

type IProps = {
  maxSize?: number;
  finishUpload: Function;
  startUpload: boolean;
  data?: any;
  action: string;
  tip?: string;
  [key: string]: any;
};

export default (props: IProps) => {
  const env = useEnv();
  const [file, setFile] = useState<any>();
  const {
    finishUpload,
    startUpload,
    maxSize,
    tip,
    data,
    action,
    ...restProps
  } = props;

  const [beforeUpload, onRemove] = useMemo(() => {
    /**
     * 默认校验
     * @param file
     * @param fileList
     * @returns
     */
    const beforeUpload = (file: any) => {
      if (maxSize) {
        const fileSize = file.size / 1024 / 1024;
        fileSize > maxSize && (file.status = "error");
        fileSize > maxSize &&
          message.error(`文件 ${file.name} 超过 ${maxSize}M 无法上传！`);
      }
      setFile(file);
      return false;
    };
    const onRemove = (file: any) => {
      setFile(null);
    };
    return [beforeUpload, onRemove];
  }, []);

  useEffect(() => {
    const handleUpload = () => {
      if (!file) {
        message.warn("请选择要上传的文件");
        return;
      }
      if (file.status && file.status === "error") {
        message.warn("该文件校验不通过，不能上传");
        finishUpload && finishUpload(false);
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      if (data) {
        for (let i in data) {
          formData.append(i, data[i]);
        }
      }
      const token = cookieStorage.getItem("token");
      fetch(action, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.code && res.code == "200") {
            setFile(null);
            message.success(`${file.name}上传成功`);
            finishUpload && finishUpload(true);
          } else {
            message.error(res.msg ?? `${file.name}上传失败`);
            finishUpload && finishUpload(false);
          }
        })
        .catch(() => {
          message.error(`${file.name}上传失败`);
          finishUpload && finishUpload(false);
        });
    };
    startUpload && handleUpload();
  }, [startUpload]);

  const draggerState = {
    // name: "file",
    // accept: "image/png,image/jpeg,image/jpg,.xls,.xlsx,.pdf",
    // action: env.uploadUrl,
    maxCount: 1,
    beforeUpload,
    onRemove,
    // onChange(info: any) {
    //   // setFileList(info.fileList);
    //   const { status } = info.file;
    //   if (status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === "done") {
    //     const responseList: any[] = [];
    //     const fileList = info.fileList;
    //     fileList.reduce((responseList: any[], item: any) => {
    //       responseList.push(item.response);
    //       return responseList;
    //     }, responseList);
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //   } else if (status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
    // onDrop(e: any) {
    //   console.log("Dropped files", e.dataTransfer.files);
    // },
    ...restProps,
  };

  return (
    <>
      <Dragger {...draggerState}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          将文件拖到此处或<a>点击上传</a>
        </p>
        <p style={{ color: "red" }} className='ant-upload-hint'>
          {tip}
        </p>
      </Dragger>
    </>
  );
};
