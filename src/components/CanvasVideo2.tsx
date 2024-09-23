import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvasVideo2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", resizeCanvas);

    const frameCount = 399;
    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 1 };

    for (let i = 0; i < 199; i++) {
      const img = new Image();
      img.src = files(i);
      images.push(img);
    }

    const ctl = gsap.timeline({
      scrollTrigger: {
        scrub: 0.15,
        trigger: `#canvas-card>canvas`,
        start: `top top`,
        end: `300% top`,
        scroller: `body`,
      },
    });

    ctl
      .to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        onUpdate: render,
      })
      .to(canvas, {
        transform: "scale(.2)",
        opacity: 0,
        top: "11%",
        left: "-2.3%",
        width: "88%",
      });

    images[1].onload = render;

    function render() {
      scaleImage(images[imageSeq.frame], context!);
    }

    ScrollTrigger.create({
      trigger: "#canvas-card",
      pin: true,
      scroller: `body`,
      start: `top top`,
      end: `200% top`,
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

function files(index: number): string {
  const paddedIndex = (index + 1).toString().padStart(3, '0');
  return `./space/ezgif-frame-${paddedIndex}.jpg`;
}


function scaleImage(img: HTMLImageElement, ctx: CanvasRenderingContext2D) {
  if(!img) return;
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

export default CanvasVideo2;
