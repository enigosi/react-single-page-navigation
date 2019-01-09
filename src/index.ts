import * as React from "react";
import { findKey, mapValues, throttle } from "./utils";

export type ISectionRefs<T> = {
  [key in keyof T]: React.RefObject<HTMLDivElement>
};

export interface IProps<T> {
  children: (
    Props: {
      activeElement?: keyof T;
      refs: ISectionRefs<T>;
      goTo: (elementKey: keyof T) => void;
    }
  ) => JSX.Element | null;
  elements: T;
}
export interface IState<T> {
  activeElement?: keyof T;
}

class IndexPage<T> extends React.Component<IProps<T>, IState<T>> {
  public state: IState<T> = {};
  public chuj: string = "dupa";
  public sectionsRefs: ISectionRefs<T> = mapValues(
    () => React.createRef<HTMLDivElement>(),
    this.props.elements
  );

  public handleFindActiveElement = throttle(100, () => {
    const html = document.documentElement;
    const scrollTop = document.documentElement!.scrollTop;

    const windowHeight = window.innerHeight || html!.clientHeight;

    const rects = mapValues((sectionsRef: React.RefObject<HTMLDivElement>) => {
      // HACK
      if (sectionsRef.current) {
        return sectionsRef.current.getBoundingClientRect() as DOMRect;
      }
    }, this.sectionsRefs);

    const boundaries = mapValues(getComponentBounds(windowHeight), rects);

    const sizes = mapValues(bounds => bounds.bottom - bounds.top, boundaries);

    const maxSize = Math.max(...Object.values<number>(sizes));
    const mostInTheViewElementKey = findKey(maxSize, sizes);

    if (this.state.activeElement !== mostInTheViewElementKey) {
      this.setState({ activeElement: mostInTheViewElementKey });
    }
  });

  public componentDidMount() {
    this.attachListener();
    this.handleFindActiveElement();
  }

  public componentWillUnmount() {
    this.removeListener();
  }

  public attachListener() {
    window.addEventListener("scroll", this.handleFindActiveElement);
    window.addEventListener("resize", this.handleFindActiveElement);
  }

  public removeListener() {
    window.removeEventListener("scroll", this.handleFindActiveElement);
    window.removeEventListener("resize", this.handleFindActiveElement);
  }

  public goTo = (elementKey: keyof T) => {
    const current = this.sectionsRefs[elementKey].current;

    if (current) {
      window.scrollTo({
        top: current.offsetTop,
        behavior: "smooth"
      });
    }
  };

  public render() {
    return this.props.children({
      activeElement: this.state.activeElement,
      refs: this.sectionsRefs,
      goTo: this.goTo
    });
  }
}

export default IndexPage;

const getComponentBounds = (windowHeight: number) => (rect: DOMRect) => {
  // ELEMENT PRE TOP SCREEN EDGE
  // when top of the element is below top of the screen and above bottom of the screen
  if (rect.top >= 0 && rect.top <= windowHeight) {
    return {
      top: rect.top,
      // bottom equals bottom of the element or bottom of the screen
      bottom: Math.min(rect.bottom, windowHeight)
    };
  }
  // ELEMENT PAST TOP SCREEN EDGE
  // when top of element is above top screen edge but bottom of the element is still inside
  if (rect.top <= 0 && rect.top + rect.height >= 0) {
    return {
      top: 0,
      bottom: Math.min(rect.top + rect.height, windowHeight)
    };
  }
  // outside of the screen
  return { top: -1, bottom: -1 };
};
