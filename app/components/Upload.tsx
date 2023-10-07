'use client';
import { read } from 'fs';
import React from 'react'
import { useState } from 'react'


export default function Upload({setAudio,setTranscript}:{setAudio:any,setTranscript:any}){
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0])
    setAudio(e.target.files[0])
    // console.log(e.target.files[0])
  }

  const handleUpload = async () => {
    setIsUploading(true)
    setLoading(true);
    async function audioToBase64(audioFile:any) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(audioFile);
      });
    }

    async function fetchCall(file:any) {
      let audio64;
      await audioToBase64(file).then((result) => (audio64 = result));
      console.log(audio64)
      // await fetch("api/deepgram", {
      //   method: "POST",
      //   body: audio64,
      // })
      //   .then((response) => response.json())
      //   .then((result) => {
      //     setTranscript(JSON.parse(result.body).utterances);
      //     console.log("upload",JSON.parse(result.body).channels[0].alternatives[0]);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //     setError(true);
      //   });
      
    }

    if (file) {
      fetchCall(file);
    }
    else{
      console.log("x")
    }
    setIsUploading(false)
  }
  
  return (
    <div>
      <input type="file" accept="audio/*" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />
      <button className="btn btn-neutral ml-3" onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  )
}
