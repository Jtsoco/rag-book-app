import { useState, useActionState } from "react";
import React from "react";
import { awaitTransitionEvent } from "./events/awaitTransitionEvent";
import { startTransition } from "react";

export interface CarouselProps {
  children: React.ReactNode;
  height?: string;
  width?: string;

}


interface CarouselAction {
  type: "NEXT" | "PREV"
}

export const Carousel = (props: CarouselProps) => {
  const slides = React.Children.toArray(props.children);
  const height = props.height || "h-screen";
  const width = props.width || "w-[90vw]";

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
    el.classList.remove('hidden');
    el.style.transition = 'none'; // instant
    el.style.transform = direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
    el.style.willChange = 'transform';
    el.offsetHeight; // makes sure initial animation is applied before we do the next transition
  }

  async function animateIn(el: HTMLElement, durationMs = 500): Promise<void> {
  // enable transition, then set transform -> 0
  const transition = `transform ${durationMs}ms ease-in-out`;
  const transform = 'translateX(0)';


  const transitionHandler = makeTransitionHandler(el, transition, transform);
  await awaitTransitionEvent(el, transitionHandler);
}

  function makeTransitionHandler(el: HTMLElement, transition: string, transform: string) {
    return () => {
      el.style.transition = transition;
      el.style.transform = transform;
    }

  }




  async function animateOut(el: HTMLElement, direction: 'left' | 'right', durationMs = 500): Promise<void> {
    const transition = `transform ${durationMs}ms ease-in-out`;
    const transform = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
    const transitionHandler = makeTransitionHandler(el, transition, transform);
    await awaitTransitionEvent(el, transitionHandler);

  }

  async function transitionSlides(firstSlide: HTMLElement, secondSlide: HTMLElement, direction: "left" | "right"): Promise<void> {
    placeOffscreen(secondSlide, direction);
    await Promise.all([
      animateOut(firstSlide, direction),
      animateIn(secondSlide),
    ]);
    console.log('Both animations complete');
    // firstSlide.style.display = 'none';

  }


  async function goToSlide(dir: "left" | "right"): Promise<number> {
    const nextIndex = getNextIndex(dir);
    const currentSlide = getSlideFromIndex(currentIndex);
    const nextSlide = getSlideFromIndex(nextIndex);
    await transitionSlides(currentSlide, nextSlide, dir)
    console.log(`Transition to slide ${nextIndex} complete`);
    return nextIndex;
  }


  async function carouselReducerAction(state: number, action: CarouselAction): Promise<number> {
    if (isPending) {
      return state;
    }
    let nextState: number;
    switch (action.type) {
      case "NEXT":
        nextState = await goToSlide('right');
        return nextState
      case "PREV":
        nextState = await goToSlide('left');
        return nextState


      default:
        nextState = state;
        return nextState;
    }

  }


  const[currentIndex, setCurrentIndex, isPending] = useActionState(carouselReducerAction, 0);
  function handleClick(action: CarouselAction) {
    startTransition(() => {
      setCurrentIndex(action);
    })
  }

  return (
    <div className={"relative overflow-hidden" + " " + height + " " + width}>
      {slides.map((child, index) => (
        <div key={index} id={`carousel-slide-${index}`} className={`absolute inset-0 w-full h-full ${index === currentIndex ? "block" : "hidden"}`}>
          {child}
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
        <button
          className="pointer-events-auto bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
          onClick={() => handleClick({type: "PREV"})}
        >
          &#8592;
        </button>
        <button
          className="pointer-events-auto bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
          onClick={() => handleClick({type: "NEXT"})}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
