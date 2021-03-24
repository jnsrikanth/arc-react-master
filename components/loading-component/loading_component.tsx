import React from "react";
import { connect } from "react-redux";
import BarLoader from "react-spinners/BarLoader";




export const LoadingComponent = (props: any) => {
    const { loading } = props

    return <>
        {loading ?
            <div style={{ position:'fixed',height:"10%",width:"100%", top: 0, margin: "auto", zIndex: 999 }}>
                <BarLoader
                    color={"#EF4A81"}
                    height={7}
                    width={"100%"}
                    loading={loading}
                />
            </div>


            : null}
    </>
}

export default connect((state) => ({
    loading: state.global.loading
}))(LoadingComponent)