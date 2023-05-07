export interface IVideo {
    etag: String,
    id: {
        videoId: String
    }
    snippet: {
        channelId: String,
        channelTitle: String,
        description: String,
        title: String,
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