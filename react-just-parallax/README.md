<p align="center">
  <img src="https://res.cloudinary.com/dpv0ukspz/image/upload/v1657904071/rjp-logo_ov5fwk.png" width="106" height="106" alt="React Just Parallax" />
</p>
<h1 align="center">React Just Parallax</h1>
<h3 align="center">
  React library for scroll and mousemove parallax effect ✨<br>Open source, production-ready
</h3>

<br>

React Just Parallax is an open source, production-ready library that's designed for all creative developers and more.

### 🐇 Quick start

```
npm install react-just-parallax
```

```jsx
import { MouseParallax, ScrollParallax } from "react-just-parallax";

export const MyComponent = () => (
  <>
    <MouseParallax>
      <p>I'm reacting to mouse move</p>
    </MouseParallax>

    <ScrollParallax>
      <p>I'm reacting to scroll</p>
    </ScrollParallax>
  </>
);
```

### 📦 NPM Link

- [Link to official NPM page](https://www.npmjs.com/package/react-just-parallax/).

### 📜 Docs

- Check out [our documentation and examples](https://react-just-parallax.michalzalobny.com/) for guides and a full API reference.

### ⚖️ License

- React Just Parallax is MIT licensed.

### ✍🏻 Author

- [@michalzalobny](https://twitter.com/michalzalobny)

### Props for MouseParallax

| Name                   | Type                           | Default | Description                                                                                                                                              |
| ---------------------- | ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| strength               | number                         | 0.2     | enParallax offset multiplier. Moving mouse by 10 pixels will move element position by 10px \* strength                                                   |
| lerpEase               | number                         | 0.06    | Determines how quick the interpolation between offset values occurs (the higher the quicker)                                                             |
| isAbsolutelyPositioned | boolean                        | false   | If the element you want to use parallax on is positioned absolutely, set this prop to `true`                                                             |
| zIndex                 | number \| null                 | null    | Specify element's outer container z-index (useful while using `isAbsolutelyPositioned` prop)                                                             |
| shouldPause            | boolean                        | true    | Stops element from reacting to scroll and interpolating offset if it is out of view                                                                      |
| enableOnTouchDevice    | boolean                        | false   | Turns on/off parallax effect on touch devices                                                                                                            |
| scrollContainerRef     | React.MutableRefObject \| null | null    | Use when element is situated in scrollable element other than window                                                                                     |
| parallaxContainerRef   | React.MutableRefObject \| null | null    | By default, element reacts to mousemove on window. You can specify any other container using this prop to make element react only within given container |
| shouldResetPosition    | boolean                        | false   | Resets element's position if cursor leaves window or leaves `parallaxContainerRef`                                                                       |

### Props for ScrollParallax

| Name                   | Type                           | Default | Description                                                                                       |
| ---------------------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------- |
| strength               | number                         | 0.2     | Parallax offset multiplier. Scrolling by 10 pixels will move element position by 10px \* strength |
| lerpEase               | number                         | 0.06    | Determines how quick the interpolation between offset values occurs (the higher the quicker)      |
| isAbsolutelyPositioned | boolean                        | false   | If the element you want to use parallax on is positioned absolutely, set this prop to `true`      |
| zIndex                 | number \| null                 | null    | Specify element's outer container z-index (useful while using `isAbsolutelyPositioned` prop)      |
| shouldPause            | boolean                        | true    | Stops element from reacting to scroll and interpolating offset if it is out of view               |
| enableOnTouchDevice    | boolean                        | true    | Turns on/off parallax effect on touch devices                                                     |
| isHorizontal           | boolean                        | false   | Enable if using horizontal scrolling                                                              |
| scrollContainerRef     | React.MutableRefObject \| null | null    | Use when element is situated in scrollable element other than window                              |
