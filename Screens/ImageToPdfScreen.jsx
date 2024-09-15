import React, { useRef, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { GREY_COLOR, LINK_UNDERLINE_COLOR } from "../Constants";
import ConvertApi from "convertapi-js";
import { useResponsivness } from "../Helpers";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import {
  ConvertButton,
  DownloadButton,
  SelectButton,
} from "../Components/CustomButtons";
import Loader from "../Components/Loader";

// 482889292

const ImageToPdfScreen = () => {
  const inputRef = useRef(null);

  const downloadButtonRef = useRef(null);

  const [selectedAnyThing, setselectedAnyThing] = useState(false);

  const [selected, setselected] = useState("nothing");

  const [files, setfiles] = useState(null);

  const [url, seturl] = useState("");

  const [filename, setfilename] = useState("");

  const [pdf, setpdf] = useState(null);

  const [loaded, setloaded] = useState(false);

  const [showDwnlod, setshowDwnlod] = useState(false);

  const [value, setvalue] = useState("");

  let convertApi = ConvertApi.auth(
    import.meta.env.VITE_SECRET_IMAGE_TO_PDF_KEY
  );

  async function handleConversion() {
    const checkingSelection = selected === "Image";
    try {
      let file;
      if (!checkingSelection) {
        file = new File([value], filename, { type: "text/plain" });
      }
      setloaded(true);
      let params = convertApi.createParams();
      params.add(
        checkingSelection ? "Files" : "File",
        checkingSelection ? files : file
      );
      let result = await convertApi.convert(
        checkingSelection ? "images" : "txt",
        "pdf",
        params
      );
      setloaded(false);
      setpdf(result.dto.Files[0]?.Url);
      setshowDwnlod(true);
    } catch (e) {
      setloaded(false);
    }
  }

  function handleSelectFiles(e) {
    const selectedFiles = e?.target?.files;
    setfiles(selectedFiles);
    if (selectedFiles) {
      const image = URL.createObjectURL(selectedFiles[0]);
      seturl(image);
      setfilename(selectedFiles[0]?.name);
    }
  }

  function handleDownload() {
    downloadButtonRef.current.click();
    setshowDwnlod(true);
    seturl(null);
    setfiles(null);
    setselected("nothing");
    setpdf(null);
    setfilename("");
  }

  function handleSelection(sel) {
    setshowDwnlod(false);
    setselectedAnyThing(true);
    setselected(sel);
    sel === "Image" ? inputRef.current.click() : null;
  }

  const ImageAndTextUIComponent = () => {
    return (
      <Box display="flex" justifyContent="center">
        {!showDwnlod && (
          <ConvertButton
            text={loaded ? "Converting..." : "Convert to PDF"}
            handleConversion={handleConversion}
            loaded={loaded}
          />
        )}
        {showDwnlod && (
          <DownloadButton text="Download PDF" handleDownload={handleDownload} />
        )}
      </Box>
    );
  };

  const checkingForSelection = selected === "Text";
  const checkingSMDown = useResponsivness("down", "sm");
  return (
    <>
      <input
        ref={inputRef}
        onChange={handleSelectFiles}
        accept={"image/*"}
        type="file"
        hidden
      />
      <a href={pdf} ref={downloadButtonRef} download></a>
      <ReusableScreenContainer>
        <Typography
          textAlign="center"
          className="paytone"
          variant="h4"
          color="white"
        >
          Image & Text to {checkingSMDown && <br />}{" "}
          <span className="colorfull_text"> PDF Converter </span>
        </Typography>
        <Typography
          textAlign="center"
          className="mulish"
          variant="h6"
          color="white"
        >
          Seamlessly convert text and images into high-quality PDFs with
          HiSkyPDF.
        </Typography>
        {selectedAnyThing && (
          <Box width={400}>
            {checkingForSelection && (
              <>
             {loaded ? <Loader/> : <TextField
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                fullWidth
                multiline
                rows={15}
                sx={{ border: `1px solid ${GREY_COLOR}`, color: "white" }}
                placeholder="Enter Text to convert"
                InputProps={{
                  style: {
                    color: "white",
                    fontSize: 20,
                    fontFamily: "poppins",
                  },
                }}
              />}
              </>
            )}
            {!checkingForSelection ? (
              <>
                {loaded ? <Loader/> : <img
                  style={{ width: "100%", maxHeight: 400 }}
                  src={url}
                  alt="Loading..."
                />}
              </>
            ) : null}
            <ImageAndTextUIComponent />
          </Box>
        )}
        <Box display="flex" gap={3}>
          <SelectButton
            onClick={() => handleSelection("Image")}
            text="Select Image"
          />
          <SelectButton
            onClick={() => handleSelection("Text")}
            text="Select Text"
          />
        </Box>
      </ReusableScreenContainer>
    </>
  );
};

export default ImageToPdfScreen;
