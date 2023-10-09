import { useState, useEffect } from "react";

import styles from "./Player.module.css";

const Player = ({ audio, audioWaveForm, dGTranscript }) => {
  const [audioLength, setAudioLength] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isPlaying, setIsPlaying] = useState(false);

  function toHHMMSS(secs) {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  }

  useEffect(() => {
    if (audioWaveForm) {
      audioWaveForm.current.on("ready", function () {
        setAudioLength(toHHMMSS(audioWaveForm.current.getDuration()));
      });
      audioWaveForm.current.on("finish", function () {
        setIsPlaying(false);
      });
    }

    const timer = setInterval(() => {
      if (audioWaveForm) {
        setAudioLength(toHHMMSS(audioWaveForm.current.getDuration()));
        setCurrentTime(toHHMMSS(audioWaveForm.current.getCurrentTime()));
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [audioWaveForm]);

  useEffect(() => {
    setIsPlaying(false);
  }, [audio]);

  useEffect(() => {
    if (dGTranscript) {
      if (audioWaveForm) {
        audioWaveForm.current.on("ready", function () {
          setAudioLength(toHHMMSS(audioWaveForm.current.getDuration()));
        });
        audioWaveForm.current.on("finish", function () {
          setIsPlaying(false);
        });
      }
    }
  }, [dGTranscript]);

  const playAudio = () => {
    if (audioWaveForm.current.isPlaying()) {
      setIsPlaying(false);
      audioWaveForm.current.pause();
    } else {
      setIsPlaying(true);
      audioWaveForm.current.play();
    }
  };

  return (
    <div className=" grid w-auto items-center text-center">
      <h2 className={styles.time}>
        {audio ? `${currentTime}/${audioLength}`:"00:00"}
      </h2>
      <h3 className={styles.title}>
        {audio ? audio.name : "No audio file selected"}
      </h3>
      <div className={styles.player}>
        {/* <img
          className={styles.ff}
          src="icons/fast-backward.png"
          onClick={() => {
            audioWaveForm.current.skipBackward(10);
          }}
          alt="ff-icon"
        /> */}
        <img
          className={styles.play}
          onClick={playAudio}
          src={isPlaying ? "icons/pause.png" : "icons/play.png"}
          alt="play-button"
        />
        {/* <img
          className={styles.ff}
          src="icons/fast-forward.png"
          onClick={() => {
            audioWaveForm.current.skipForward(10);

            setAudioLength(toHHMMSS(audioWaveForm.current.getDuration()));

            audioWaveForm.current.on("audioprocess", function () {
              setCurrentTime(toHHMMSS(audioWaveForm.current.getCurrentTime()));
            });
          }}
          alt="ff-icon"
        /> */}
      </div>
    </div>
  );
};

export default Player;
