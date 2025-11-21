'use client';

import useAcnhRadio from '@/hooks/useAcnhRadio';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { CloudRain, CloudSnow, Pause, Play, Sun } from 'react-feather';

export default function Home() {
  const {
    audioRef,
    handleAudio,
    isPlaying,
    handleChangeWeather,
    weather,
    actualHour,
    nextHour,
    actualMinute,
  } = useAcnhRadio();

  return (
    <div className="w-full h-full flex flex-col gap-20 items-center justify-center bg-black/30 p-4">
      <h1
        className="text-2xl md:text-4xl font-medium text-white text-center"
        aria-label="Animal Crossing: New Horizons Radio"
      >
        <Image
          src="/acnh-logo.webp"
          alt="Animal Crossing: New Horizons Radio Logo"
          width={300}
          height={100}
          aria-hidden
        />
        <span aria-hidden>Radio</span>
      </h1>

      <div className="flex flex-col gap-10">
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleAudio}
            className="w-12 h-12 flex items-center justify-center rounded-md bg-[#bcdec8] md:hover:bg-[#bcdec8]transition cursor-pointer"
          >
            {isPlaying ? <Pause color="white" /> : <Play color="white" />}
          </button>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={() => handleChangeWeather('sunny')}
            className="w-12 h-12 flex items-center justify-center rounded-md bg-yellow-600 md:hover:bg-yellow-700 transition cursor-pointer weather-button"
            data-isactive={weather === 'sunny'}
          >
            <Sun color="white" />
          </button>
          <button
            onClick={() => handleChangeWeather('rainy')}
            className="w-12 h-12 flex items-center justify-center rounded-md bg-blue-600 md:hover:bg-blue-700 transition cursor-pointer weather-button"
            data-isactive={weather === 'rainy'}
          >
            <CloudRain color="white" />
          </button>
          <button
            onClick={() => handleChangeWeather('snowy')}
            className="w-12 h-12 flex items-center justify-center rounded-md bg-white md:hover:bg-gray-200 transition cursor-pointer weather-button"
            data-isactive={weather === 'snowy'}
          >
            <CloudSnow color="black" />
          </button>
        </div>
      </div>

      <div
        className="progress"
        style={
          {
            '--progress': `${(actualMinute / 60) * 100}%`,
          } as CSSProperties
        }
      >
        <p className="text-white font-bold relative z-10">{actualHour}</p>
        <p className="text-white font-bold relative z-10">{nextHour}</p>
      </div>

      <audio ref={audioRef} loop />
    </div>
  );
}
