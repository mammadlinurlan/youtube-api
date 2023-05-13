import { createContext, useContext } from "react";
import { IPlayer } from "./interfaces";
export const PlayerStatus = createContext<any>(null)
export const usePlayerStatusContext = () => useContext(PlayerStatus)

export const Player = createContext({
    playerInfo : {} as IPlayer | null,
    setPlayerInfo : ({} : IPlayer | any) => {}
})