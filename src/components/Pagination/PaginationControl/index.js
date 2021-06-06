import React from "react";
import "./index.scss";

const PaginationControl = (props) => {
    const pageLimitClicked = (e) => {
        return props.onPageLimitChange(e.target.value)
    }

    return (
        <div className="col-12 col-sm-2 col-md-4 pagination_control">
            <label htmlFor="limit_bottom">Show &nbsp;</label>
            <select
                id="limit_bottom"
                name="limit"
                onChange={pageLimitClicked}
                defaultValue={props.defaultValue}
            >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>

            <noscript><button type="submit">Refresh</button></noscript>
        </div>
    );
};

export default PaginationControl;