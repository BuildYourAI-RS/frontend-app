'use client';
import React from 'react'
import { useState } from 'react'

export default function Upload(){
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    setIsUploading(true)
    if (file) {
      const formData = new FormData();
      formData.append('audio', file);
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await fetch('YOUR_API_ENDPOINT', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
