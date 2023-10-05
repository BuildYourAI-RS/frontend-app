"use client"

import Upload from "./Upload";
import { useState } from "react";

export default function AudioToImage() {
  const [audio, setAudio] = useState(false);
  const [transcript, setTranscript] = useState();

  return (
    <>
      <h1 className="m-3">Upload Your File Here</h1>
      {/* <Upload setAudio={setAudio} setTranscript={setTranscript}></Upload> */}
    </>
  );
}
