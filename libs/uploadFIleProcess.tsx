import axios from "axios";

import BASE_URL from "../server";

type FileType = "videos" | "users";

const uploadFileProcess = async (
  file: FileList,
  fileName: string,
  fileType: FileType
) => {
  const formData = new FormData();
  formData.append("file", file[0], fileName);
  try {
    const uploadData = await (
      await axios(
        fileType === "videos"
          ? `${BASE_URL}/videos/awsUpload`
          : `${BASE_URL}/users/awsUpload`,
        {
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data;
    return { file: uploadData.file.location };
  } catch (error) {
    console.log(error);
    return { error: "uploadFile Error" };
  }
};

export default uploadFileProcess;
