import React, { useState, useEffect, Suspense } from "react";

import gate from '../../gate';
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import PaginationControl from "../../components/Pagination/PaginationControl";

const MusicRelease = React.lazy(() => import('../../components/MusicRelease'));

const Home = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(50);
    const [searchQuery, setSearchQuery] = useState('*');
    const [loading, setLoading] = useState(true);

    const fetchData = async (query, currentPage = 1, pageLimit) => {
        const discogsList = await gate.fetchDicogs(query, currentPage, pageLimit);

        setData(discogsList);
        setCurentPage(currentPage);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const pageLimitHandler = (pageLimit) => {
        let getCurrentPage = currentPage;
        const lastPage = Math.ceil(Math.min(10000, data.pagination.items) / pageLimit);
        if (currentPage > lastPage) getCurrentPage = lastPage;

        setPageLimit(pageLimit);
        fetchData(searchQuery, getCurrentPage, pageLimit);
    }

    const searchClicked = (val) => {
        setSearchQuery(val);
        setCurentPage(1);
        fetchData(val, 1);
    }

    const paginationHandler = (p) => {
        fetchData(searchQuery, p.currentPage, p.pageLimit);
    }

    if (loading) return <Loader type="spinner" />;

    return (
        <main>
            <div className="container">
                <div className="row">
                    <Search getSearchValue={searchClicked} items={data?.results} />
                </div>
                {data?.results ?
                    <>
                        <div className="d-flex flex-row mb-3 mt-2 pb-2 pt-2 align-items-center justify-content-between border-bottom border-top pagination-container">
                            <Pagination
                                totalRecords={data.pagination.items}
                                pageLimit={pageLimit}
                                pageNeighbours={1}
                                currentPage={currentPage}
                                onPageChanged={paginationHandler}
                            />
                            <PaginationControl onPageLimitChange={pageLimitHandler} defaultValue={data.pagination.per_page} />
                        </div>

                        <div className="row">
                            {data.results.length === 0 ? <p>Nothing found! Please try a different search</p> :
                                data.results.map((item) => {
                                    return (
                                        <Suspense fallback={<Loader type="gradient" />} key={item.id}>
                                            <MusicRelease item={item} />
                                        </Suspense>
                                    )
                                })
                            }
                        </div>

                        <div className="d-flex flex-row mb-3 mt-2 pb-2 pt-2 align-items-center justify-content-between border-top pagination-container">
                            <Pagination
                                totalRecords={data.pagination?.items}
                                pageLimit={pageLimit}
                                pageNeighbours={1}
                                currentPage={currentPage}
                                onPageChanged={paginationHandler}
                            />
                            <PaginationControl onPageLimitChange={pageLimitHandler} defaultValue={pageLimit} />
                        </div>
                    </>
                    : <p className="d-flex justify-content-center">Request failed!</p>
                }
            </div>
        </main >
    );
}

export default Home;
