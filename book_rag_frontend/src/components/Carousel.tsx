import { useState } from "react";
import React from "react";

export interface CarouselProps {
  children: React.ReactNode;

}

export const Carousel = (props: CarouselProps) => {
  const slides = React.Children.toArray(props.children);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-[90vw] h-screen overflow-hidden">
      {slides.map((child, index) => (
        <div key={index} className={`absolute inset-0 w-full h-full ${index === currentIndex ? "block" : "hidden"}`}>
          {child}
        </div>
      ))}
    </div>
  );
}
