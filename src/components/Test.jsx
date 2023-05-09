import React from "react";
import YouTube from 'react-youtube';

export const Test = (props) => {
    const youtubeREF = React.useRef([]);
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [selectedVideo,setSelectedVideo] = React.useState('')
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const onReady = (e) => {
        e.target.playVideoAt(40)
        console.log(document.getElementById('salam').ev)
        console.log(e.target)
    }

    const handleVideoClick = (i,id) => {
        console.log(id)
        console.log(selectedVideo)
        if (youtubeREF) {
            if(selectedVideo === id){
                youtubeREF.current[i].internalPlayer.pauseVideo()
                setSelectedVideo('')
                console.log('eynidi')
            }
            else
            {
                youtubeREF.current.forEach(v => {
                    v.internalPlayer.pauseVideo()
                })
                youtubeREF.current[i].internalPlayer.playVideo()
                setSelectedVideo(id)
            }
                
        }
        // console.log(i)
    }

    return (
        <div >
            {props.videos.map((v, i) => {
                return (
                    <div style={{ margin: '20px 0px' }} key={v.id.videoId} >
                        <YouTube style={{ display: 'none' }} ref={el => youtubeREF.current[i] = el} id="salam" videoId={v.id.videoId} opts={opts} onReady={(e) => onReady(e)} />
                        <img src={v.snippet.thumbnails.high.url} />
                        <button className="btn btn-success" onClick={() => handleVideoClick(i,v.id.videoId)}>{selectedVideo === v.id.videoId ? 'PAUSE' : 'PLAY'} MUSIC</button>
                    </div>
                )
            })}
        </div>
    )
}


