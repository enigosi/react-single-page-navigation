import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import Component from "../index";
import {
  createGetTimeFaker,
  getFakeBoundingClientRectResult,
  getLastCallFirstArg
} from "./test-helpers";

export const DEFAULT_TEST_ELEMENT_HEIGHT = 700;
const DEFAULT_WINDOW_HEIGHT = 1000;

configure({ adapter: new Adapter() });

const RealDate = Date;
const OriginalInnerHeight = (global as any).innerHeight;

beforeEach(() => {
  createGetTimeFaker();
  (global as any).innerHeight = DEFAULT_WINDOW_HEIGHT;
});

afterEach(() => {
  global.Date = RealDate;
  (global as any).innerHeight = OriginalInnerHeight;
});

/**
 *  Component with mocked getBoundingClientRect and offsetTop
 */
class TestChildren extends React.Component<{
  getBoundingClientRect?: () => object;
  offsetTop?: number;
}> {
  public static defaultProps = {
    getBoundingClientRect: () => ({}),
    offsetTop: 0
  };
  public getBoundingClientRect = this.props.getBoundingClientRect;
  public offsetTop = this.props.offsetTop;
  public render() {
    return this.props.children;
  }
}

describe("Component", () => {
  test("component should render without errors", () => {
    const wrapper = mount(<Component elements={{}}>{() => null}</Component>);
    expect(wrapper.html()).toBe(null);
  });

  test("component should correctly show active element", () => {
    const fakeGetBoundingClientRectEl1 = jest
      .fn()
      .mockReturnValueOnce(getFakeBoundingClientRectResult(0, 0))
      .mockReturnValueOnce(getFakeBoundingClientRectResult(0, 700));

    const fakeGetBoundingClientRectEl2 = jest
      .fn()
      .mockReturnValueOnce(getFakeBoundingClientRectResult(1, 0))
      .mockReturnValueOnce(getFakeBoundingClientRectResult(1, 700));

    const children = jest.fn(({ refs }) => (
      <div>
        <TestChildren
          getBoundingClientRect={fakeGetBoundingClientRectEl1}
          ref={refs.EL1}
        >
          1
        </TestChildren>
        <TestChildren
          getBoundingClientRect={fakeGetBoundingClientRectEl2}
          ref={refs.EL2}
        >
          2
        </TestChildren>
      </div>
    ));

    const wrapper = mount(
      <Component elements={{ EL1: {}, EL2: {} }}>{children}</Component>
    );

    const instance: any = wrapper.instance();

    expect(getLastCallFirstArg(children).activeElement).toBe("EL1");

    instance.handleFindActiveElement();

    expect(getLastCallFirstArg(children).activeElement).toBe("EL2");
  });

  test("element should be active when it takes more than 50% of the view", () => {
    const fakeGetBoundingClientRectEl1 = jest
      .fn()
      .mockReturnValueOnce(getFakeBoundingClientRectResult(0, 199))
      .mockReturnValueOnce(getFakeBoundingClientRectResult(0, 201));

    const fakeGetBoundingClientRectEl2 = jest
      .fn()
      .mockReturnValueOnce(getFakeBoundingClientRectResult(1, 199))
      .mockReturnValueOnce(getFakeBoundingClientRectResult(1, 201));

    const children = jest.fn(({ refs }) => (
      <div>
        <TestChildren
          getBoundingClientRect={fakeGetBoundingClientRectEl1}
          ref={refs.EL1}
        >
          1
        </TestChildren>
        <TestChildren
          getBoundingClientRect={fakeGetBoundingClientRectEl2}
          ref={refs.EL2}
        >
          2
        </TestChildren>
      </div>
    ));

    const wrapper = mount(
      <Component elements={{ EL1: {}, EL2: {} }}>{children}</Component>
    );

    const instance: any = wrapper.instance();

    expect(getLastCallFirstArg(children).activeElement).toBe("EL1");

    instance.handleFindActiveElement();

    expect(getLastCallFirstArg(children).activeElement).toBe("EL2");
  });

  test("element should pass working goTo function as a param", () => {
    // we will be looking if window.scrollTo was called with right parameters
    const spy = jest
      .spyOn(global as any, "scrollTo")
      .mockImplementation(() => undefined);

    const children = jest.fn(({ refs }) => (
      <div>
        <TestChildren offsetTop={0} ref={refs.EL1}>
          1
        </TestChildren>
        <TestChildren offsetTop={DEFAULT_TEST_ELEMENT_HEIGHT} ref={refs.EL2}>
          2
        </TestChildren>
      </div>
    ));

    const wrapper = mount(
      <Component elements={{ EL1: {}, EL2: {} }}>{children}</Component>
    );

    const { goTo } = getLastCallFirstArg(children);

    expect(goTo).toBeDefined();

    goTo("EL2");

    const lastCall = getLastCallFirstArg(spy);

    expect(lastCall.behavior).toBe("smooth");
    expect(lastCall.top).toBe(DEFAULT_TEST_ELEMENT_HEIGHT);

    spy.mockRestore();
  });
});
