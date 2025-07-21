import { useEffect, useRef } from "react";

interface GeometricPatternProps {
  className?: string;
  variant?: "dots" | "lines" | "hexagons";
}

export function GeometricPattern({ 
  className, 
  variant = "dots" 
}: GeometricPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (variant === "dots") {
        drawDotPattern();
      } else if (variant === "lines") {
        drawLinePattern();
      } else if (variant === "hexagons") {
        drawHexagonPattern();
      }
    };

    const drawDotPattern = () => {
      const spacing = 40;
      const dotSize = 1;
      
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const opacity = 0.1 + Math.sin(x * 0.01 + Date.now() * 0.001) * 0.05;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = `hsl(180, 70%, 60%)`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    };

    const drawLinePattern = () => {
      const spacing = 60;
      const time = Date.now() * 0.001;
      
      ctx.strokeStyle = `hsl(180, 70%, 60%)`;
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.save();
        ctx.globalAlpha = 0.05 + Math.sin(x * 0.01 + time) * 0.02;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        ctx.restore();
      }
      
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.save();
        ctx.globalAlpha = 0.05 + Math.sin(y * 0.01 + time) * 0.02;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawHexagonPattern = () => {
      const size = 20;
      const spacing = size * 1.7;
      
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing * 0.9) {
          const offsetX = (y / (spacing * 0.9)) % 2 === 0 ? 0 : spacing / 2;
          drawHexagon(x + offsetX, y, size);
        }
      }
    };

    const drawHexagon = (x: number, y: number, size: number) => {
      const opacity = 0.03 + Math.sin(x * 0.01 + y * 0.01 + Date.now() * 0.001) * 0.02;
      
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `hsl(180, 70%, 60%)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const pointX = x + size * Math.cos(angle);
        const pointY = y + size * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      drawPattern();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: "transparent" }}
    />
  );
}