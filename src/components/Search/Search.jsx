import React from "react";
import { useRef } from "react";

export const Search = (props) => {
    const inputValue = useRef('')
    return(
        <form onSubmit={(e) => {
            e.preventDefault();
            props.onSearch(inputValue.current)
        }}>
            <input onChange={(e) => {inputValue.current = e.target.value
            console.log(inputValue.current)
            }} placeholder="Search" />
            <button>SEARCH</button>
        </form>
    )
}