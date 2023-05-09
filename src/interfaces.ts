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
        publishTime: Date,
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