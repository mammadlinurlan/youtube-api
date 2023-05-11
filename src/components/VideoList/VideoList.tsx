import React, { useEffect } from "react";
import { useRef } from "react";
import { IVideos, IChannel } from "../../interfaces";
import './VideoList.css'
import YouTube, { YouTubeProps } from 'react-youtube';
import youtubeChannelApi from "../../api/youtubeChannel";
export const VideoList: React.FC<IVideos> = ({ videoList }: IVideos) => {
    const youtubeREF = React.useRef<any[]>([]);
    const [selectedVideo, setSelectedVideo] = React.useState('')
    const [channels, setChannels] = React.useState([] as IChannel[])
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
        console.log(event.target)
    }

    const onVideoEnd: YouTubeProps['onEnd'] = (event) => {
        setSelectedVideo('')
    }
    const onVideoStateChange: YouTubeProps['onStateChange'] = (event) => {
        
    } 



    const handleVideoClick = (i: any, id: any) => {
        console.log(youtubeREF.current)
        if (youtubeREF) {
            if (selectedVideo === id) {
                youtubeREF.current ? youtubeREF.current[i].internalPlayer.pauseVideo() : console.log('no')
                setSelectedVideo('')
                console.log('same')
            }
            else {
                youtubeREF.current ? youtubeREF.current.forEach(v => {
                    v.internalPlayer.pauseVideo()
                }) : console.log('no')

                youtubeREF.current ? youtubeREF.current[i].internalPlayer.playVideo() : console.log('no')
            youtubeREF.current ? youtubeREF.current[i].internalPlayer.getCurrentTime().then((res: any) => { console.log(res) }) : console.log('-')

                //   youtubeREF.current ?  youtubeREF.current[i].internalPlayer.seekTo(0) : console.log('no')
                setSelectedVideo(id)
            }

        }
        // console.log(i)
    }

    useEffect(() => {
        videoList.forEach((v) => {
            console.log('eachvideo')
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

    return (
        <div >

            {videoList.map((v, i) => {
                return (
                    <div style={{ margin: '15px 0px', display: 'flex', alignItems: 'flex-start' }} key={v.id.videoId} >
                        <YouTube onStateChange={(e)=>onVideoStateChange(e)} style={{ display: 'none' }} ref={el => youtubeREF.current ? youtubeREF.current[i] = el : ''} id="salam" onEnd={(e) => onVideoEnd(e)} videoId={v.id.videoId} opts={opts} onReady={(e) => onPlayerReady(e)} />
                        <img src={v.snippet.thumbnails.high.url as string} />
                        <div style={{ marginLeft: '14px',display:'flex',flexDirection:'column',justifyContent:"space-between",height:'200px',alignItems:'flex-start' }}>
                            <div  className="videoInfos">
                                <div className="topInfo">
                                    <p className="videoTitle">{v.snippet.title}</p>
                                    <p className="publishTime">{v.snippet.publishTime.slice(0, 10)}</p>
                                    <div style={{ marginTop: '15px' }} className="channelInfos"><img style={{ width: '24px', height: '24px' }} src={channels.find((c) => c.channelId == v.snippet.channelId)?.channelPP} /> <span style={{ marginLeft: '6px' }}>{v.snippet.channelTitle}</span></div>
                                </div>
                            </div>
                            <button  className={selectedVideo === v.id.videoId ? `btn btn-danger` : 'btn btn-success'} onClick={() => handleVideoClick(i, v.id.videoId)}>{selectedVideo === v.id.videoId ? 'PAUSE' : 'PLAY'} MUSIC</button>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}