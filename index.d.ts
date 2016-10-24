/// <reference types="react" />
import * as React from 'react';
export default function wrapComponent<M>(component: React.StatelessComponent<M>): React.ComponentClass<{
    model: M;
}>;
export declare function createElement<M>(component: React.StatelessComponent<M>, model: M, ...children: React.ReactNode[]): React.ComponentElement<{
    model: M;
} & {
    children?: {} | undefined;
}, React.Component<{
    model: M;
}, React.ComponentState>>;
export declare const _cache: Map<React.StatelessComponent<any>, React.ComponentClass<any>>;
