import React from 'react';
import { BarGraph } from '../components/graphs/bar_graph';
import bar_graph_data from '../utils/images/mocks/bar_graph_data';

export default {
  title: 'Bar graph',
  component: BarGraph
};

export const BarGraphExample = () => <div style={{ marginLeft: 20 }}> <BarGraph
  height={400}
  width={200}
  data={bar_graph_data} /> </div>;

