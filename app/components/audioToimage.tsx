"use client"

import DragDrop from "./FileSelector";
import Imagegen from "./Imagegen";
import { useState } from "react";

export default function AudioToImage() {
  const [audio, setAudio] = useState(false);
  const [transcript, setTranscript] = useState();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="m-3">Upload Your File Here</h1>
      <DragDrop setAudio={setAudio} setDGTranscript={setTranscript}></DragDrop>
      <Imagegen></Imagegen>
    </div>
  );
}
