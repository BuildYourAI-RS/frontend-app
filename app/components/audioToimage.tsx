"use client";

import DragDrop from "./FileSelector";
import Imagegen from "./Imagegen";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./Home.module.css";
const WaveForm = dynamic(() => import("./Waveform"), {
  ssr: false,
});
import Player from "./Player";
import Overview from './Overview'

export default function AudioToImage() {
  const [audio, setAudio] = useState(false);
  const [transcript, setTranscript] = useState<string>();
  const [audioWaveForm, setAudioWaveForm] = useState();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="m-3">Upload Your File Here</h1>
      <div className={styles.container}>
        <DragDrop
          setAudio={setAudio}
          setDGTranscript={setTranscript}
        ></DragDrop>
        <div className="grid items-center">
          <Player
            audio={audio}
            audioWaveForm={audioWaveForm}
            dGTranscript={transcript}
          />
        </div>
        {
          <WaveForm
            url={!audio ? "/Rev.mp3" : audio}
            setAudioWaveForm={setAudioWaveForm}
          />
        }
        <Overview dGTranscript={transcript}></Overview>
      </div>
      <Imagegen dGTranscript={transcript}></Imagegen>
    </div>
  );
}
