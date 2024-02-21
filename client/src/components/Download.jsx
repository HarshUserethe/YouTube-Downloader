import "../App.css";
import { useState, useEffect,  } from "react";
import axios from 'axios';
import gif from '../dazzle-cloud-software.gif';
import LoadingBar from 'react-top-loading-bar';

const Download = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [formats, setFormats] = useState([]);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [title, setTitle] = useState('');
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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
  
    const getVideoInfo = async () => {
    try {
        if(videoUrl.length !== 0){
            setIsLoading(true);
            const response = await axios.post('http://localhost:3000/video', {
                url: videoUrl
               })

               setTitle(response.data.info.videoDetails.title);
               setThumbnailUrl(response.data.info.videoDetails.thumbnails[3].url);           
               setFormats(response.data.videoFormats);

               document.querySelector(".videoDets").style.display = "flex";
               document.querySelector(".crawler").style.display = "none";
               document.querySelector(".formats").style.display = "flex";
          
        }else{
            alert("OOPs! You Forgot To Paste Link ")
        }
        
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
    }

    const downloadButton = async (format) => {
     try {

      setIsLoading(true);

       await axios.get('http://localhost:3000/download', {
         params: {
           url: videoUrl,
           vidQuality: format.itag,
           container: format.container
         },
         responseType: 'blob'
       })
       .then(response => {
          // Create a blob from the response
          const blob = new Blob([response.data], { type: `video/${format.container}` }); // adjust the MIME type according to your file type
         
          // Create a URL for the blob
        const Bolburl = window.URL.createObjectURL(blob);

          // Create a link element and click it to trigger the download
             const a = document.createElement('a');
             a.href = Bolburl;
             a.download = `cypherfetch.${format.container}`; // adjust the filename accordingly
             document.body.appendChild(a);
             a.click();

      //       // Clean up
            window.URL.revokeObjectURL(Bolburl);
       })

        
     
     } catch (error) {
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
        <h1 style={{marginBottom: "2vh"}}>Youtube Video/Shorts Downloader !</h1>
        <div className="inputCard">
        <input type="url" value={videoUrl} onChange={inputHandler} placeholder="Paste your URL"/>
        <button onClick={getVideoInfo}>Get Video</button>
      </div>

      <div className="videoDets">
        <h3>Title: {title}</h3>
        <div className="thumbnail">
          <img src={thumbnailUrl} alt="" />
        </div>
      </div>

      <div className="crawler">
        <img src={gif} alt="" />
      </div>

      <div className="formats">
      {formats.slice(0, 10).map((fmt, index) => (
        <div key={index} className="formatType">
          <li>{fmt.container}</li>
          <li>{fmt.qualityLabel}</li>
          <button onClick={() => downloadButton(fmt)}>Download</button>
        </div>
      ))}

      </div>
    </div>
  )
}

export default Download