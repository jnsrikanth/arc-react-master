import React from 'react';
import { CocentricGraph } from '../components/graphs/cocentric_graph/cocentric_graph';

export default {
    title: 'Cocentric graph',
    component: CocentricGraph
};

export const CocentricGraphExample = () => {

    return <CocentricGraph
        height={400}
        width={200}
    />
}