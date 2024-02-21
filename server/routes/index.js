var express = require('express');
var router = express.Router();
var ytdl = require('ytdl-core');
var cors = require('cors');
const sanitize = require("sanitize-filename");
const { ndown } = require("nayan-media-downloader");

router.use(cors());
/* GET home page. */
router.get('/', function(req, res, next) {
 res.send("Home Page")
});

router.post('/video', async function(req, res){
  const { url } = req.body
  const info  = await ytdl.getInfo(url);
  const format = info.formats;
  res.status(200).json({messgae: "Data fetch sucessfully!", videoFormats: format, info: info})
})


router.get('/download', async function(req, res){
try {
  
  // const { url, vidQuality } = req.body;
  const url = req.query.url;
  const vidQuality = req.query.vidQuality;
  const container = req.query.container

  console.log("url", url);
  console.log("quality", vidQuality);
  console.log("container", container);

  if(!url || !ytdl.validateURL(url)){
    return res.status(404).json({message: "Given link is invalid"});
  }


  const info = await ytdl.getInfo(url);
  // Sanitize video title to remove invalid characters
  const videoTitle = info.videoDetails.title;
  const sanitizedVideoTitle = sanitize(videoTitle);

  const format = ytdl.chooseFormat(info.formats, {quality: `${vidQuality}`});

// Set response headers
res.header('Content-Disposition', `attachment; filename="cypherfetch.${container}"`);
res.header('Content-Type', `video/${container}`);

// Pipe the video stream to the response
ytdl(url, {
  format
}).pipe(res);

} catch (error) {
  res.status(201).json({error: "there is some error", error})
  console.log(error)
}

})

router.get('/insta-downloader', async function(req, res){
  try {

  const url = req.query.url;
  console.log(url) 
  let response = await ndown(url);
  console.log(response)
  res.status(200).json({response});
  // res.status(200).json({response});

  } catch (error) {
    res.status(201).json({error});
  }
})

module.exports = router;
