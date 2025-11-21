import { Weather } from '@/utils/types';
import { useRef, useEffect, useState, useCallback } from 'react';
import useCurrentHour from './useCurrentHour';

const songBasePath = '/songs';

export default function useAcnhRadio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentHour, actualHour, nextHour, actualMinute } = useCurrentHour();

  console.log('Current Hour:', currentHour);

  const [weather, setWeather] = useState<Weather>('sunny');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlay = useCallback(
    (currentTime?: number) => {
      if (audioRef.current) {
        if (isPlaying) handleStop();

        console.log(audioRef.current.currentTime);

        if (currentTime) {
          audioRef.current.currentTime = currentTime;
        }

        audioRef.current.play();
        setIsPlaying(true);
      }
    },
    [isPlaying]
  );

  const handleAudio = () => {
    if (isPlaying) {
      handleStop();
      return;
    }

    handlePlay();
  };

  const handleChangeWeather = (newWeather: Weather) => {
    const currentAudioTime = audioRef.current?.currentTime || 0;

    setWeather(newWeather);
    setTimeout(() => {
      handlePlay(currentAudioTime);
    }, 100);
  };

  useEffect(() => {
    if (audioRef.current && weather && currentHour) {
      audioRef.current.src = `${songBasePath}/${weather}/${currentHour}.mp3`;
    }
  }, [weather, currentHour]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying, currentHour]);

  return {
    audioRef,
    handlePlay,
    handleStop,
    handleChangeWeather,
    isPlaying,
    handleAudio,
    weather,
    actualHour,
    nextHour,
    actualMinute,
  };
}
