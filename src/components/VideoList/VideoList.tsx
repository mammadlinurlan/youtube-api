import React from "react";
import { useRef } from "react";
import { IVideos } from "../../interfaces";
import './VideoList.css'

export const VideoList: React.FC<IVideos> = ({ videoList }: IVideos) => {
    console.log(videoList)
    const frameRef = useRef(null)
    const onDivClick = (id: any) => {
        console.log(document.getElementById(`iframe${id}`))
    }

    return (
        <div className="videoList">
            {
                videoList.map((video) => {
                    return (
                        <div key={video.id.videoId} className="col-lg-4">
                            <h1 onClick={() => onDivClick(video.id.videoId)}>{video.id.videoId}</h1>
                            <iframe ref={frameRef} id={`iframe${video.id.videoId}`} onClick={() => { console.log(video.id.videoId) }} width='100%' height='240' src={`https://www.youtube.com/embed/${video.id.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    )
                })
            }
        </div>
    )
}
// function() {
//     document.getElementById("theiframe").contentWindow.location.reload();