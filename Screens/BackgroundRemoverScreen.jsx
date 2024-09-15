import React, { useRef, useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import { Box, Typography } from "@mui/material";
import {
  SelectButton,
  DownloadButton,
  ConvertButton,
} from "../Components/CustomButtons";
import Loader from "../Components/Loader";
import { FileNameText } from "./ImageToPdfScreen";

const BackgroundRemoverScreen = () => {
  const inputRef = useRef(null);

  const downloadButtonRef = useRef(null);

  const [files, setfiles] = useState(null);

  const [showdwnld, setshowdwnld] = useState(false);

  const [imageurl, setimageurl] = useState("");

  const [showcnvrt, setshowcnvrt] = useState(false);

  const [loaded, setloaded] = useState(false);

  function handleSelectImage() {
    inputRef?.current?.click();
  }

  function handleDownloadImage() {
    downloadButtonRef?.current?.click();
  }

  function handleSelectFiles(e) {
    setimageurl(URL.createObjectURL(e?.target?.files[0]));
    setfiles(e?.target?.files[0]);
    setshowcnvrt(true);
  }

  async function handleRemoval() {
    try {
      const URL = "https://api.remove.bg/v1.0/removebg";

      const formData = new FormData();
      formData.append("size", "auto");
      formData.append("image_file", files, files.name);

      setloaded(true);

      const response = await fetch(URL, {
        method: "POST",
        headers: { "X-Api-Key": import.meta.env.VITE_SECRET_BG_REMOVER_KEY },
        body: formData,
      });

      setloaded(false);

      const blobResponse = await response.blob();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setimageurl(fileReader.result);
      };

      fileReader.readAsDataURL(blobResponse);
      setshowdwnld(true);
      setshowcnvrt(false);
    } catch (error) {
      setloaded(false);
      console.log(error);
    }
  }

  return (
    <ReusableScreenContainer>
      <input
        ref={inputRef}
        onChange={handleSelectFiles}
        accept={"image/*"}
        type="file"
        hidden
      />
      <a
        href={imageurl !== "" ? imageurl : ""}
        ref={downloadButtonRef}
        download
      ></a>
      <Typography
        textAlign="center"
        className="paytone"
        variant="h4"
        color="white"
      >
        Image
        <span className="colorfull_text"> Background Remover </span>
      </Typography>
      <Typography
        textAlign="center"
        className="mulish"
        variant="h6"
        color="white"
      >
        Effortlessly remove backgrounds from your images for a clean and
        professional look.
      </Typography>
      <Box width={400}>
        {imageurl !== "" && (
          <>
            {loaded ? (
              <Loader />
            ) : (
              <>
                {showdwnld ? (
                  <FileNameText text={files?.name} />
                ) : (
                  <img
                    style={{ width: "100%", maxHeight: 400 }}
                    src={imageurl}
                    alt="Loading..."
                  />
                )}
              </>
            )}
          </>
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        {!showcnvrt && !showdwnld && (
          <SelectButton onClick={handleSelectImage} text="Select Image" />
        )}
        {showcnvrt && !showdwnld && (
          <ConvertButton
            text={loaded ? "Removing Background ..." : "Remove Background"}
            handleConversion={handleRemoval}
            loaded={loaded}
          />
        )}
        {showdwnld && !showcnvrt && (
          <DownloadButton
            text="Download Image"
            handleDownload={handleDownloadImage}
          />
        )}
      </Box>
    </ReusableScreenContainer>
  );
};

export default BackgroundRemoverScreen;
