/// <reference types="react" />
import * as React from 'react';
export default function <M>(Wrapped: React.ComponentClass<M> | React.SFC<M>): React.ComponentClass<{
    model: M;
}>;
