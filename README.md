# Getting Started with Create React App

## this is the playground to demonstrate the state management with react using

- useState
- useContext
- Redux
- Recoil

#### 1. First App uses `useState` as default state managment:

to share the state, it is lifted on App level. So `movies`, `like` & `dislike` funtion are passed as props.
this approach leads to extra rerender as on App level to use `useState` that causes re-render
