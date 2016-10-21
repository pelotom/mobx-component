# mobx-component

[![Build Status](https://img.shields.io/travis/pelotom/mobx-component/master.svg)](https://travis-ci.org/pelotom/mobx-component)
[![Dependency Status](https://img.shields.io/david/pelotom/mobx-component.svg)](https://david-dm.org/pelotom/mobx-component)
[![devDependency Status](https://img.shields.io/david/dev/pelotom/mobx-component.svg)](https://david-dm.org/pelotom/mobx-component?type=dev)

## Installation
```
$ npm install --save mobx-component
```

## What's all this now?

[MobX with React](https://github.com/mobxjs/mobx-react) is awesome, but it tends to push you towards having just a single prop per React component, because the top-level props cannot be `@observable`. For example suppose you have this model:

```ts
import { observable, computed } from 'mobx'

class XYZ {
  @observable x: number = 3
  @observable y: number = 9
  @computed get z() { return this.x * this.y }
}
```

You want to render it with a [stateless function component](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) which just takes `x` `y` and `z` props and renders them:

```ts
import * as React from 'react
import { observer } from 'mobx-react'

const Adder = observer<XYZ>(({ x, y, z }) => <span>{x} + {y} + {z} = {x + y + z}</span>)
```

Unfortunately this won't work; the properties get copied over and lose their "observability" before the render function is called by React. So instead you have to write it something like:

```ts
const Adder = observer<{ xyz: XYZ }>(({ xyz: { x, y, z }) => <span>{x} + {y} + {z} = {x + y + z}</span>)
```

Not quite as nice. Using this `mobx-component` you can write it the first way:

```ts
import { component } from 'mobx-component'

const Adder = component<XYZ>(({ x, y, z }) => <span>x + y + z = {x + y + z}</span>)
```

The resulting `Adder` component has a single prop `model: XYZ`, so you would use it like so:

```ts
import { render } from 'react-dom'

const xyz = new XYZ()

ReactDOM.render(<Adder model={xyz} />)
// renders: <span>3 + 9 + 27 = 39</span>

xyz.x = 4
// renders: <span>4 + 9 + 36 = 49</span>
```
