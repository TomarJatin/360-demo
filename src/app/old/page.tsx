"use client";
import CanvasVideo2 from "@/components/CanvasVideo2";
import ChatImage from "@/components/ChatImage";

export default function Home() {
  return (
    <div id="main">
      <div id="canvas-card">
        <CanvasVideo2 />
        <ChatImage />
      </div>
    </div>
  );
}
