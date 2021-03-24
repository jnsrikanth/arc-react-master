import React from "react"
import CountUp from 'react-countup';
import { CounterPropType, COUNTMODE } from "../counter/interfaces/counter_props_type";

export const Counter = (props: CounterPropType) => {

    const { num, title, suffix, mode } = props
    
    return <>
    <ul>
        <CountUp
            start={0}
            end={num}
            duration={2.75}
            delay={0}
        >
       
            {({ countUpRef }) => (
            
                <li className="bg-drk-tbl">
                    <div className="row">
                        <div className="col-7"><span className={`num ${COUNTMODE[mode]} count`} ref={countUpRef} /><span className={`num ${COUNTMODE[mode]} count`} style={{ fontSize: '16px' }}>{suffix}</span></div>
                        <div className="col-5 text-center"><span className="tex">{title}</span></div>
                    </div>
                </li>
                
            )}
            
        </CountUp>
        </ul>
    </>
    
}
