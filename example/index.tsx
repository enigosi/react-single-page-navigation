import * as React from "react";
import { render } from "react-dom";
import AnchorNav from "../src";

export const elements = {
  EL1: {},
  EL2: {},
  EL3: {},
  EL4: {}
};

// NOTE don't style this way in the production apps
const styles: {
  [key: string]: React.CSSProperties;
} = {
  container: {
    display: "flex",
    flexDirection: "row"
  },
  colNav: {
    width: 300,
    background: "#BEE9E8"
  },
  menu: {
    position: "fixed",
    top: 0,
    padding: 20
  },
  menuLink: {
    cursor: "pointer",
    padding: "5px 0",
    transition: "all .2s ease-out"
  },
  menuLinkActive: {
    cursor: "pointer",
    fontWeight: "bold",
    padding: "5px 20px",
    transition: "all .2s ease-out"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  section: {
    width: "100%",
    height: "70vh"
  }
};

const App = () => (
  <AnchorNav elements={elements}>
    {({ refs, activeElement, goTo }) => (
      <div style={styles.container}>
        <div style={styles.colNav}>
          <div style={styles.menu}>
            <div
              style={
                activeElement === "EL1"
                  ? styles.menuLinkActive
                  : styles.menuLink
              }
              onClick={() => goTo("EL1")}
            >
              ONE
            </div>
            <div
              style={
                activeElement === "EL2"
                  ? styles.menuLinkActive
                  : styles.menuLink
              }
              onClick={() => goTo("EL2")}
            >
              TWO
            </div>
            <div
              style={
                activeElement === "EL3"
                  ? styles.menuLinkActive
                  : styles.menuLink
              }
              onClick={() => goTo("EL3")}
            >
              THREE
            </div>
            <div
              style={
                activeElement === "EL4"
                  ? styles.menuLinkActive
                  : styles.menuLink
              }
              onClick={() => goTo("EL4")}
            >
              FOUR
            </div>
          </div>
        </div>
        <div style={styles.content}>
          <div
            ref={refs.EL1}
            style={{ ...styles.section, background: "#62B6CB" }}
          />
          <div
            ref={refs.EL2}
            style={{ ...styles.section, background: "#1B4965" }}
          />
          <div
            ref={refs.EL3}
            style={{ ...styles.section, background: "#62B6CB" }}
          />
          <div
            ref={refs.EL4}
            style={{ ...styles.section, background: "#1B4965" }}
          />
        </div>
      </div>
    )}
  </AnchorNav>
);

render(<App />, document.getElementById("root"));
