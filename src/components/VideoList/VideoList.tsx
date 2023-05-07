import React from "react";
import { IVideos } from "../../interfaces";
import './VideoList.css'

export const VideoList: React.FC<IVideos> = ({ videoList }: IVideos) => {
    console.log(videoList)
    return (
        <div className="videoList">
            {
                videoList.map((video) => {
                    return (
                        <div className="col-lg-4">
                        <iframe width='100%' height='240'  src={`https://www.youtube.com/embed/${video.id.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                        </div>

                    
                    )
                })
            }
        </div>
    )
}
