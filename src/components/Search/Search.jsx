import React from "react";
import { useRef } from "react";
import './Search.scss'
export const Search = (props) => {
    const inputValue = useRef('')
    return (
        <form className="d-flex" onSubmit={(e) => {
            e.preventDefault();
            props.onSearch(inputValue.current)
        }}>
            <input  className="form-control searchInput" onChange={(e) => {
                inputValue.current = e.target.value
                console.log(inputValue.current)
            }} placeholder="Search" />
            <button  className="searchButton"  >SEARCH</button>
        </form>
    )
}