# Controllers

Useful, generally speaking.

## ReducerController

```ts
function countReducer(state, action: CountAction) {
  switch (action.type) {
    case 'reset':
      return 0;
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
  }
}

@customElement('count-er')
class Host extends ReactiveElement {
  public count = new ReducerController(this, countReducer, 0);
}
```
```ts
host.count.dispatch({ type: 'increment' });
console.log(host.count.state) // 1
host.count.dispatch({ type: 'reset' });
console.log(host.count.state) // 0
host.count.dispatch({ type: 'decrement' });
console.log(host.count.state) // -1
```
