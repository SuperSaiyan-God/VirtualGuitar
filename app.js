const modelParams = {
  _flipHorizontal: true,
  get flipHorizontal() {
    return this._flipHorizontal;
  },
  set flipHorizontal(value) {
    this._flipHorizontal = value;
  },
  _imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  get imageScaleFactor() {
    return this._imageScaleFactor;
  },
  set imageScaleFactor(value) {
    this._imageScaleFactor = value;
  },
  _maxNumBoxes: 1, // maximum number of boxes to detect
  get maxNumBoxes() {
    return this._maxNumBoxes;
  },
  set maxNumBoxes(value) {
    this._maxNumBoxes = value;
  },
  _iouThreshold: 0.5, // ioU threshold for non-max suppression
  get iouThreshold() {
    return this._iouThreshold;
  },
  set iouThreshold(value) {
    this._iouThreshold = value;
  },
  _scoreThreshold: 0.89,
  get scoreThreshold() {
    return this._scoreThreshold;
  },
  set scoreThreshold(value) {
    this._scoreThreshold = value;
  },
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector("#vid");
const audio = document.querySelector("#audio");
let model;

function run() {
  model.detect(video).then(predictions => {
    if (predictions.length !== 0) {
      let hand1 = predictions[0].bbox;
      let x = hand1[0];
      let y = hand1[1];

      if (y > 300) {
        if (x < 200) {
          audio.src = "a-chord.mp3";
        } else if (x > 400) {
          audio.src = "e-chord.mp3";
        } else if (x > 300) {
          audio.src = "c-chord.mp3";
        } else if (x > 200) {
          audio.src = "b-chord.mp3";
        }
      }
      audio.play();
    }
  });
}


handTrack.startVideo(video).then(status => {
  if (status) {
    navigator.getUserMedia({
        video: {}
      },
      stream => {
        video.srcObject = stream;
        setInterval(run, 230);
      },
      err => console.log(err)
    );
  }
});


handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
});