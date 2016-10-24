import * as React from 'react'
import { observer } from 'mobx-react'

// Option 1: wrap when creating the component
export default function wrapComponent<M>(component: React.StatelessComponent<M>): React.ComponentClass<{ model: M }> {
  const cached = _cache.get(component)
  if (cached)
    return cached

  const wrapped = observer<{ model: M }>(({ model }) => component(model))
  _cache.set(component, wrapped)
  return wrapped
}

// Option 2: wrap when creating elements, leaves leaf components "pure"
export function createElement<M>(component: React.StatelessComponent<M>, model: M, ...children: React.ReactNode[]) {
  return React.createElement(wrapComponent(component), { model }, children)
}

// Private; exported only for testing
export const _cache = new Map<React.StatelessComponent<any>, React.ComponentClass<any>>()
