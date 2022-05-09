import React, { useState } from "react";
import { UploadImage } from "@/zero/components";
import userAvatar from "@/assets/img/user.png";
/* TODO：上传头像 */
export default ({ avatar }: { avatar: string }) => {
  const [imgUrl, setImgUrl] = useState<string>(avatar || userAvatar);
  const onUpload = (response: any) => {
    const data = response[0]["data"];
    if (data) {
      setImgUrl(data);
    }
  };
  const onRemove = () => {
    setImgUrl(userAvatar);
  };

  return (
    <>
      <UploadImage
        defaultImages={[imgUrl]}
        data={{ uploadType: "qcloudyun" }}
        onUpload={onUpload}
        onRemove={onRemove}
        maxCount={1}
      />
    </>
  );
};
