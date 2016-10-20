# mobx-component

[![Build Status](https://img.shields.io/travis/pelotom/mobx-component/master.svg)](https://travis-ci.org/pelotom/mobx-component)
[![Dependency Status](https://img.shields.io/david/pelotom/mobx-component.svg)](https://david-dm.org/pelotom/mobx-component)
[![devDependency Status](https://img.shields.io/david/dev/pelotom/mobx-component.svg)](https://david-dm.org/pelotom/mobx-component?type=dev)

## Installation
```
$ npm install --save mobx-component
```

## What's all this now?

[MobX with React](https://github.com/mobxjs/mobx-react) is awesome, but it tends to push you towards having just a single prop per React component, because [the top-level props cannot be `@observable`](https://github.com/mobxjs/mobx-react/issues/124). For example suppose you're making a dumb component which shows the sum of 3 numbers at all times. The straightforward thing to do is to make those numbers themselves props, like so:

```ts
interface XYZ {
  x: number
  y: number
  z: number
}

@observer
export default class Adder extends React.Component<XYZ, void> {
  render() {
    const { x, y, z } = this.props
    return (
      <span>
        x + y + z = {x + y + z}
      </span>
    )
  }
}
```

Then you might want to make a MobX model that holds the 3 numbers and maybe defines some relationship between them like so:

```ts
class XYZModel implements XYZ {
  @observable x: number = 3
  @observable y: number = 9
  @computed get z() { return this.x * this.y }
}

const xyz = new XYZModel()
ReactDOM.render(<Adder {...xyz} />, document.getElementById('root'))
```

Unfortunately this won't work; the `x`, `y` and `z` values get copied out of the model, and the component won't be re-rendered when they change. The standard boilerplate solution is to use a single prop which holds the entire model:

```ts
@observer
export default class Adder extends React.Component<{ xyz: XYZ }, void> {
  render() {
    const { x, y, z } = this.props.xyz
    return (
      <span>
        x + y + z = {x + y + z}
      </span>
    )
  }
}
```

Then use like so:

```ts
ReactDOM.render(<Adder xyz={xyzModel} />, document.getElementById('root'))
```

This package saves you that bit of boilerplate so you can write your component as you would have originally:

```ts
import mobxComponent from 'mobx-component'

// Note that we don't need to use @observer here any more
class Adder extends React.Component<XYZ, void> {
  render() {
    const { x, y, z } = this.props
    return (
      <span>
        x + y + z = {x + y + z}
      </span>
    )
  }
}

export default mobxComponent(Adder)
```

Even better, you can wrap a stateless component that does the same thing:

```ts
export default mobxComponent<XYZ>(({ x, y, z}) => (
  <span>
    x + y + z = {x + y + z}
  </span>
)
```

Then use it like so:

```ts
ReactDOM.render(<Adder model={xyz} />, document.getElementById('root'))
```
