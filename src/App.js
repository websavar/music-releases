import React, { useState, useEffect, Suspense } from "react";

import gate from './gate';
import './App.scss';
import Loader from "./components/Loader";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import PaginationControl from "./components/Pagination/PaginationControl";

const MusicRelease = React.lazy(() => import('./components/MusicRelease'));

function App() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(50);
    const [searchQuery, setSearchQuery] = useState('*');
    const [loading, setLoading] = useState(true);

    const fetchData = async (query, currentPage = 1, pageLimit) => {
        const discogsList = await gate.fetchDicogs(query, currentPage, pageLimit);
        await setData(discogsList?.results);
        await setPagination(discogsList?.pagination);
        setCurentPage(currentPage);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const pageLimitHandler = (pageLimit) => {
        setPageLimit(pageLimit);
        fetchData(searchQuery, currentPage, pageLimit);
    }

    const searchClicked = async (val) => {
        await setSearchQuery(val);
        setCurentPage(1);
        fetchData(val, 1);
    }

    const pageHandler = (p) => {
        fetchData(searchQuery, p.currentPage, p.pageLimit);
    }

    if (loading) return <Loader type="spinner" />;
    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <Search getSearchValue={searchClicked} items={data} />
                </div>

                <div className="d-flex flex-row mb-3 mt-2 pb-2 pt-2 align-items-center border-bottom border-top pagination-container">
                    <Pagination
                        totalRecords={pagination.items}
                        pageLimit={pageLimit}
                        pageNeighbours={1}
                        currentPage={currentPage}
                        onPageChanged={pageHandler}
                    />
                    <PaginationControl onPageLimitChange={pageLimitHandler} defaultValue={pagination.per_page} />
                </div>

                <div className="row">
                    {data?.length === 0 ? <div>Nothing found! Please try a different search</div> :
                        data.map((item) => {
                            return (
                                <Suspense fallback={<Loader type="gradient" />} key={item.id}>
                                    <MusicRelease item={item} />
                                </Suspense>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    );
}

export default App;
