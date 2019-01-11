<h1 align="center">
   Lightweight React Single Page Navigation
</h1>
React dependency free render prop single page scroll navigation component. Build for GatsbyJS/NextJS, but will work in standard react apps as well.

### Features
* ☁️Lightweight (~1kB)
* 🎉 Dependency Free
* 💪 Written in TypeScript
* 🔥Render props

### Installation
```
npm install react-single-page-navigation --save #npm
yarn add react-single-page-navigation #yarn
```

### Example
[Example](https://enigosi.github.io/react-single-page-navigation/)

### Usage
```js
import ScrollNavigation from 'react-single-page-navigation';

const App = () => (
  <ScrollNavigation elements={{ TopOfThePage: {}, BottomOfThePage: {} }}>
    {({ refs, activeElement, goTo }) => (
      <div>
        <div ref={refs.TopOfThePage} onClick={() => goTo('BottomOfThePage')}>
          Top Element {activeElement === 'TopOfThePage' && 'is active!'}
        </div>
        <div ref={refs.BottomOfThePage} onClick={() => goTo('TopOfThePage')}>
          Bottom Element {activeElement === 'BottomOfThePage' && 'is active!'}
        </div>
      </div>
    )}
  </ScrollNavigation>
);
```

### Props

#### Componenet props
**`elements`**: Object with name of tracked sections as `keys` and config object as `values`.
```js
const config = {};
const elements = { EL1Name: config, EL2Name: config };
<ScrollNavigation elements={elements}>
```
**`element.config`**: no config available yet //TODO

#### Render prop props
**`refs`**: Object with same keys as `elements` and `createRef` as values. Component needs refs set properly to work.  
**`goTo`**: function that takes as argument element key or number. When called will initaite scroll transition to given element or to given scroll position. To go to top use `goTo(0)`, to go to `EL2Name` use `goTo("EL2Name")`
**`activeElement`**: Key of element that is active in the current scroll position (takes at least 50% of the view).