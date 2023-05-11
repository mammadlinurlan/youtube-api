import React from 'react';
import logo from './logo.svg';
import youtubeApi from './api/youtube'
import { Search } from './components/Search/Search';
import { VideoList } from './components/VideoList/VideoList';
import { IVideo, IVideos } from './interfaces';
import { Test } from './components/Test';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [videoList, setVideoList] = React.useState([] as IVideo[])

  const onSearch = async (keyword: any) => {
    const response = await youtubeApi.get('', {
      params: {
        q: keyword
      }
    })
    console.log(response.data.items)
    setVideoList(response.data.items)

    console.log(videoList)
  }


  return (
    <>
      <Router>
      <Search onSearch={onSearch} />
        <Routes>
          {/* <Route path='/test' element={<Test videos={videoList} />} /> */}
        </Routes>
        <VideoList videoList={videoList} />
      </Router>
    </>


  );
}

export default App;
