import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectColor } from "../gameSlice";
import styles from "./Canvas.module.css";

export interface Coordinate {
  x: number;
  y: number;
}

const Canvas = () => {
  const color = useAppSelector(selectColor);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePos, setMousePos] = useState<Coordinate | undefined>(undefined);
  const [isPaint, setIsPaint] = useState(false);

  const getCoordinate = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (befMousePos: Coordinate, affMousePos: Coordinate) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineJoin = "round";
      ctx.lineWidth = 5;

      ctx.beginPath();
      ctx.moveTo(befMousePos.x, befMousePos.y);
      ctx.lineTo(affMousePos.x, affMousePos.y);
      ctx.closePath();

      ctx.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinate = getCoordinate(event);
    if (coordinate) {
      setIsPaint(true);
      setMousePos(coordinate);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPaint) {
        const newMousePos = getCoordinate(event);
        if (mousePos && newMousePos) {
          drawLine(mousePos, newMousePos);
          setMousePos(newMousePos);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPaint, mousePos]
  );

  const exitPaint = useCallback(() => {
    setIsPaint(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaint, paint, exitPaint]);
  return (
    <div>
      <canvas
        width={800}
        height={600}
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  );
};

export default Canvas;
