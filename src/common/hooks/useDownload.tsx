// 通用下载方法
export default (fileName: string) => {
  window.open(
    `${
      (process as any).env.productConfig.FILE_SERVICE_URL
    }/common/download?fileName=${encodeURI(fileName)}&delete=true`,
    `target`,
    ""
  );
};
