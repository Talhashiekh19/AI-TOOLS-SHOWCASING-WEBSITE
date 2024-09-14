import React, { useRef, useState } from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { GREY_COLOR, LINK_UNDERLINE_COLOR } from "../Constants";
import ConvertApi from "convertapi-js";
import {
  CloudUpload as CloudUploadIcon,
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

const ConvertButton = ({ handleConvert, loaded }) => (
  <Button
    startIcon={
      loaded ? null : (
        <CloudUploadIcon style={{ fontSize: 30, marginRight: 5 }} />
      )
    }
    onClick={handleConvert}
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
  const [selected, setselected] = useState(null);
  const [url, seturl] = useState("");
  const [value, setvalue] = useState("");
  const [files, setfiles] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [showDwnlod, setshowDwnlod] = useState(false);
  const [pdf, setpdf] = useState(null);
  const [selection,setselection] = useState(null);
  const downloadButtonRef = useRef(null);

  let convertApi = ConvertApi.auth(
    import.meta.env.VITE_SECRET_IMAGE_TO_PDF_KEY
  );

  async function handleConvert() {
    try {
      const textFile = new File([value], "example.txt", { type: "text/plain" }); 
      console.log(textFile)

      let params = convertApi.createParams();
      selected ? params.add("Files", files) : params.add("Files", textFile);
      console.log(files)
      setloaded(true);
      setshowDwnlod(false);
      let result;
      if(selected){
        result = await convertApi.convert("images","pdf", params);
      }else {
        result = await convertApi.convert('txt', 'pdf', params)
      }
      setloaded(false);
      setshowDwnlod(true);
      setpdf(result.dto.Files[0]);
      console.log(result.dto.Files[0]);

    } catch (e) {
      setloaded(false);
      setshowDwnlod(false);
    }
  }

  const inputRef = useRef(null);

  function handleSelectImage() {
    setselected(true);
    setselection("");
    setshowDwnlod(false)
    inputRef.current.click();
  }

  function handleSelectFiles(e) {
    const selectedFiles = e?.target?.files;
    setfiles(selectedFiles);
    console.log(selectedFiles[0])
    if (selectedFiles) {
      const image = URL.createObjectURL(selectedFiles[0]);
      seturl(image);
    }
  }

  function handleDownload() {
    downloadButtonRef.current.click();
    seturl("");
    setfiles(null);
    setselection("")
    setselected(true);
    setpdf(null);
    setshowDwnlod(true)
  }

  return (
    <>
      <input
        ref={inputRef}
        onChange={handleSelectFiles}
        accept="image/*"
        type="file"
        hidden
      />
      <a href={pdf?.Url} ref={downloadButtonRef} download></a>
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
          {/* {selected !== null && ( */}
            {selection !== null && <>
              {selected ? (
                <>
                  {showDwnlod ? null : (
                    <img
                      style={{ width: "100%", maxHeight: 400 }}
                      src={url}
                      alt="Loading..."
                    />
                  )}
                    <>
                      {showDwnlod ? (
                        <DownloadButton handleDownload={handleDownload} />
                      ) : (
                        <ConvertButton
                          loaded={loaded}
                          handleConvert={handleConvert}
                        />
                      )}
                    </>
                </>
              ) : (
                <>
                  <TextField
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                    fullWidth
                    placeholder="Enter the text to convert"
                    multiline
                    rows={15}
                    sx={{ border: `1px solid ${GREY_COLOR}`, color: "white" }}
                    InputProps={{
                      style: {
                        color: "white",
                        fontSize: 20,
                        fontFamily: "poppins",
                      }, // Text color inside input
                    }}
                  />
                  {showDwnlod ? (
                    <DownloadButton handleDownload={handleDownload} />
                  ) : (
                    <ConvertButton
                      loaded={loaded}
                      handleConvert={handleConvert}
                    />
                  )}
                </>
              )}
            </>}
          {/* // )} */}
        </Box>
        <Box display="flex" gap={3}>
          <SelectButton onClick={handleSelectImage} text="Select Image" />
          <SelectButton onClick={() => setselected(false)} text="Enter Text" />
        </Box>
      </Container>
    </>
  );
};

export default ImageToPdfScreen;
