import { useState, useReducer } from "react";
import React from "react";

export interface CarouselProps {
  children: React.ReactNode;

}
interface CarouselState {
  currentIndex: number;
  animating: boolean;
  nextIndex: number | null;
  direction: "left" | "right" | null;
}

interface CarouselAction {
  type: "NEXT" | "PREV" | "ANIMATION_END";
}

export const Carousel = (props: CarouselProps) => {
  const slides = React.Children.toArray(props.children);

  const [currentIndex, setCurrentIndex] = useState(0);

  function getNextIndex(direction: "left" | "right"): number {
    if (direction === "left") {
      return (currentIndex - 1 + slides.length) % slides.length;
    } else {
      return (currentIndex + 1) % slides.length;
    }
  }


  function carouselReducer(state: CarouselState, action: CarouselAction):CarouselState {
    switch (action.type) {
      case "NEXT":
        return {
          ...state,
          animating: true,
          nextIndex: getNextIndex("right"),
          direction: "right",
        };
      case "PREV":
        return {
          ...state,
          animating: true,
          nextIndex: getNextIndex("left"),
          direction: "left",
        };
      case "ANIMATION_END":
        if (state.nextIndex === null) {
          return {...state};
          // should never happen
        }
        return {
          ...state,
          animating: false,
          currentIndex: state.nextIndex,
          nextIndex: null,
          direction: null,
        };
      default:
        return state;
    }

  }


  const[currentState, setCurrentState] = useReducer(carouselReducer, {
    currentIndex: 0,
    animating: false,
    nextIndex: null,
    direction: null,
  });

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
