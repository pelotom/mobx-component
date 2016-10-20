import test from 'ava'
import * as React from 'react'

import wrap from '.'

test('stateless', t => {
  wrap(({ firstName, lastName }) => <h2>{firstName} {lastName}</h2>)
})
