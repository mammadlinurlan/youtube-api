import React, { useContext, useEffect } from "react";
import Swal from 'sweetalert2'
import { useRef } from "react";
import { IVideos, IChannel, IDuration, IPlayer } from "../../interfaces";
import './VideoList.scss'
import YouTube, { YouTubeProps } from 'react-youtube';
import youtubeChannelApi from "../../api/youtubeChannel";
import { PlayerStatus, Player } from "../../hooks";
import { setInterval } from "timers/promises";
var _ = require('lodash')
export const VideoList: React.FC<IVideos> = ({ videoList }: IVideos) => {
    const youtubeREF = React.useRef<any[]>([]);
    const [selectedVideo, setSelectedVideo] = React.useState('')
    const [currentTime, setCurrentTime] = React.useState(0)
    const [channels, setChannels] = React.useState([] as IChannel[])
    const [durations, setDurations] = React.useState([] as IDuration[])
    const playerContext = useContext(PlayerStatus)
    const playerInfoContext = useContext(Player)

   
    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // event.target.setPlaybackQuality('hd720');
        console.log('video ready')
        playerContext.setStatus(true)
        const videoInfo: IDuration = {
            videoId: event.target.getVideoData().video_id,
            duration: event.target.getDuration()
        }
        setDurations(prev =>
            [
                ...prev,
                videoInfo
            ]
        )
        // console.log(event.target)
        // console.log(durations)
    }
    const onVideoEnd: YouTubeProps['onEnd'] = (event) => {
        setSelectedVideo('')
        playerInfoContext.setPlayerInfo({})
        console.log(event.target)
    }
    const onVideoStateChange: YouTubeProps['onStateChange'] = (event) => {
        console.log('changed')
    }
    const durationHandler = (id: any) => {
        const minute = Math.floor(Number(durations.find(d => d.videoId === id)?.duration) / 60)
        const second = Number(durations.find(d => d.videoId === id)?.duration) - minute * 60
        return `${minute}:${second < 10 ? `0${second}` : second}`;
    }


    const handleVideoClick = (i: any, id: any) => {
        // console.log(youtubeREF.current)
        if (youtubeREF) {


            let music: IPlayer;
            let myBoolean = playerInfoContext.playerInfo?.isPlaying
            selectedVideo === id ?
                music = {
                    name: videoList.find((v) => v.id.videoId === id)?.snippet.title as string,
                    author: videoList.find((v) => v.id.videoId === id)?.snippet.channelTitle as string,
                    videoId: id,
                    duration: durationHandler(id),
                    isPlaying: !myBoolean,
                    coverUrl: videoList.find((v) => v.id.videoId == id)?.snippet.thumbnails.medium.url as string,
                    isMuted: false,
                    mute: () => {
                        youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.mute() : console.log('ref notfounded')
                    },
                    unmute: () => {
                        youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.unMute() : console.log('ref notfounded')
                    },
                    pause: () => {
                        youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.pauseVideo() : console.log('ref notfounded')
                    }
                    ,
                    play: () => {
                        youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.playVideo() : console.log('ref notfounded')
                    },
                    timer: currentTime
                    ,
                    index: i,
                    volume: playerInfoContext.playerInfo?.volume ? playerInfoContext.playerInfo.volume : 50
                }
                :
                music = {
                    name: videoList.find((v) => v.id.videoId === id)?.snippet.title as string,
                    author: videoList.find((v) => v.id.videoId === id)?.snippet.channelTitle as string,
                    videoId: id,
                    duration: durationHandler(id),
                    isPlaying: true,
                    coverUrl: videoList.find((v) => v.id.videoId == id)?.snippet.thumbnails.medium.url as string,
                    isMuted: false,
                    mute: () => {
                        youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.mute() : console.log('ref notfounded')
                    },
                    unmute: () => {
                        youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.unMute() : console.log('ref notfounded')
                    },
                    pause: () => {
                        youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.pauseVideo() : console.log('ref notfounded')
                    }
                    ,
                    play: () => {
                        youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.playVideo() : console.log('ref notfounded')
                    }
                    ,
                    index: i,
                    timer: currentTime,
                    volume: playerInfoContext.playerInfo?.volume ? playerInfoContext.playerInfo.volume : 50
                }

            playerInfoContext.setPlayerInfo(music)
            // youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.getVolume().then((res: any) => { console.log(res) }) : console.log('ref notfounded')

            if (selectedVideo === id) {

                if (!music.isPlaying) {
                    youtubeREF.current ? youtubeREF.current[i].internalPlayer.pauseVideo() : console.log('no')
                    const obj = { ...playerInfoContext.playerInfo }
                    obj['isPlaying'] = false
                    playerInfoContext.setPlayerInfo(obj)
                    console.log('paused')
                }
                else {
                    youtubeREF.current ? youtubeREF.current[i].internalPlayer.playVideo() : console.log('no')
                    const obj = { ...playerInfoContext.playerInfo }
                    obj['isPlaying'] = true
                    playerInfoContext.setPlayerInfo(obj)
                    console.log('played')
                }

                console.log('same')
            }
            else {
                youtubeREF.current ? youtubeREF.current.forEach(v => {
                    v.internalPlayer.pauseVideo()
                }) : console.log('no')
                // console.log('not same')
                youtubeREF.current ? youtubeREF.current[i].internalPlayer.seekTo(0) : console.log('no')
                youtubeREF.current ? youtubeREF.current[i].internalPlayer.playVideo() : console.log('no')
                youtubeREF.current ? youtubeREF.current[music.index].internalPlayer.unMute() : console.log('ref notfounded')
                youtubeREF.current ? youtubeREF.current[i].internalPlayer.getCurrentTime().then((res: any) => { setCurrentTime(res) }) : console.log('-')
                setSelectedVideo(id)
                console.log(playerInfoContext.playerInfo)
            }
        }
    }

    useEffect(() => {
        console.log('context updated')
        _.isEmpty(playerInfoContext.playerInfo) ?
            youtubeREF.current ? youtubeREF.current.forEach(v => {
                v.internalPlayer.stopVideo()
            }) : console.log('no')
            :
            console.log('sa')
            // playerInfoContext.playerInfo?.isPlaying ?  youtubeREF.current ? youtubeREF.current[playerInfoContext.playerInfo.index].internalPlayer.getCurrentTime().then((res : any)=>{setCurrentTime(res)}) : console.log('-')
            // : console.log('-')
    }, [playerInfoContext.playerInfo,currentTime])
    useEffect(()=>{
        console.log(currentTime)
    },[currentTime])
    useEffect(() => {
        videoList.forEach((v) => {
            var url;
            youtubeChannelApi.get('', {
                params: {
                    id: v.snippet.channelId
                }
            })
                .then((res) => {
                    url = res.data.items[0].snippet.thumbnails.medium.url
                    let channel: IChannel = {
                        channelId: v.snippet.channelId,
                        channelPP: url
                    }
                    setChannels(prevChannels => [
                        ...prevChannels,
                        channel
                    ])
                })
        })
    }, [videoList])
    useEffect(() => {
        volumeHandler()
    }, [playerInfoContext.playerInfo?.volume])

    const volumeHandler = (i?: any) => {
        _.isEmpty(playerInfoContext.playerInfo) ? console.log('no context')
            :
            youtubeREF.current ? youtubeREF.current.forEach(v => {
                v.internalPlayer.setVolume(playerInfoContext.playerInfo?.volume)
            })
                :
                console.log('-')
    }

    return (
        <div className="videoWrapper" >
            <div style={{ height: '90vh', display: playerContext.status === null ? 'none' : playerContext.status === false ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }} className="preloader">
                <img style={{ width: '40px', height: '40px' }} src='test.svg' />
            </div>

            {videoList.map((v, i) => {
                return (
                    <div style={{ margin: '15px 0px', display: playerContext.status === null ? 'none' : playerContext.status === false ? 'none' : 'flex', alignItems: 'flex-start' }} key={v.id.videoId} >
                        <YouTube style={{display:'none'}} onError={()=>console.log('error')} onStateChange={(e) => onVideoStateChange(e)} ref={el => youtubeREF.current ? youtubeREF.current[i] = el : ''} id={`player-id-${i}`} onEnd={(e) => onVideoEnd(e)} videoId={v.id.videoId} opts={opts} onReady={(e) => onPlayerReady(e)} />
                        <img src={v.snippet.thumbnails.high.url as string} />
                        <div className="singleVideo" style={{ marginLeft: '14px', display: 'flex', flexDirection: 'column', justifyContent: "space-between", height: '200px', alignItems: 'flex-start' }}>
                            <div className="videoInfos">
                                <div className="topInfo">
                                    <p className="videoTitle">{v.snippet.title.length > 40 ? v.snippet.title.substring(0, 40) : v.snippet.title}</p>
                                    <p className="publishTime">{v.snippet.publishTime.slice(0, 10)} </p>
                                    <p className="publishTime">{durationHandler(v.id.videoId)}</p>
                                    <div style={{ marginTop: '15px' }} className="channelInfos"><img style={{ width: '24px', height: '24px' }} src={channels.find((c) => c.channelId == v.snippet.channelId)?.channelPP} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg';
                                    }} /> <a
                                        href={`https://www.youtube.com/channel/${v.snippet.channelId}`}
                                        target='_blank'
                                        style={{ marginLeft: '6px', textDecoration: 'none', color: 'white' }}>{v.snippet.channelTitle.length > 14 ? v.snippet.channelTitle.substring(0, 14) : v.snippet.channelTitle}</a></div>
                                </div>
                            </div>
                            <button className={selectedVideo === v.id.videoId && playerInfoContext.playerInfo?.isPlaying ? `btn btn-danger playButton` : 'btn btn-success playButton'} onClick={() => handleVideoClick(i, v.id.videoId)}>{selectedVideo === v.id.videoId && playerInfoContext.playerInfo?.isPlaying ? 'PAUSE' : 'PLAY'} MUSIC</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}