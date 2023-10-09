import Wavesurfer from "wavesurfer.js";
import { useState, useEffect, useRef } from "react";

import styles from "./WaveForm.module.css";

const WaveForm = ({ url, setAudioWaveForm }) => {
  const waveform = useRef(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (waveform.current) {
      waveform.current.destroy();
      waveform.current = null;
    }

    if (!waveform.current) {
      waveform.current = Wavesurfer.create({
        container: "#waveform",
        waveColor: "white",
        progressColor: "#0d76ff",
        barGap: 5,
        barWidth: 2,
        barRadius: 2,
        height: 120,
        cursorWidth: 3,
        cursorColor: "tomato",
      });

      if (typeof url == "string") {
        // console.log("url:",url)
        waveform.current.load(url);
      } else {
        // console.log("not url:",url)
        waveform.current.loadBlob(url);
      }


      waveform.current.on("ready", function () {
        setLoading(false);
      });

      waveform.current.on("loading", function () {
        setLoading(true);
      });

      setAudioWaveForm(waveform);
    }
  }, [url]);

  return (
    <>
      <div
        id="waveform"
        className={styles.waveform}
        style={{ display: `${loading ? "hidden" : "block"}` }}
      />
      {loading && <h2>Loading waveform...</h2>}
    </>
  );
};

export default WaveForm;
