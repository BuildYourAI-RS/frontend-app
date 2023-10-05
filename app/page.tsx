import AudioToImage from "./components/audioToimage";
import dotenv from 'dotenv';

dotenv.config();

export default function Home() {
  return (
    <main>
        <AudioToImage></AudioToImage>
    </main>
  );
}
