<h1 align="center">
   Lightweight React Single Page Navigation
</h1>
React dependency free render prop single page scroll navigation component. Build for GatsbyJS/NextJS, but will work in standard react apps as well.

### Features
* ☁️Lightweight (~2kB)
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

**`elements` (required) object**: Object with name of tracked sections as `keys` and config object as `values`. Object has to be complete during mounting of the component - as for now there is no support for dynamic elements 
```typescript
interface IElements {
  [elementName: string]: object;
}
```
example:
```js
const config = {}; no config available yet // TODO
const elements = { EL1Name: config, EL2Name: config };
<ScrollNavigation elements={elements}>
```


**`shouldEnableHistory?` (optional)** boolean (default `undefined`):
Set to true to modify history when navigating to element (enable back button);  
```typescript
shouldEnableHistory?: boolean
```


**`shouldModifyUrl?`** boolean (default `undefined`):
Set to true to modify url when navigating to element (add http://yoururl.com/#ElementName)  
`shouldEnableHistory` has to be set to true as well for it to work;
```typescript
shouldModifyUrl?: boolean
```


**`offset?`** number (default `undefined`):
Scrolltop offset in pixels, useful for fixed navbars
```typescript
offset?: number
```


#### Render prop props

**`refs`**: 
Object with same keys as `elements` and `createRef` as values. **All refs have to be created.**
```typescript
{
  [key in keyof IElements]: React.RefObject<>
}
```


**`goTo`**:
function that takes as argument element key or number. When called it will initiate scroll transition to given element or to given scroll position. You can modify scroll position additionally to global offset with section offset with third parameter `offset`. To go to top use `goTo(0)`, to go to top plus 100px use `goto(0, "smooth", 100)`, to go to `EL2Name` use `goTo("EL2Name")`
```typescript
(scrollTo: keyof IElements | number, behaviour:  "auto" | "instant" | "smooth" = "smooth", offset?: number) => void
```


**`activeElement`**:
Key of element that is active in the current scroll position (takes at least 50% of the view).
```typescript
keyof IElements
```
