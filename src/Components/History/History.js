import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const HistoryPage =(props)=>{
    return (
        <div style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
        }}>
           dshjfvfhjdsvjhfdhjvjdhvjh
        </div>
    );
};
const History = withRouter(connect()(HistoryPage));

export default History;
