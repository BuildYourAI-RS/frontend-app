"use client";
import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./FileSelector.module.css";
const fileTypes = ["MP3", "OGG"];

export default function DragDrop({
  setAudio,
  setDGTranscript,
}: {
  setAudio: any;
  setDGTranscript: any;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const file = useRef(null);

  const handleChange = (file: File) => {
    setLoading(true);
    setAudio(file);

    async function audioToBase64(audioFile: File) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => resolve(e.target!.result);
        reader.readAsDataURL(audioFile);
      });
    } 

    async function fetchCall() {
      const audio64 = await audioToBase64(file);
      await fetch("api/deepgram", {
        method: "POST",
        body: audio64 as string,
      })
        .then((response) => response.json())
        .then((result) => {
          setDGTranscript(JSON.parse(result.body).utterances);
          console.log(JSON.parse(result.body).channels[0].alternatives[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(true);
          setLoading(false);
        });
    }

    fetchCall();
  };

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <h2>{!error ? "LOADING FILE..." : "ERROR LOADING, TRY ANOTHER FILE!"}</h2>
      ) : (
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label="Upload or drop a file (up to 5MB)"
          maxSize={5}
        />
      )}
    </div>
  );
}
