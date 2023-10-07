"use client"
import { useState } from "react";

const Imagegen = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const generateImages = async () => {
      setIsLoading(true);
  
      try {
        const engineId = 'stable-diffusion-xl-1024-v1-0';
        const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
        const apiKey = process.env.NEXT_PUBLIC_STABILITY_API_KEY;
        if (!apiKey) {
          throw new Error('Missing Stability API key.');
        }
  
        const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            text_prompts: [
              {  text: 'A lighthouse on a cliff',},
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 2,
          }),
        }); 
        if (!response.ok) {
          throw new Error(`Non-200 response: ${await response.text()}`);
        }
        const data = await response.json();
        const generatedImages = data.artifacts.map((image:any) => `data:image/png;base64,${image.base64}`);
        setImages(generatedImages);
      } catch (error) {
        console.error('Error generating images:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="w-1/2 flex flex-col justify-center items-center">
        <button className="btn btn-neutral ml-3" onClick={generateImages} disabled={isLoading}>
          Generate Images
        </button>
        {isLoading && <p>Generating images...</p>}
        <div className="w-1/2 p-4 grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Generated Image ${index}`} />
          ))}
        </div>
        {/* <div className="grid grid-cols-2 gap-4 p-4">
                <img src="./download.png" alt="Burger" />
                <img src="./download(1).png" alt="Burger" />
        </div>  */}
      </div>
    );
}

export default Imagegen