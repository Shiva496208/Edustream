import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "./Recomended.css";

const Recomended = ({category,other}) => {   // ✅ fix props destructuring
  const api_key="AIzaSyBgsXoZaesBUjQrwzAa3xLy2mEZmeMjpls";
  // const [videos,setvideos] = useState([]);
  
  const[similarvideos,setsimilarvideos]=useState([]);
  // useEffect(()=>{
  //   const fetchvideo=async()=>{
  //     const res= await fetch(
  //       `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&type=video&videoCategoryId=27&videoDuration=long&maxResults=10&key=${api_key}`
  //     );
  //     const data= await res.json();
  //     setvideos(data.items);
  //   };
  //   fetchvideo();
  // },[category]);
  
    
  const fetchSimilar = async () => {
    const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&type=video&videoCategoryId=27&videoDuration=long&maxResults=10&key=${api_key}`
    await fetch(url).then(res=>res.json()).then(data=>setsimilarvideos(data.items));
  };

  useEffect(()=>{
    fetchSimilar();
  },[category,other])
  if(similarvideos.length<8){
   category=other;}
  
  return (
    <div className="recommend-container">
      {similarvideos.map((video) => (
        <Link to={`/player/${video.id.videoId}`} 
        state={{video}}
        key={video.id.videoId} className="rcard" >
          <div className="rthumbnail">

          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            
          />
          </div>
          <div className="rcard-footerr">
            
            <span className="rvideo-title">{video.snippet.title}</span>
            <span className='rchanneltiitle'>{video.snippet.channelTitle}</span>
            <button className='rfooter-btn'>Watch & Quiz</button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Recomended
