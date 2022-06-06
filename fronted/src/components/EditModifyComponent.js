import React from "react";
import { ReactComponent as Edit } from "./../svg/edit.svg";
import { Button } from "@mui/material";

const EditModifyComponent = ({onClick}) => {
  const { state } = JSON.parse(localStorage.getItem("cinguan_token"));
  return (
    <>
      {state === 'read' ? (
        <Button
          startIcon={<Edit />}
          sx={{ fontSize: "1.5rem", color: "#6A594F", ml: "auto", mr: "61px" }}
          onClick={onClick}
        >
          修改
        </Button>
      ) : null}
    </>
  );
};

export default EditModifyComponent;
