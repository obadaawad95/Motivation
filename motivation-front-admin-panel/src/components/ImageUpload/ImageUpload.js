import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
    console.log(pickedFile);
    props.onInput(pickedFile);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        required={true}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview" onClick={pickImageHandler}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Click here to pick an image.</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
