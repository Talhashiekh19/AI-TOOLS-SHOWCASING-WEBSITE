import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <Puff
      visible={true}
      height="50"
      width="50"
      color="white"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
