export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;

    case RenderPosition.AFTER:
      container.after(component.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parent = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElement = !!(parent && newElement && oldElement);

  if (isExistElement) {
    parent.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.removeElement();
};
