import { useState, useActionState } from "react";
import React from "react";
import { awaitTransitionEvent } from "./events/awaitTransitionEvent";

export interface CarouselProps {
  children: React.ReactNode;

}
interface CarouselState {
  currentIndex: number;

}

interface CarouselAction {
  type: "NEXT" | "PREV"
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


  function getSlideFromIndex(index: number): HTMLElement {
    const slide = document.getElementById(`carousel-slide-${index}`);
    if (!slide) {
      throw new Error(`Slide with index ${index} not found`);
    }
    return slide;
  }
  function placeOffscreen(el: HTMLElement, direction: 'left' | 'right') {
    el.style.transition = 'none'; // instant
    el.style.transform = direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
    el.style.willChange = 'transform';
    el.offsetHeight;
  }

  function animateIn(el: HTMLElement, durationMs = 500) {
  // enable transition, then set transform -> 0
  el.style.transition = `transform ${durationMs}ms ease-in-out`;
  requestAnimationFrame(() => {
    // second RAF ensures the browser saw the transition style before changing transform
    requestAnimationFrame(() => {
      el.style.transform = 'translateX(0)';
    });
  });
}

  async function animateOut(el: HTMLElement, direction: 'left' | 'right', durationMs = 500): Promise<void> {
  el.style.transition = `transform ${durationMs}ms ease-in-out`;
  el.style.transform = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
  await awaitTransitionEvent(el, durationMs);
}

  async function transitionSlides(firstSlide: HTMLElement, secondSlide: HTMLElement, direction: "left" | "right"): Promise<void> {
    placeOffscreen(secondSlide, direction);
    await Promise.all([
      animateOut(firstSlide, direction),
      animateIn(secondSlide),
    ]);

  }


  function carouselReducer(state: CarouselState, action: CarouselAction):CarouselState {
    if (isPending) {
      return state;
    }
    switch (action.type) {
      case "NEXT":


      default:
        return state;
    }

  }


  const[currentState, setCurrentState, isPending] = useActionState(carouselReducer, {
    currentIndex: 0,
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
