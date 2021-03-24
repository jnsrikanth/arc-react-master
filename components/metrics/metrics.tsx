import React from "react";
import { useCountUp } from 'react-countup';

const SimpleCountUp = ({ count, className, countUpProps = {} }) => {
    const { countUp } = useCountUp({ ...countUpProps, end: count, duration: 2.75, useEasing: true });
    return <span className={className}>{countUp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
}

export const Metrics = (props) => {
    return <div className="left-panel" style={{background:'none', zIndex: 0}}>
            <div className="search search-form">
                <div className="header-right">
                    <ul className="navbar-nav">
                        <li className="nav-item search-form">
                            <div className="row">
                                <div className="col-md-12">
                                    <>
                                        <h1 className="" style={{fontSize:'48px', color: '#fff', marginLeft:'12px'}}>Metrics</h1>

                                        <ul style={{ width:'400px', marginLeft: '15px' }}>
                                            <li className="bg-drk-tbl">
                                                <div className="row">
                                                    <div className="p-0 text-center  ico-f">
                                                    <img src="assets/media/image/metric-avatar.png" className="img-fluid" alt="" />  
                                                    </div>
                                                    <div className="col pr-0">
                                                        <span className="num  count pink">
                                                            <SimpleCountUp className='num-2' count={761} />
                                                            <span className="num count" style={{ fontSize: '18px'}}>/<SimpleCountUp className='num' count={1000} /></span>
                                                        </span>
                                                        <span className="tex" style={{marginTop:'0px', color:'#fff', display:'block', textAlign:'left'}}>ARC supervised employees</span>
                                                        
                                                    </div>
                                                    
                                                 </div>
                                            </li>
                                            <li className="bg-drk-tbl">
                                                <div className="row">
                                                    <div className="p-0 text-center  ico-f">
                                                    <img src="assets/media/image/metric-eye.png" className="img-fluid" alt="" />  
                                                    </div>
                                                    <div className="col pr-0">
                                                        <span className="num  count pink"><SimpleCountUp className='num-2' count={4111} /></span>
                                                        <span className="tex" style={{marginTop:'0px', color:'#fff', display:'block', textAlign:'left'}}>ARC supervised meetings</span>
                                                        
                                                    </div>
                                                    
                                                 </div>
                                            </li>
                                            <li className="bg-drk-tbl">
                                                <div className="row">
                                                    <div className="p-0 text-center  ico-f">
                                                    <img src="assets/media/image/metric-chat.png" className="img-fluid" alt="" />  
                                                    </div>
                                                    <div className="col pr-0">
                                                        <span className="num  count gry"><SimpleCountUp className='num-2' count={7.1} countUpProps={{
                                                            decimals: 1
                                                        }} /></span>
                                                        <span className="tex" style={{marginTop:'0px', color:'#fff', display:'block', textAlign:'left'}}>Avg. meetings per day</span>
                                                        
                                                    </div>
                                                    
                                                 </div>
                                            </li>
                                            <li className="bg-drk-tbl">
                                                <div className="row">
                                                    <div className="p-0 text-center  ico-f">
                                                    <img src="assets/media/image/metric-timer.png" className="img-fluid" alt="" />  
                                                    </div>
                                                    <div className="col pr-0">
                                                        <span className="num count gry"><SimpleCountUp className='num-2' count={48} /><span style={{fontSize:'18px'}}>min</span></span>
                                                        <span className="tex" style={{marginTop:'0px', color:'#fff', display:'block', textAlign:'left'}}>Avg. meeting duration</span>
                                                        
                                                    </div>
                                                    
                                                 </div>
                                            </li>
                                            <li className="bg-drk-tbl">
                                                <div className="row">
                                                    <div className="p-0 text-center ico-f">
                                                    <img src="assets/media/image/metric-star.png" className="img-fluid" alt="" />  
                                                    </div>
                                                    <div className="col pr-0">
                                                        <span className="num re count "><SimpleCountUp className='num-2' count={57} /></span>
                                                        <span className="tex" style={{marginTop:'0px', color:'#fff', display:'block', textAlign:'left'}}>Frequent flyer</span>
                                                        
                                                    </div>
                                                    
                                                 </div>
                                            </li>
                                        </ul>

                                       {/*} <Counter num={avProcessed} title={"Total AV File Processed"} mode={COUNTMODE["text-primary"]} suffix={""} />
                                        <Counter num={avUsable} title={"Total Usable AV"} mode={COUNTMODE["text-secondary"]} suffix={""} />
                                        <Counter num={noAvPresent} title={"No AV Present"} mode={COUNTMODE["text-warning"]} suffix={"%"} />
                                        <Counter num={lowAv} title={"Low Quality AV"} mode={COUNTMODE["text-danger"]} suffix={"%"} />
<Counter num={usableAv} title={"UsableAV"} mode={COUNTMODE["text-success"]} suffix={"%"} /> */}
                                    </>
                                </div>
                            </div>
                        </li>

                    </ul>


                </div>
            </div>
        </div>
}
export default Metrics;