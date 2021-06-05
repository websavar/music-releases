import React, { useState, useEffect } from "react";
import "./index.scss";
import gate from '../../gate';

const Search = props => {

    const [list, setList] = useState([]);

    const fetchData = async (q) => {
        const discogsList = await gate.fetchDicogs(q);
        setList(discogsList);
    };

    var currentFocus = 0;

    const onChangeHandler = (e) => {
        const input = e.target;
        let val = input.value;
        let divList, divItem;
        fetchData(val);

        closeAllLists();
        if (!val) return false;
        currentFocus = -1;
        divList = document.createElement("DIV");
        divList.setAttribute("id", input.id + "-autocomplete-list");
        divList.setAttribute("class", "autocomplete-items");
        divList.addEventListener("click", sendSearchValue);
        input.parentNode.appendChild(divList);
        let count = 0;
        for (let item of list) {
            if (item.title.substr(0, val.length).toLowerCase() === val.toLowerCase()) {
                count++;
                divItem = document.createElement("DIV");
                divItem.innerHTML = "<strong>" + item.title.substr(0, val.length) + "</strong>";
                divItem.innerHTML += item.title.substr(val.length);
                divItem.addEventListener("click", () => {
                    input.value = item.title;
                    closeAllLists();
                });
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
            if (currentFocus > 0 && items) items[currentFocus].click();
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
        for (let item of items) item.classList.remove("autocomplete-active");
    }

    const closeAllLists = () => {
        const items = document.getElementsByClassName("autocomplete-items");
        for (let item of items) item.parentNode.removeChild(item);
    }

    document.addEventListener("click", e => closeAllLists(e.target));

    const sendSearchValue = () => {
        const val = document.querySelector('#search')?.value.toLowerCase();
        return props.getSearchValue(val);
    }

    return (
        <form className="filter form-row col-lg-5 col-md-8 col-12">
            <div className="form-group">
                <input
                    autoComplete="off"
                    type="search"
                    className="form-control"
                    id="search"
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
                    onClick={sendSearchValue}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    );
};

export default Search;

