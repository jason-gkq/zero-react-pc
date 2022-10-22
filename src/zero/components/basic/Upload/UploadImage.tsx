import React, { useEffect, useMemo, useState } from "react";
import { Upload, message, Modal, Image } from "antd";
import ImgCrop from "antd-img-crop";
import { useEnv } from "../../../api";

/**
 * 参数简介
 * defaultImages 已上传图片链接地址数组
 * onUpload 上传完成图片回调，可以接受参数为接口返回的 全量照片的responses 和 全量照片的 fileList
 * maxCount 最大上传照片数量，为必传
 * isCrop 是否对图片进行剪切
 * 其他参数参考：https://ant.design/components/upload-cn/
 */

type IProps = {
  defaultImages?: string[];
  onUpload?: Function;
  maxCount: number;
  isCrop?: boolean;
  [key: string]: any;
};

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default (props: IProps) => {
  const { defaultImages, onUpload, maxCount, isCrop, ...restProps } = props;
  const { uploadUrl } = useEnv();
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewState, setPreviewState] = useState<{
    previewVisible: boolean;
    previewImage: string;
    previewTitle: string;
  }>({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  useEffect(() => {
    const defaultFiles: any[] = [];
    let count = 0;
    defaultImages &&
      defaultImages.reduce((defaultFiles: any[], item: any) => {
        if (!item) {
          return defaultFiles;
        }
        const urlArr = item.split("/");
        defaultFiles.push({
          uid: count++,
          name: urlArr[urlArr.length - 1],
          status: "done",
          url: item,
        });
        return defaultFiles;
      }, defaultFiles);
    setFileList(defaultFiles);
  }, [defaultImages]);

  const [onChange, onPreview, handleCancel] = useMemo(() => {
    const onChange = ({
      fileList: newFileList,
      file,
    }: {
      fileList: any;
      file: any;
    }) => {
      const { status } = file;
      if (status === "done") {
        message.success(`${file.name} 上传成功`);
      } else if (status === "error") {
        message.error(`${file.name} 上传失败`);
      }
      setFileList(newFileList);
      if (onUpload && status === "done") {
        const responses: any[] = [];
        newFileList.reduce((responses: any[], item: any) => {
          responses.push(item.response);
          return responses;
        }, responses);
        onUpload(responses, newFileList);
      }
    };

    const onPreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      setPreviewState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle:
          file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
      });

      // let src = file.url;
      // if (!src) {
      //   src = await new Promise((resolve) => {
      //     const reader = new FileReader();
      //     reader.readAsDataURL(file.originFileObj);
      //     reader.onload = () => resolve(reader.result);
      //   });
      // }
      // const image = new Image();
      // image.src = src;
      // const imgWindow: any = window.open(src, "target");
      // imgWindow.document.write(image.outerHTML);
    };

    const handleCancel = () =>
      setPreviewState({ ...previewState, previewVisible: false });
    return [onChange, onPreview, handleCancel];
  }, [previewState]);

  return (
    <>
      {isCrop ? (
        <ImgCrop rotate>
          <Upload
            action={uploadUrl}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            maxCount={maxCount}
            {...restProps}
          >
            {fileList.length < maxCount && "+ Upload"}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          action={uploadUrl}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={maxCount}
          {...restProps}
        >
          {fileList.length < maxCount && "+ Upload"}
        </Upload>
      )}
      <Modal
        visible={previewState.previewVisible}
        title={previewState.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image
          style={{ width: "100%" }}
          preview={false}
          src={previewState.previewImage}
        />
      </Modal>
    </>
  );
};
