"use client";
import { useState, useEffect } from "react";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Imagegen = ({ dGTranscript }: { dGTranscript: string | undefined }) => {
  const [isTransSet, setTransSet] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [images, setImages] = useState([]);
  const [openaimg, setOpenaimg] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgPrompt, setImgPrompt] = useState<string>();
  const [error, setError] = useState("ERROR GENERATING IMAGAES");

  const genPrompt = async (dGTranscript: string) => {
    const output =
      "{\n\
          “prompt”:””,\n\
          }";
    const promptopenai = `you are an expert in prompt engineering. Now, generate exactly 1 prompt inspired by the transcription of an artist describing their imaginative vision for a piece of art. This prompt will be given as input to a generative artificial intelligence model, which in turn will generate images using it. Here is the transcription ${dGTranscript} given by the artist,  focusing on the key entities. Give the output as a JSON, in the following format ${output}, follow the output format strictly`;
    // console.log("prompt to openai: ", promptopenai);
    let response;
    try {
      response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: promptopenai,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      // console.log("openai repsonse: ", response.choices[0]["text"]);
      setImgPrompt(response.choices[0]["text"]);
      // console.log("imgprmpt",imgPrompt)
      // return response;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error(error.status); // e.g. 401
        console.error(error.message); // e.g. The authentication token you passed was invalid...
        console.error(error.code); // e.g. 'invalid_api_key'
        console.error(error.type); // e.g. 'invalid_request_error'
        setError(error.message);
        return;
      } else {
        // Non-API error
        console.log(error);
      }
    }
    return response;
  };

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
      setTransSet(true);
    }
  }, [dGTranscript]);

  const generateImages = async () => {
    setIsLoading(true);
    if (!isTransSet) return;
    const res = await genPrompt(transcript);
    // console.log("res: ", res);
    const imgPrompt = res!.choices[0]["text"];
    // console.log("imgPromptUseEffect: ", imgPrompt);
    // console.log("imgPromptButton: ", imgPrompt);
    const prompt: string = JSON.parse(imgPrompt!).prompt;
    // console.log("extracted prompt: ", prompt);
    try {
      const engineId = "stable-diffusion-xl-1024-v1-0";
      const apiHost = process.env.API_HOST ?? "https://api.stability.ai";
      const apiKey = process.env.NEXT_PUBLIC_STABILITY_API_KEY;
      if (!apiKey) {
        throw new Error("Missing Stability API key.");
        setError("Missing Stability API key.");
      }

      const response = await fetch(
        `${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            text_prompts: [{ text: prompt }],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 2,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
      }
      const data = await response.json();
      const generatedImages = data.artifacts.map(
        (image: any) => `data:image/png;base64,${image.base64}`
      );
      setImages(generatedImages);
    } catch (error) {
      console.error("Error generating images:", error);
      setError(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const generateDalleImages = async () => {
    setIsLoading(true);
    if (!isTransSet) return;
    const res = await genPrompt(transcript);
    // console.log("res: ", res);
    const imgPrompt = res!.choices[0]["text"];
    // console.log("imgPromptUseEffect: ", imgPrompt);
    // console.log("imgPromptButton: ", imgPrompt);
    const prompt: string = JSON.parse(imgPrompt!).prompt;
    // console.log("extracted prompt: ", prompt);
    try {
      const response = await openai.images.generate({
        prompt,
        n: 2,
        size: "512x512",
      });
      // console.log(response.data)
      console.log(response.data[0].url);
      console.log(response.data[1].url);
      const newUrlArray = [response.data[0].url!, response.data[1].url!];
      setOpenaimg(newUrlArray);
      return response.data[0].url;
    } catch (err) {
      console.log(err);
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 gap-3 p-4">
        <button
          className="btn btn-neutral ml-3"
          onClick={generateImages}
          disabled={isLoading || !isTransSet}
        >
          Generate Images Stability Ai
        </button>
        <button
          className="btn btn-neutral ml-3"
          onClick={generateDalleImages}
          disabled={isLoading || !isTransSet}
        >
          Generate Images Dall-E
        </button>
      </div>
      {isLoading && <p>Generating images...</p>}
      
      { images.length>0 || openaimg.length>0?
        <div className="w-auto p-4 grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Generated Image ${index}`} />
          ))}
        </div>:<div className=" text-red-400">{error}</div>
      }
      {openaimg.length>0|| images.length>0?
        <div className="w-auto p-4 grid grid-cols-2 gap-4">
          {openaimg.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
          ))}
        </div>:<div className=" text-red-400">{error}</div>
      }
      {/* <div className="grid grid-cols-2 gap-4 p-4">
                <img src="./download.png" alt="Burger" />
                <img src="./download(1).png" alt="Burger" />
        </div>  */}
    </div>
  );
};

export default Imagegen;
