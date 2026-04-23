export function awaitTransitionEvent(element: HTMLElement, transitionHandler: ()=>void): Promise<void> {
  return new Promise((resolve) => {
    element.addEventListener('transitionend', () => {
      console.log('Transition event received for:', element.id);
      resolve();
    }, {once: true}); // this will ensure the event listener is removed after it is called once
    transitionHandler();
  })
};
