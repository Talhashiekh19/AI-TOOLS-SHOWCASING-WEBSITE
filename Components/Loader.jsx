import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <Puff
      visible={true}
      height="150"
      width="150"
      color="white"
      ariaLabel="puff-loading"
      wrapperStyle={{
        display:"flex",
        justifyContent:"center",
        padding:30
      }}
      wrapperClass=""
    />
  );
};

export default Loader;
