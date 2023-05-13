import React, { useEffect } from 'react';
import logo from './logo.svg';
import youtubeApi from './api/youtube'
import { Search } from './components/Search/Search';
import { VideoList } from './components/VideoList/VideoList';
import { IPlayer, IVideo, IVideos } from './interfaces';
import { Test } from './components/Test';
import './App.css'
import { PlayerStatus,Player as PlayerContext } from './hooks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Player } from './components/Player/Player';
function App() {
  const [videoList, setVideoList] = React.useState([] as IVideo[])
  const [status, setStatus] = React.useState(null)
  const [playerMusic,setPlayerMusic] = React.useState({} as IPlayer | null)
  const onSearch = async (keyword: any) => {
    const response = await youtubeApi.get('', {
      params: {
        q: keyword
      }
    })
    setVideoList(response.data.items)
  }

 
  return (
    <>
      <Router>
        <PlayerStatus.Provider value={{ status, setStatus }} >
          <PlayerContext.Provider value={{playerInfo:playerMusic,setPlayerInfo:setPlayerMusic}}>
          <div className='container'>
            <Search onSearch={onSearch} />
            <VideoList videoList={videoList} />
          </div>
          <Routes>
          </Routes>
          <Player />
          </PlayerContext.Provider>
        </PlayerStatus.Provider>
      </Router>
    </>
  );
}

export default App;
