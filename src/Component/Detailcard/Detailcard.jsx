import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import he from "he";
// import Player from '../../Pages/Player';
import './Detailcard.css'
const Detailcard = ({category}) => {
    const api_key="AIzaSyCzcihCzsAspAH9k9UbihvYcsAgdmVFWzI";

    const[videos,setvideos]=useState([]);
    useEffect(()=>{
      console.log("api calles");
        const fetchvideo=async()=>{
       const res= await fetch(
         `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&chart=mostPopular&type=video&videoCategoryId=27&videoDuration=long&maxResults=12&key=${api_key}`
       );
       const data= await res.json();
       setvideos(data.items);

    };
    fetchvideo();
},[category]);

  return (
  <div className="detailcard">
  {videos.map((video) => {
    return (
      <Link to={`/player/${video.id.videoId}`} 
       state={{video,category}}    // ✅ pass video object here
      key={video.id.videoId} className="card" >
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={he.decode(video.snippet.title)}
          className="thumbnail"
        />

        {/* Bottom Section: Channel Logo + Title */}
        <div className="card-footer">
          {/* <img
            src={video.snippet.thumbnails.default.url} // ideally replace with channel logo if available
            alt="channel logo"
            className="channel-logo"/> */}
          <span className="video-title">{video.snippet.title}</span>
          <div><button className='footer-btn'>Watch & Quiz</button></div>
        </div>
      </Link>
    );
  })}
</div>

  )
}

export default Detailcard
