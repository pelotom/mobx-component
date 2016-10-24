import * as React from 'react'
import { observer } from 'mobx-react'
import cache from './cache'

// Option 1: wrap when creating the component
export default function wrapComponent<M>(component: React.StatelessComponent<M>) {
  const cached = cache.get(component)
  if (cached)
    return cached

  const wrapped = observer<{ model: M }>(({ model }) => component(model))
  cache.set(component, wrapped)
  return wrapped
}

// Option 2: wrap when creating elements, leaves leaf components "pure"
export function createElement<M>(component: React.StatelessComponent<M>, model: M, ...children: React.ReactNode[]) {
  return React.createElement(wrapComponent(component), { model }, children)
}
