function awaitTransition(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    element.addEventListener('transitioned', () => {
      resolve();
    }, {once: true}); // this will ensure the event listener is removed after it is called once
  })
};
