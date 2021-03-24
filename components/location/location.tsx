import React from "react";
import { LocationPropType } from "./interfaces/location_prop_type";

export const Location = (props: LocationPropType) => {
    const { title, regionList, onSelectFx } = props

    return <>
        <h6>{title}</h6>
        {regionList.map(r => <a href="#" className={`fx-list ${r.color}`} onClick={() => { onSelectFx(title, r.text) }}>{r.text}</a>)}
    </>
};