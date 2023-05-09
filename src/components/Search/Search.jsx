import React from "react";
import { useRef } from "react";

export const Search = (props) => {
    const inputValue = useRef('')
    return(
        <form className="d-flex" onSubmit={(e) => {
            e.preventDefault();
            props.onSearch(inputValue.current)
        }}>
            <input width='90%' className="form-control" onChange={(e) => {inputValue.current = e.target.value
            console.log(inputValue.current)
            }} placeholder="Search" />
            <button width="10%" className="btn btn-primary">SEARCH</button>
        </form>
    )
}