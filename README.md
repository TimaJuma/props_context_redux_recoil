# Getting Started with Create React App

## this is the playground to demonstrate the state management with react using

- useState
- useContext
- Redux
- Recoil

#### 1. First App uses `useState` as default state management:

The state is lifted on the App level to have the state shared across the components. So `movies`, `like` & `dislike` functions are passed as props.
this approach leads to extra rerender as on App-level to use `useState` that causes rerender

#### 2. `useState` + using composition

Composition is a component model where we build components from other components using explicitly defined props or the implicit children prop to avoid props drilling.
we use the medium component as a Wrapper (`MovieBox`) and render the child between the middle component
[as a reference, I used Michael Jackson's video](https://www.youtube.com/watch?v=3XaXKiXtNjw)
it doesn't solve rerender of the **wrapper** component since the state is shared on the `App` level between `Nav` & `MovieBox.`

#### 3. `Context + Immer`

another method to pass the global state without props drilling is to use `Context.`
According to Sophie Alpert's [tweet](https://twitter.com/sophiebits/status/1228942768543686656), the Component Right Under Context Provider probably should be memoized with `React.memo`. Alternative to this statement also comes the composition pattern, which helps avoid unnecessary rerender of the component under `Context Provider`.
My favorite pattern is Kent C. Dodds [article](https://kentcdodds.com/blog/how-to-use-react-context-effectively) making `Custom Provider Component` and utilize custom hooks. It allows returning the state and useStatevalue in components that will use them.

```
function useValue() {
const context = React.useContext(SomeContext)
if (context === undefined) {
throw new Error('useValue must be used within a SomeProvider')
}
return context
}
```

#### 3. `Context + Immer`

Redux is a hammer. When you start using hammer everything feels like nails.
Not everything needs redux.
People say that redux needs too much boiletplate.
