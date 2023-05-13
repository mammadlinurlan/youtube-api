export interface IVideo {
    etag: String,
    id: {
        videoId: string
    }
    snippet: {
        channelId: string,
        channelTitle: string,
        description: string,
        title: string,
        publishTime: string,
        thumbnails: {
            default: {
                url: String,
                width: Number,
                height: Number
            },
            high: {
                url: String,
                width: Number,
                height: Number
            },
            medium: {
                url: String,
                width: Number,
                height: Number
            }
        }
    }
}

export interface IVideos {
    videoList: IVideo[]
}
export interface IChannel{
    channelId : string,
    channelPP : string
}
export interface IDuration{
    videoId : string,
    duration : number
}
export interface IPlayer{
    author : string,
    name : string,
    videoId : string,
    coverUrl : string,
    duration : string,
    isPlaying : boolean,
    isMuted : boolean,
    mute : any,
    unmute : any,
    index : any,
    play : any,
    pause : any,
    timer : any
    // play : ()=>{},
    // pause : ()=>{}
}