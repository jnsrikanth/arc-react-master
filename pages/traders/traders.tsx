import React, { useState } from 'react';

import { Navigator } from '../../components/navigator';
import VideoStats from '../../components/video-stats/video_status';
import { connect } from "react-redux";
import Search from '../../components/search/search';


export const Traders = (props) => {
  const [selected, setSelected] = useState('1')
  return <div className="d-flex flex-fill">
    <Navigator onSelectTabOption={(value) => setSelected(value)} selected={selected} />
    <div id="main" className='d-flex flex'>
      <div className="d-flex flex-column col-md-3 overflow-hidden  left-panel">
        <Search />
      </div>
      <div className="col-md-9 d-flex flex-column overflow-auto">
        <VideoStats />
      </div>
    </div>
  </div>
}

export default connect(state => ({
    authToken: state.auth.token,
    authData: state.auth.authData,
    isPickleAvailable: state.auth.isPickleAvailable
}))(Traders)