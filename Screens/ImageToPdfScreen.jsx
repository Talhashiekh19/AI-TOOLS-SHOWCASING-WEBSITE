import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { GREY_COLOR, LINK_UNDERLINE_COLOR } from "../Constants";
import ConvertApi from "convertapi-js";
import {
  CloudUpload as CloudUploadIcon,
  Download,
  Download as DownloadIcon,
} from "@mui/icons-material";
import Loader from "../Components/Loader";

const SelectButton = ({ onClick, text }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{ py: 3, px: 5, borderRadius: 5, bgcolor: LINK_UNDERLINE_COLOR }}
    >
      <Typography
        color="white"
        className="poppins"
        textTransform="capitalize"
        variant="h5"
      >
        {text}
      </Typography>
    </Button>
  );
};

const ConvertButton = ({ handleConversion, loaded }) => (
  <Button
    startIcon={
      loaded ? null : (
        <CloudUploadIcon style={{ fontSize: 30, marginRight: 5 }} />
      )
    }
    onClick={handleConversion}
    variant="contained"
    color="error"
    sx={{ width: "100%", p: 2, mt: 1 }}
  >
    {loaded ? (
      <Loader />
    ) : (
      <Typography className="poppins" variant="h5" textTransform="capitalize">
        Convert to PDF
      </Typography>
    )}
  </Button>
);

const DownloadButton = ({ handleDownload }) => {
  return (
    <Button
      onClick={handleDownload}
      startIcon={<DownloadIcon style={{ fontSize: 30, marginRight: 5 }} />}
      variant="contained"
      color="error"
      sx={{ width: "100%", p: 2, mt: 1 }}
    >
      <Typography className="poppins" variant="h5" textTransform="capitalize">
        Download PDF
      </Typography>
    </Button>
  );
};

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

  let convertApi = ConvertApi.auth(
    import.meta.env.VITE_SECRET_IMAGE_TO_PDF_KEY
  );


  async function handleConversion() {
    const checkingSelection = selected === "Image";
    try {
      setloaded(true);
      let params = convertApi.createParams();
      params.add(checkingSelection ? "Files" : "File", checkingSelection ? files : files[0]);
      let result = await convertApi.convert(checkingSelection ? "images" : "txt", "pdf", params);
      setloaded(false);
      setpdf(result.dto.Files[0]?.Url);
      setshowDwnlod(true)
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
    setshowDwnlod(true)
    seturl(null);
    setfiles(null);
    setselected("nothing");
    setpdf(null);
    setfilename("");
  }


  function handleSelection(sel){
    setshowDwnlod(false)
    setselectedAnyThing(true);
    setselected(sel);
    inputRef.current.setAttribute("accept", sel === "Image" ? "image/*" : "text/*");
    inputRef.current.click();
  }


  const ImageAndTextUIComponent = () => {
    const checkingForSelection = selected === "Text";
    return (
      <>
        {checkingForSelection ? (
          <Typography
            color="white"
            textAlign="center"
            variant="h6"
            className="poppins"
          >
            {filename}
          </Typography>
        ) : (
          <img
            style={{ width: "100%", maxHeight: 400 }}
            src={url}
            alt="Loading..."
          />
        )}
          {!showDwnlod && <ConvertButton handleConversion={handleConversion} loaded={loaded} />}
          {showDwnlod && <DownloadButton handleDownload={handleDownload} />}
      </>
    );
  };

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
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          pt: 15,
          pb: 5,
        }}
        component="section"
      >
        <Typography
          textAlign="center"
          className="paytone"
          variant="h4"
          color="white"
        >
          Image & Text to{" "}
          <span className="colorfull_text"> PDF Converter </span>
        </Typography>
        <Typography className="mulish" variant="h6" color="white">
          Seamlessly convert text and images into high-quality PDFs with
          HiSkyPDF.
        </Typography>
        <Box width={400}>
          {selectedAnyThing && <ImageAndTextUIComponent />}
        </Box>
        <Box display="flex" gap={3}>
          <SelectButton onClick={() => handleSelection("Image")} text="Select Image" />
          <SelectButton onClick={() => handleSelection("Text")} text="Select Text" />
        </Box>
      </Container>
    </>
  );
};

export default ImageToPdfScreen;
