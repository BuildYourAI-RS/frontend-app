import { useState, useEffect } from "react";

import styles from "./Overview.module.css"

const Overview = ({dGTranscript }) => {
  const transcription = "Generate an image, which is hyper realistic. There are aliens dancing on Mars, having a party, The solar system is in the background. And the 1 is shining very bright. 3 d render.";
  const [transcript, setTranscript] = useState(transcription);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

  return (
    // <ViewSplitter>
    <div>
      <div className="max-w-[400px] max-h-[220px] overflow-scroll text-center">
        {transcript}
      </div>
    </div>
    // </ViewSplitter>
  );
};

export default Overview;
