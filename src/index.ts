import * as React from "react";
import { findKey, getComponentBounds, mapValues, throttle } from "./utils";

export type ISectionRefs<T> = {
  [key in keyof T]: React.RefObject<HTMLDivElement>
};

export interface IElements {
  [elementName: string]: object;
}

export interface IProps<T> {
  children: (
    Props: {
      activeElement?: keyof T;
      refs: ISectionRefs<T>;
      goTo: (elementKey: keyof T) => void;
    }
  ) => JSX.Element | null;
  elements: T;
  shouldEnableHistory?: boolean;
  shouldModifyUrl?: boolean;
  offset?: number;
}

export interface IState<T> {
  activeElement?: keyof T;
}

class IndexPage<T extends IElements> extends React.Component<
  IProps<T>,
  IState<T>
> {
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

    const elementInViewBoundaries = mapValues(
      getComponentBounds(windowHeight),
      rects
    );

    const elementInViewHeight = mapValues(
      bounds => bounds.bottom - bounds.top,
      elementInViewBoundaries
    );

    const maxHeight = Math.max(...Object.values<number>(elementInViewHeight));
    const mostInTheViewElementKey = findKey(maxHeight, elementInViewHeight);

    if (this.state.activeElement !== mostInTheViewElementKey) {
      this.setState({ activeElement: mostInTheViewElementKey });
    }
  });

  public componentDidMount() {
    this.attachListener();
    this.handleFindActiveElement();

    const elementFromHash = window.location.hash.replace("#", "");
    if (Object.keys(this.sectionsRefs).includes(elementFromHash)) {
      this.goTo(elementFromHash as keyof T);
    }
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

  public goTo = (
    scrollTo: keyof T | number,
    behavior: ScrollToOptions["behavior"] = "smooth",
    offset?: number
  ) => {
    // exit if element doesn't exist
    if (scrollTo === "string" && !this.sectionsRefs[scrollTo].current) {
      return;
    }

    let scrollToPosition =
      typeof scrollTo === "number"
        ? scrollTo
        : this.sectionsRefs[scrollTo].current!.offsetTop;

    if (this.props.offset) {
      scrollToPosition += this.props.offset;
    }

    if (offset) {
      scrollToPosition += offset;
    }

    window.scrollTo({
      top: scrollToPosition,
      behavior
    });

    if (this.props.shouldEnableHistory && typeof scrollTo === "string") {
      const modifyHistoryMethod = this.props.shouldModifyUrl
        ? window.history.pushState
        : window.history.replaceState;

      modifyHistoryMethod(undefined, "", `#${scrollTo}`);
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
