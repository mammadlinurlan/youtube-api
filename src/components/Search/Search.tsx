import React, { useContext, useState } from "react";
import { useRef } from "react";
import './Search.scss'
import { PlayerStatus } from "../../hooks";
import { Player } from "../../hooks";
export const Search = (props: any) => {
    const statusContext = useContext(PlayerStatus)
    const inputValue = useRef('')
    const [error, setError] = useState(false)
    const [value, setValue] = useState('')
    const player = useContext(Player)

    return (
        <form className="d-flex" onSubmit={(e) => {
            e.preventDefault();
            setValue(inputValue.current)
            
            if (inputValue.current == value) {
                console.log('same')
            }
            else {
                props.onSearch(inputValue.current)
                statusContext.setStatus(false)
                player.setPlayerInfo({})
            }


        }}>
            <input defaultValue={inputValue.current} className="form-control searchInput" onChange={(e) => {

                inputValue.current = e.target.value

            }} placeholder="Search" required />
            <button className="searchButton"  >SEARCH</button>
        </form>
    )
}