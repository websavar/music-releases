import React, { useState } from "react";
import "./index.scss";
import gate from '../../gate';

const Search = props => {

    const [list, setList] = useState([]);

    const fetchData = async (query) => {
        const discogsList = await gate.fetchDicogs(query);
        setList(discogsList?.results);
    };

    let currentFocus = -1;

    const onChangeHandler = (e) => {
        const input = e.target;
        const val = input.value;
        let divItem, imgItem;
        fetchData(val);

        closeAllLists();
        if (!val) return false;
        currentFocus = -1;
        const divList = document.createElement("DIV");
        divList.setAttribute("id", input.id + "-autocomplete-list");
        divList.setAttribute("class", "autocomplete-items");
        divList.addEventListener("click", sendSearchValue);
        input.parentNode.appendChild(divList);
        let count = 0;

        if (list === undefined) return;
        for (const item of list) {
            if (item.title.substr(0, val.length).toLowerCase() === val.toLowerCase()) {
                count++;
                divItem = document.createElement("DIV");
                imgItem = document.createElement("img");
                imgItem.src = item.thumb ? item.cover_image : "./default-bg.png";
                divItem.innerHTML = "<strong>" + item.title.substr(0, val.length) + "</strong>";
                divItem.innerHTML += item.title.substr(val.length);
                divItem.addEventListener("click", () => {
                    input.value = item.title;
                    closeAllLists();
                });
                divItem.appendChild(imgItem);
                if (count < 10) divList.appendChild(divItem);
            }
        }
    };

    const onkeyDownHandler = e => {
        let items = document.getElementById(e.target.id + "-autocomplete-list");
        if (items) items = items.getElementsByTagName("div");
        if (e.keyCode === 40) { // arrow DOWN
            currentFocus++;
            addActive(items);
        } else if (e.keyCode === 38) { // arrow UP
            currentFocus--;
            addActive(items);
        } else if (e.keyCode === 13) { // Enter
            e.preventDefault();
            if (currentFocus > -1 && items) items[currentFocus].click();
            closeAllLists();
            sendSearchValue();
        }
    };

    const addActive = (items) => {
        if (!items) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (items.length - 1);
        items[currentFocus]?.classList.add("autocomplete-active");
    }

    const removeActive = (items) => {
        for (const item of items) item.classList.remove("autocomplete-active");
    }

    const closeAllLists = () => {
        const items = document.getElementsByClassName("autocomplete-items");
        for (const item of items) item.parentNode.removeChild(item);
    }

    document.addEventListener("click", e => closeAllLists(e.target));

    const sendSearchValue = () => {
        const val = document.querySelector('#search')?.value.toLowerCase();
        return props.getSearchValue(val);
    }

    return (
        <form className="col-lg-5 col-md-8 col-12 form-row filter">
            <div className="form-group">
                <input
                    name="search"
                    autoComplete="off"
                    type="search"
                    id="search"
                    className="form-control"
                    placeholder="Search ..."
                    onChange={onChangeHandler}
                    onKeyDown={onkeyDownHandler}>
                </input>
            </div>

            <div className="form-group">
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-block"
                    id="btn-search"
                    data-message="Search for specific terms of releases"
                    onClick={sendSearchValue}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    );
};

export default Search;

