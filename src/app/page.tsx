"use client";
import CanvasVideo from "@/components/CanvasVideo";
import ChatImage from "@/components/ChatImage";

export default function Home() {
  return (
    <div id="main">
      <div id="canvas-card">
        <CanvasVideo />
        <ChatImage />
      </div>
    </div>
  );
}
