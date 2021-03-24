import React from "react";
import { TradersList } from "../traders_list/TradersList";
import { traders } from "../../utils/images/mocks/traders_mock_data";

export const SearchInput = (props) => {
    return (
        <div className={`position-relative ${props.className}`}>
            <input onChange={props.onChange} type="text" className="form-control" placeholder={props.placeholder} style={{paddingLeft:40}} value={props.value} />
            <span style={{ position: "absolute", display: "inline-block", width: "20px", height: "20px", color: "#6f6f76", top: 'calc(50% - 10px)', left: 15 }}><i className="fa fa-search"></i></span>
        </div>
    )
}

export const Search = (props) => {
  return <TradersList traders={traders} />
}
export default Search;