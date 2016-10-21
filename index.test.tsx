import * as browserEnv from 'browser-env'
browserEnv()

import test from 'ava'
import { mount } from 'enzyme'
import * as React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import component from '.'

class Model {
  @observable x: number = 0
  @computed get y() { return this.x + 1 }
}

test('baseline: mobx-react wrapped props are observable', t => {
  const Component = observer<{ model: Model }>(({ model }) =>
    <label>x={model.x}, y={model.y}</label>
  )
  const model = new Model()
  const wrapper = mount(<Component model={model} />)
  t.is('x=0, y=1', wrapper.find('label').text())
  model.x++
  t.is('x=1, y=2', wrapper.find('label').text())
})

test('baseline: mobx-react unwrapped props are not observable', t => {
  const Component = observer<Model>(model =>
    <label>x={model.x}</label>
  )
  const model = new Model()
  const wrapper = mount(<Component {...model} />)
  t.is('x=0', wrapper.find('label').text())
  model.x++
  // The update has no effect
  t.is('x=0', wrapper.find('label').text())
})

test('baseline: mobx-react unwrapped computed props don\'t show up', t => {
  const Component = observer<Model>(model =>
    <label>y={model.y}</label>
  )
  const model = new Model()
  const wrapper = mount(<Component {...model} />)
  t.is('y=', wrapper.find('label').text())
})

test('mobx-component unwrapped props are observable', t => {
  const Component = component<Model>(model =>
    <label>x={model.x}</label>
  )
  const model = new Model()
  const wrapper = mount(<Component model={model} />)
  t.is('x=0', wrapper.find('label').text())
  model.x++
  t.is('x=1', wrapper.find('label').text())
})

test('mobx-component compound components', t => {
  const Component = component<Model>(model =>
    <label>y={model.y}</label>
  )
  const model = new Model()
  const wrapper = mount(<Component model={model} />)
  t.is('y=1', wrapper.find('label').text())
  model.x++
  t.is('y=2', wrapper.find('label').text())
})
