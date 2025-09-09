import React, { useRef, useState } from "react";
import ReactSkinview3d from "react-skinview3d";
import { WalkingAnimation } from "skinview3d";
import { Pause, Play, Camera } from "lucide-react";
import style from './style.module.css';

export default function Skin({ properties }: any) {
  const viewerRef = useRef<any>(null);
  const [paused, setPaused] = useState(true);
  
  const photo = async () => {
  if (!viewerRef.current) return;
  const canvas = viewerRef.current.canvas;
  canvas.toBlob(async (blob:any) => {
    try {
      const item = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([item]);
    } catch (err) {
      console.error("Failed to write to clipboard:", err);
    }
  }, "image/png");
};

  const togglePause = () => {
    if (viewerRef.current?.animation) {
      viewerRef.current.animation.paused = !paused;
      setPaused(!paused);
    }
  };

  return (
    <>
    <div>
      <ReactSkinview3d
        skinUrl={properties.textures.SKIN.url}
        capeUrl={properties.textures?.CAPE?.url}
        options={{ears: {textureType: "standalone", source: ""}, preserveDrawingBuffer: true}}
        width="256"
        height="256"
        onReady={({ viewer }) => {
          viewer.animation = new WalkingAnimation();
          viewer.animation.speed = 0.45;
          viewer.animation.paused = paused;
          viewer.zoom = 0.65;
          viewerRef.current = viewer;
        }}
      />
    </div>
    <div className={style.skinButtons}>
        <Camera onClick={photo} className={style.skinButton} />
      {paused ? (
        <Play onClick={togglePause} className={style.skinButton} />
      ) : (
        <Pause onClick={togglePause} className={style.skinButton} />
      )}
      </div>
      </>
  );
}
