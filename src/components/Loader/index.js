import React from "react";
import "./index.scss";

const Loader = (props) => {
    return (
        <div className={`row justify-content-center loading-${props.type}`}>
            <span></span>
        </div>
    );
};

export default Loader;
