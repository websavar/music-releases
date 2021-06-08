import React, { useState, useEffect } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import './index.scss';

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

const Pagination = (props) => {
    const [currentPage, setCurentPage] = useState(1);
    const totalRecords = Math.min(10000, props.totalRecords);
    const pageNeighbours = Math.max(0, Math.min(props.pageNeighbours, 2));
    const totalPages = Math.ceil(totalRecords / props.pageLimit);

    const gotoPage = page => {
        const currentPage = Math.max(0, Math.min(page, totalPages));

        const paginationData = {
            currentPage,
            totalPages: totalPages,
            pageLimit: props.pageLimit,
            totalRecords: totalRecords
        };

        setCurentPage(currentPage);
        return props.onPageChanged(paginationData)
    };

    useEffect(() => {
        gotoPage(props.currentPage);
        // eslint-disable-next-line
    }, [props.currentPage]);

    const handleClick = (page, evt) => {
        evt.preventDefault();
        gotoPage(page);
    };

    const handleMoveLeft = evt => {
        evt.preventDefault();
        gotoPage(currentPage - pageNeighbours * 2 - 1);
    };

    const handleMoveRight = evt => {
        evt.preventDefault();
        gotoPage(currentPage + pageNeighbours * 2 + 1);
    };

    const fetchPageNumbers = () => {
        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            let pages = [];

            const leftBound = currentPage - pageNeighbours;
            const rightBound = currentPage + pageNeighbours;
            const beforeLastPage = totalPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

            pages = range(startPage, endPage);

            const pagesCount = pages.length;
            const singleSpillOffset = totalNumbers - pagesCount - 1;

            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;

            const leftSpillPage = LEFT_PAGE;
            const rightSpillPage = RIGHT_PAGE;

            if (leftSpill && !rightSpill) {
                const extraPages = range(
                    startPage - singleSpillOffset,
                    startPage - 1
                );
                pages = [leftSpillPage, ...extraPages, ...pages];
            } else if (!leftSpill && rightSpill) {
                const extraPages = range(
                    endPage + 1,
                    endPage + singleSpillOffset
                );
                pages = [...pages, ...extraPages, rightSpillPage];
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage];
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    if (!totalRecords) return null;

    if (totalPages === 1) return null;

    const pages = fetchPageNumbers();

    return (
        <>
            <nav aria-label="Pagination" className="col-12 col-sm-10 col-md-8">
                <ul className="pagination">
                    {pages.map((page, index) => {
                        if (page === LEFT_PAGE)
                            return (
                                <li key={index} className="page-item">
                                    <Link to="#"
                                        className="page-link"
                                        aria-label="Previous"
                                        onClick={handleMoveLeft}
                                    >
                                        <span aria-hidden="true"><i className="fas fa-angle-double-left"></i></span>
                                        <span className="sr-only">Previous</span>
                                    </Link>
                                </li>
                            );

                        if (page === RIGHT_PAGE)
                            return (
                                <li key={index} className="page-item">
                                    <Link to="#"
                                        className="page-link"
                                        aria-label="Next"
                                        onClick={handleMoveRight}
                                    >
                                        <span aria-hidden="true"><i className="fas fa-angle-double-right"></i></span>
                                        <span className="sr-only">Next</span>
                                    </Link>
                                </li>
                            );

                        return (
                            <li
                                key={index}
                                className={`page-item${currentPage === page ? " active" : ""}`}
                            >
                                <Link to="#"
                                    className="page-link"
                                    onClick={e => handleClick(page, e)}
                                >
                                    {page}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );

}

export default Pagination;
