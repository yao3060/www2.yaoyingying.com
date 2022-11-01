import { setUncaughtExceptionCaptureCallback } from "process";
import React, { useEffect, useState } from "react";

interface Props {
  title?: string;
  description?: string;
  bgImage?: string;
}

const ContentHeader = (props: Props) => {
  return (
    <>
      <h1 className="text-2xl">{props.title}</h1>
    </>
  );
};

export default ContentHeader;
