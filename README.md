# Getting Started with Create React App

## this is the playground to demonstrate the state management with react using

- useState
- useContext
- Redux
- Recoil

#### 1. First App uses `useState` as default state management:

to share the state, it is lifted on App level. So `movies`, `like` & `dislike` functions are passed as props.
this approach leads to extra rerender as on App level to use `useState` that causes re-render

#### 2. `useState` + using composition

composition is used to avoid props drilling where the component does not use props but just passes them down.
basically, we just use medium component as wrapper (`MovieBox`) and render child between the middle component
[as a reference I used Michael Jackson's video](https://www.youtube.com/watch?v=3XaXKiXtNjw)
it doesn't solve rerender of the **wrapper** component, since the state is shared on `App` level between `Nav` & `MovieBox`
