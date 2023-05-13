import React, { useContext, useEffect, useState } from "react";
import './Player.scss'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { GoMute, GoUnmute } from 'react-icons/go'
import { Player as playerContext } from "../../hooks";
import { useTimer } from 'react-timer-hook';
var _ = require('lodash')
export const Player = () => {
    const player = useContext(playerContext)
    const [currentTime,setCurrentTime] = useState(0)
    var sec = 0;
    // useEffect(() => {
    //     _.isEmpty(player.playerInfo) ? console.log('empty')
    //     :
    //    timerHandler()


    //     console.log('deyisdi')
    // }, [player.playerInfo])

    // const timerHandler = () => {
    //    return setInterval(()=>{
    //         sec++
    //         setCurrentTime(sec)
    //     },1000)
    // }

    // useEffect(()=>{
    //     if(_.isEmpty(player.playerInfo))
    //     {
    //         clearInterval(timerHandler())
    //         setCurrentTime(0)
    //     }
    //     else{
    //         if(player.playerInfo?.isPlaying)
    //         {
    //             console.log('playing') 
    //         }
    //         {
    //             clearInterval(timerHandler())
    //             setCurrentTime(0)
    //         }

    //     }
    // },[player.playerInfo])

    // function MyTimer( expiryTimestamp : any ) {
    //     const {
    //       seconds,
    //       minutes,
    //       hours,
    //       days,
    //       isRunning,
    //       start,
    //       pause,
    //       resume,
    //       restart,
    //     } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
      
      

    return (
        !_.isEmpty(player.playerInfo) ?
        <div className="bottomPlayer">
            <div className="container d-flex">
                <div className="leftPlayerSide col-lg-3">
                    <img src={player.playerInfo?.coverUrl} />
                    <div className="playerLeftInfo">
                        <p className="title">
                            {player.playerInfo!.name.length > 30 ? player.playerInfo?.name.substring(0,30) : player.playerInfo?.name}
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