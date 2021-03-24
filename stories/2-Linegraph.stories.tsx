import React from 'react';
import { LineGraph } from '../components/graphs/line_graph';
import line_graph_data from '../utils/images/mocks/line_graph_data';

export default {
  title: 'Line graph',
  component: LineGraph
};

export const LineGraphExample = () => <div style={{ marginLeft: 20 }}> <LineGraph
  height={600}
  width={800}
  data={line_graph_data}
/> </div>;

