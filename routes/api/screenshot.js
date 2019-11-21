const express = require('express');
const path = require('path');
const fs = require('fs');
const webshot = require('webshot-node');
const uuidv1 = require('uuid/v1');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const router = express.Router();

const SCREEN_WIDTH = 1200;
const SCREEN_HEIGHT = 900;


// @route   POST api/screenshot
// @desc    Generate screenshot
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { url } = req.body;
    console.log('Getting screenshot for: ', url);

    const imageName = uuidv1() + '.png';
    const savePath = path.join(__basedir, 'screenshots', imageName);
    const accessPath = path.join('/screenshots', imageName);

    const cFiles = fs.readdirSync(path.join(__basedir, 'screenshots'));

    var options = {
      screenSize: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
      },
      shotSize: {
        width: SCREEN_WIDTH,
        height: 'all'
      },
      timeout: 30000,
      renderDelay: 10000,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    };

    webshot(url, savePath, options, (error) => {
      if(error){
        console.log(error);
        return res.status(400).json({
          success: false,
          message: 'Error generating screenshot'
        });
      }
      else{
        // const newImage = PNG.sync.read(fs.readFileSync(savePath));
        // const { width, height } = newImage;
        // const diff = new PNG({ width, height });
        //
        // for(var ii = 0; ii < cFiles.length; ii++){
        //   const oldImage = PNG.sync.read(fs.readFileSync(path.join(__basedir, 'screenshots', cFiles[ii])));
        //
        //   pixelmatch(newImage.data, oldImage.data, diff.data, width, height);
        //   fs.writeFileSync(path.join(__basedir, 'screenshots', `diff_image_${ii}.png`), PNG.sync.write(diff));
        // }

        return res.status(200).json({
          success: true,
          message: `Generated screenshot for ${url}`,
          screenshot_path: accessPath
        });
      }
    });
  }
  catch(error){
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Error generating screenshot'
    });
  }

});

module.exports = router;
