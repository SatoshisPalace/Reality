import { AoWallet } from "@/features/ao/lib/aoWallet";
import { Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { VolumeX, Volume2 } from "lucide-react";
import { WaitlistSkip } from "./WaitlistSkip";

interface WaitlistScreenProps {
  wallet: AoWallet;
  onEnter: () => void;
}

export function WaitlistScreen({ wallet, onEnter }: WaitlistScreenProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicPlaying, setMusicPlaying] = useState(true);
  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }
    if (musicPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [musicPlaying]);

  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }
    audioRef.current.volume = 0.5;
  }, []);

  return (
    <>
      <div className="w-[100%] h-[100%] flex flex-col items-center justify-center bg-indigo-950/80 text-white/90 overflow-hidden">
        <video
          src="assets/SPIntro.mp4"
          className=" object-cover opacity-15 fixed top-0 left-0 right-0 bottom-0 w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full bg-cover"
          autoPlay
          muted
          loop
        />
        <div className="absolute top-2 right-2 z-20 text-right">
          <Button
            className=""
            onClick={() => setMusicPlaying(!musicPlaying)}
            variant={"ghost"}
          >
            {musicPlaying ? <Volume2 /> : <VolumeX />}
          </Button>
        </div>
        <div className="z-20 h-[380px] flex flex-col items-center justify-start gap-1">
          <img
            src="assets/branding/SPLogo.png"
            height={140}
            width={140}
          ></img>
          <img src="assets/branding/RuneRealm_Logo.png" width={450}></img>
        </div>
        <Suspense
          fallback={
            <div className="flex flex-col justify-center h-72 min-h-44">
              <p>Loading...</p>
            </div>
          }
        >
          <WaitlistSkip onEnter={onEnter} />
        </Suspense>
        <div className="h-[10%]" />
      </div>
      <audio
        ref={audioRef}
        className="hidden"
        src="assets/serenade.webm"
        loop
      />
    </>
  );
}
