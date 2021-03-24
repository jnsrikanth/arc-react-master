import React from 'react';

const UnsupportedBrowser = (props) => {
    return <div style={{ textAlign: 'center', padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',flex: 1,height:'100%' }}>
        <p style={{fontSize:22}}>For the best experience, please use desktop Chrome browser.</p>
    </div>
}

export default UnsupportedBrowser;