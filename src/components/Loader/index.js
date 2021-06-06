import React from "react";
import "./index.scss";

const Loader = (props) => {
    if (props.type === 'dots')
        return (
            <div className="loading-dots">
                <div className="dot1"></div>
                <div className="dot2"></div>
                <div className="dot3"></div>
            </div>
        );

    return (
        <div className={`row justify-content-center loading-${props.type}`}>
            <span></span>
        </div>
    );
};

export default Loader;
