import * as browserEnv from 'browser-env'
browserEnv()

import test from 'ava'
import { mount } from 'enzyme'
import * as React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import createComponent, { createElement, _cache as cache } from '.'

class Model {
  @observable x: number = 0
  @computed get y() { return this.x + 1 }
}

test.beforeEach(t => {
  cache.clear()
})

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
  const Component = createComponent<Model>(model =>
    <label>x={model.x}</label>
  )
  const model = new Model()
  const wrapper = mount(<Component model={model} />)
  t.is('x=0', wrapper.find('label').text())
  model.x++
  t.is('x=1', wrapper.find('label').text())
})

test('mobx-component unwrapped computed props are preserved', t => {
  t.is(0, cache.size)

  const Component = createComponent<Model>(model =>
    <label>y={model.y}</label>
  )
  const model = new Model()
  const wrapper = mount(<Component model={model} />)
  t.is('y=1', wrapper.find('label').text())
  model.x++
  t.is('y=2', wrapper.find('label').text())
})

test('createElement', t => {
  const Component = (model: Model) => <label>x={model.x}, y={model.y}</label>
  const model = new Model()

  t.is(0, cache.size)
  const elem = createElement(Component, model)
  t.is(1, cache.size)

  const wrapper = mount(elem)

  t.is('x=0, y=1', wrapper.find('label').text())
  model.x++
  t.is('x=1, y=2', wrapper.find('label').text())
})

test('caching createComponent', t => {
  const Component = () => <div />

  t.is(0, cache.size)
  t.is(undefined, cache.get(Component))

  // First creation; component wrapper gets cached
  createElement(Component, {})
  t.is(1, cache.size)
  const cached = cache.get(Component)
  t.not(undefined, cached)

  // Second creation of same component; wrapper gets reused
  createElement(Component, {})
  t.is(1, cache.size)
  const cached2 = cache.get(Component)
  t.is(cached, cached2)

  // Creating an element for a new component; gets cached separately
  createElement(() => <div />, {})
  t.is(2, cache.size)
  t.not(undefined, cached)
})

test('caching createElement', t => {
  const Component = () => <div />

  t.is(0, cache.size)
  t.is(undefined, cache.get(Component))

  // First creation; component wrapper gets cached
  const wrapped = createComponent(Component)
  t.is(1, cache.size)
  t.is(wrapped, cache.get(Component))

  // Second creation of same component; wrapper gets reused
  const wrapped2 = createComponent(Component)
  t.is(1, cache.size)
  t.is(wrapped, wrapped2)

  // Creating an element for a new component; gets cached separately
  const Component2 = () => <div />
  const wrapped3 = createComponent(Component2)
  t.is(2, cache.size)
  t.is(wrapped3, cache.get(Component2))
})
