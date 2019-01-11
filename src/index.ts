import * as React from "react";
import { findKey, getComponentBounds, mapValues, throttle } from "./utils";

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

  public sectionsRefs: ISectionRefs<T> = mapValues(
    () => React.createRef<HTMLDivElement>(),
    this.props.elements
  );

  public handleFindActiveElement = throttle(100, () => {
    const html = document.documentElement;
    const windowHeight = window.innerHeight || html!.clientHeight;

    const rects = mapValues((sectionsRef: React.RefObject<HTMLDivElement>) => {
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

  public goTo = (scrollTo: keyof T | number) => {
    // exit if element doesn't exist
    if (scrollTo === "string" && !this.sectionsRefs[scrollTo].current) {
      return;
    }

    const scrollToPosition =
      typeof scrollTo === "number"
        ? scrollTo
        : this.sectionsRefs[scrollTo].current!.offsetTop;

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth"
    });
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
