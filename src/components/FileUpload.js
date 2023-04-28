import React, { useState } from "react";

export default function FileUpload(props) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    uploadFile();
  };

  const uploadFile = async (e) => {
    const data = new FormData();
    data.append("fileName", props.formData.name);
    data.append("image", file);
    props.setFormData({ ...props.formData, sportPic: data });
    console.log("Photo uploaded successfully");
  };

  return (
    <div>
      <input type="file" name="image" accept="image/*" onChange={saveFile} />
    </div>
  );
}
