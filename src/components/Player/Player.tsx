import React, { useContext, useEffect } from "react";
import './Player.scss'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { GoMute, GoUnmute } from 'react-icons/go'
import { Player as playerContext } from "../../hooks";
var _ = require('lodash')
export const Player = () => {
    const player = useContext(playerContext)
    // useEffect(() => {
    //     status = player.playerInfo?.isMuted
    //     console.log('deyisdi')
    // }, [player.playerInfo])
    return (
        !_.isEmpty(player.playerInfo) ?
        <div className="bottomPlayer">
            <div className="container d-flex">
                <div className="leftPlayerSide col-lg-3">
                    <img src={player.playerInfo?.coverUrl} />
                    <div className="playerLeftInfo">
                        <p className="title">
                            {player.playerInfo?.name}
                        </p>
                        <p className="author">
                            {player.playerInfo?.author}
                        </p>
                    </div>
                </div>
                <div className="centerPlayerSide col-lg-6">
                    <div className="top">
                        <BiSkipNext />
                        {
                            player.playerInfo?.isPlaying ?
                                <AiFillPauseCircle onClick={() => {
                                    player.playerInfo!.pause()
                                    const obj = { ...player.playerInfo }
                                    obj['isPlaying'] = false
                                    player.setPlayerInfo(obj)
                                }} />
                                :
                                <AiFillPlayCircle
                                    onClick={() => {
                                        player.playerInfo!.play()
                                        const obj = { ...player.playerInfo }
                                        obj['isPlaying'] = true
                                        player.setPlayerInfo(obj)
                                    }}
                                />

                        }
                        <BiSkipPrevious />
                    </div>
                    <div className="bottom">
                        <p>0:00</p>
                        <div className="playerBar"></div>
                        <p>{player.playerInfo?.duration}</p>
                    </div>
                </div>
                <div className="rightPlayerSide col-lg-3">
                    {
                        player.playerInfo?.isMuted ? <GoMute onClick={() => {
                            player.playerInfo!.unmute()
                            const myObj = { ...player.playerInfo }
                            myObj['isMuted'] = false;
                            player.setPlayerInfo(myObj)
                        }} />
                            :
                            <GoUnmute onClick={() => {
                                player.playerInfo!.mute()
                                const myObj = { ...player.playerInfo }
                                myObj['isMuted'] = true;
                                player.setPlayerInfo(myObj)
                            }} />
                    }
                </div>
            </div>

        </div>
        :
        <></>
    )
}