import "../App.css";
import { useEffect, useState } from "react";
import gif from '../kit-robo-advisor-working-on-holographic-screen.gif';
import LoadingBar from 'react-top-loading-bar';
import axios from "axios";


const Instagram = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [thumbnail, setThumbnail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState('');
    

    useEffect(() => {
      // If isLoading is true, increase the progress by 10 every 500 milliseconds
      if (isLoading) {
          const timer = setInterval(() => {
              setProgress(prevProgress => (prevProgress >= 90 ? 100 : prevProgress + 10));
          }, 500);
  
          return () => clearInterval(timer);
      } else {
          // If isLoading is false, set the progress to 100 after a short delay
          if (progress < 100) {
              setTimeout(() => {
                  setProgress(100);
              }, 100);
          }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
    
    
    
    const inputHandler = (e) => {
      setVideoUrl(e.target.value);
    }

    const instaVideo = async () => {
     try{
      setIsLoading(true);

      if(videoUrl.length !== 0){
  
         await axios.get('http://localhost:3000/insta-downloader',{
          params: {
            url: videoUrl
          }         
         })
         .then(response => {
          setThumbnail(response.data.response.data[0].thumbnail);
          setDownloadUrl(response.data.response.data[0].url);
           
           document.querySelector(".insta-crawler").style.display = "none";
           document.querySelector(".formats").style.display = "flex";
         })

      }else{
        alert("OOPs! You Forgot To Paste Link");
      }
     }
     catch(error){
      console.log(error);
     }finally{
      setIsLoading(false);
     }
    } 

  

  return (
    <div className="downloadCard">
     <LoadingBar 
      color='rgb(0,97,245)'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      style={{height: "3px"}}
      />
        <h1 style={{marginBottom: "2vh"}}>Instagram/Facebook Video Downloader !</h1>
        <div className="inputCard">
        <input type="url" value={videoUrl} onChange={inputHandler} placeholder="Paste your URL"/>
        <button onClick={instaVideo}>Get Video</button>
      </div>
{/* 
      <div className="videoDets">
        <h3>Title: </h3>
        <div className="thumbnail">
          <img src={thumbnail} alt="" />
        </div>
      </div> */}

      <div className="insta-crawler">
        <img src={gif} alt="" />
      </div>

      <div className="formats" style={{marginTop: "10vh"}}>
     
        <div className="formatType" id="instaFormat" style={{flexDirection: "column", gap:"15px"}}>
          <div className="insta-thumbnail">
            <img src={thumbnail} alt="" />
          </div>
         <button id="instaDownload" style={{width: "15vw", height:"5vh"}}> <a href={downloadUrl} style={{color: "#fff"}}>Download</a></button>
        </div>


      </div>
    </div>
  )
}

export default Instagram