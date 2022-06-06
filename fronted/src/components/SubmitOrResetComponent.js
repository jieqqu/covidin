import {  Button } from "@mui/material";
import React from "react";

const SubmitOrResetComponent = ({ model }) => {
  return (
    <>
      <Button
        sx={{
          color: "#fff",
          background: "#95B2B5",
          width: "100px",
          height: "35px",
          borderRadius: "15px",
          mr: 5,
          "&:hover": { background: "#95B2B5", opacity: 0.9 },
        }}
        type="submit"
        disabled={model}
      >
        儲存變更
      </Button>
      <Button
        sx={{
          color: "#fff",
          background: "#E2A086",
          width: "100px",
          height: "35px",
          borderRadius: "15px",
          "&:hover": { background: "#E2A086", opacity: 0.9 },
        }}
        type="reset"
        disabled={model}
      >
        清除重填
      </Button>
    </>
  );
};

export default SubmitOrResetComponent;
