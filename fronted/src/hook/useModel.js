import React, { useEffect, useState } from "react";

export const useModel = () => {
  const { state } = JSON.parse(localStorage.getItem("cinguan_token"));
  const [model, setModel] = useState(state === "read");

  useEffect(() => {
    if (state === "read") {
      setModel(true);
    }
    if (state === "create") {
      setModel(false);
    }
  }, [state]);
  return model
}
