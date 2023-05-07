import React from 'react';
import logo from './logo.svg';
import youtubeApi from './api/youtube'
import { Search } from './components/Search/Search';
import { VideoList } from './components/VideoList/VideoList';
import { IVideo,IVideos } from './interfaces';
function App() {
  const [videoList,setVideoList] = React.useState([] as IVideo[])
 const onSearch = async (keyword : any) => {
    const response = await youtubeApi.get('',{
      params : {
        q : keyword
      }
    })
    console.log(response.data.items)
    setVideoList(response.data.items)
    console.log(videoList)
  }


  return (
    <div className="App">
        <Search onSearch={onSearch} />
        <VideoList videoList={videoList}/>
    </div>
  );
}

export default App;
