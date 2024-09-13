import React, { useRef, useState } from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { GREY_COLOR, LINK_UNDERLINE_COLOR } from "../Constants";
import ConvertApi from 'convertapi-js'

// i am making an image to pdf converter tool for a company named HiSkyTech can you give to me a name of this tool it should be of one word only and also a one line headline about this tool

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

const ConvertButton = ({handleConvert}) => (
  <Button onClick={handleConvert} variant="contained" color="error" sx={{ width: "100%", p: 1, mt: 1 }}>
    <Typography className="poppins" variant="h5" textTransform="capitalize">
      Convert to PDF
    </Typography>
  </Button>
);

// 482889292

const ImageToPdfScreen = () => {
  const [selected, setselected] = useState(null);
  const [url, seturl] = useState("");
  const [value, setvalue] = useState("");
  const [files,setfiles] = useState(null);

  let convertApi = ConvertApi.auth(import.meta.env.VITE_SECRET_IMAGE_TO_PDF_KEY)

  async function handleConvert(){
      let params = convertApi.createParams()
      params.add('Files', files);
      console.log("Converting")
      let result = await convertApi.convert('images', 'pdf', params)
      console.log("Converted")
    console.log(result)
  }



  const inputRef = useRef(null);

  function handleSelectImage() {
    setselected(true);
    inputRef.current.click();
  }

  function handleSelectFiles(e) {
    const selectedFiles = e?.target?.files;
    setfiles(selectedFiles) 
    if(selectedFiles){
        const image = URL.createObjectURL(selectedFiles[0]);
        seturl(image);
    }
  }

  return (
    <>
    
      <input
        ref={inputRef}
        onChange={handleSelectFiles}
        accept="image/*"
        type="file"
      />
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
          variant="h3"
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
          {selected !== null && (
            <>
              {selected ? (
                <>
                <img
                  style={{ width: "100%", maxHeight: 400 }}
                  src={url}
                  alt="Loading..."
                />
                <ConvertButton
                handleConvert={handleConvert}
                />
                </>
              ) : (
                <>
                <TextField
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                  fullWidth
                  multiline
                  rows={15}
                  sx={{ border: `1px solid ${GREY_COLOR}`, color: "white" }}
                  defaultValue="Enter Text to convert"
                  InputProps={{
                    style: {
                      color: "white",
                      fontSize: 20,
                      fontFamily: "poppins",
                    }, // Text color inside input
                  }}
                />
                <ConvertButton
                handleConvert={handleConvert}
                
                />
                </>
              )}
            </>
          )}
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
