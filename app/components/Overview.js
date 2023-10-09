import { useState, useEffect } from "react";

import styles from "./Overview.module.css"

const Overview = ({dGTranscript }) => {
  const transcription = "";
  const [transcript, setTranscript] = useState(transcription);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

  return (
    // <ViewSplitter>
      <div className="p-5 border-1 border-solid border-gray-300 rounded-lg bg-base-200 max-w-[400px] max-h-[220px] overflow-scroll">
      <p>{transcript}</p>
      </div>
    // </ViewSplitter>
  );
};

export default Overview;
