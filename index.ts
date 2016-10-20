import * as React from 'react'
import { observer } from 'mobx-react'

export default function<M>(Wrapped: React.ComponentClass<M> | React.SFC<M>) {

  @observer
  class MobxWrapper extends React.Component<{ model: M }, void> {
    render() {
      return React.createElement(Wrapped, this.props.model)
    }
  }

  return MobxWrapper as React.ComponentClass<{ model: M }>
}
