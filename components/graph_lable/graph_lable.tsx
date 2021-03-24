import React from "react";
import { GraphLablePropType } from "./interface/graph_lable_prop_type";

import styles from './GraphLable.module.css'

export const GraphLable = (props: GraphLablePropType) => {
    const { color, title } = props
    return <div className={styles.graphLableContainer}>
        <div className={styles.lableIcon} style={{ backgroundColor: color }} />
        <div className={styles.graphLableText}>{title}</div>
    </div>
}
