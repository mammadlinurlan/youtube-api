import React, { useContext } from "react";
import { useRef } from "react";
import './Search.scss'
import { PlayerStatus } from "../../hooks";
export const Search = (props) => {
    const statusContext = useContext(PlayerStatus)
    const inputValue = useRef('')
    return (
        <form className="d-flex" onSubmit={(e) => {
            e.preventDefault();
            props.onSearch(inputValue.current)
            statusContext.setStatus(false)
        }}>
            <input  className="form-control searchInput" onChange={(e) => {
                inputValue.current = e.target.value
            }} placeholder="Search" required />
            <button  className="searchButton"  >SEARCH</button>
        </form>
    )
}