import * as React from 'react'
import { observer } from 'mobx-react'

export default function<M>(render: React.StatelessComponent<M>) {
  return observer<{ model: M }>(({ model }) => render(model))
}
