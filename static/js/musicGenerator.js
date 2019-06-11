"use strict";


//Display test result on page
window.userMelody = undefined;
// let sample;

//seed melody
const defaultSeed = {"notes":[
    {"endTime":1,"pitch":"55","startTime":0},
    {"endTime":2,"pitch":"48","startTime":1},
    {"endTime":3,"pitch":"57","startTime":2},
    {"endTime":4,"pitch":"53","startTime":3},
    {"endTime":5,"pitch":"52","startTime":4},
    {"endTime":6,"pitch":"48","startTime":5},
    {"endTime":7,"pitch":"50","startTime":6},
    {"endTime":8,"pitch":"55","startTime":7}],
    "totalTime":8}


//select playButton
const playButton = $("#play-button")   
//select piano roll canvas element 
const canvasPianoRoll = document.querySelector("#piano-roll")
//instantiate new visualizer
//from Hello Magenta demo on glitch
let visualizer = new mm.PianoRollCanvasVisualizer(defaultSeed, canvasPianoRoll)
// function pianoRoll(){if(userMelody===undefined){
//                      return new mm.PianoRollCanvasVisualizer(defaultSeed, canvasPianoRoll)}
//                      return new mm.PianoRollCanvasVisualizer(userMelody, canvasPianoRoll)}

//make visualzer redraw pitches while melody is playing and instantiate player
// got this from Hello Magenta demo on glitch
let pianoRollPlayer = new mm.Player(false,{
    run: (note) => visualizer.redraw(note),
    stop: () => {console.log('done');}
  });
  
//replace seed canvas piano roll with user melody piano canvas roll   
// function playStop(evt) {
//   if (pianoRollPlayer.isPlaying()) {
//     pianoRollPlayer.stop();
//   } else if (userMelody === undefined){
//       pianoRollPlayer.start(defaultSeed);
//   }else {
//       pianoRollPlayer.start(userMelody);
//   } 
//   };
// function stop(evt) {
//   if (pianoRollPlayer.isPlaying()) {
//     pianoRollPlayer.stop();
// }};
 
// function changeText(evt) {
//   const playButton = document.querySelector("#play-button")
//     if (pianoRollPlayer.getPlayState() === "Stopped") {
//       playButton.innerHTML = 'Play'
//     } else if (playButton.innerHTML === 'Play') {
//         playButton.innerHTML = 'Stop';
//       } else {
//         playButton.innerHTML = 'Play';
//       }
//   } 

// connecting to musicRNN and checkpoint
const musicAi = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
// how long the generated melody will be
let rnn_steps = 100;
//how random the generated melody will be
let rnn_temperature = 1;

// player for ai generated melody
const musicAiPlayer = new mm.Player();

// quantize melody and generate new one
function quantizeSequence() {
   let qns;
   let seedSequence;
    if (userMelody===undefined) {
   
         qns = mm.sequences.quantizeNoteSequence(defaultSeed, 4);
         console.log("using seed")
          seedSequence="default seed"
    }else {
        qns = mm.sequences.quantizeNoteSequence(userMelody, 4);
        console.log("using user_melody")
         seedSequence="user melody"
    } return qns
  }

function generateMelody(evt) {

  const qns = quantizeSequence()
  musicAi.continueSequence(qns, rnn_steps, rnn_temperature)
    .then((sample) => {
      
      pianoRoll = new mm.PianoRollCanvasVisualizer(sample, canvasPianoRoll)

      pianoRollPlayer.start(sample)

      // console.log(sCheck);
      //save generated melody to global variable
      // sam = sample;
      console.log(sample);
    //start playing generated melody
      // musicAiPlayer.start(sample);

      const save = $('#save');
      save.click((evt) => {
        const url="/save-melody.json";
        evt.preventDefault()
        let title = $("#title").val()
        // console.log(title + "ads")
        let savedMelody = sample;
        // console.log(sam);
        savedMelody = JSON.stringify(savedMelody);
        // console.log(savedMelody);
        if (title === "") {
          alert("Please add a title.");
        }else{
        $.post( url, {
          "savedMelody": savedMelody,
          "title": title
        });}
      });
    })}
  
//select save button

// going to get userMelody and current ai generated melody and 
//save send to backend to save to database
// maybe a better way to do this late is to use a list 
//the list would store all melodies for that session
// then at the end of the session user can save all the melodies 
//this way they wont't lose any melodies

function saveToDatabase(evt) {
  const url="/save-melody.json";
  const save = $('#save');
  evt.preventDefault()
  let title = $("#title").val()
  // console.log(title + "ads")
  let savedMelody = sample;
  // console.log(sam);
  savedMelody = JSON.stringify(savedMelody);
  // console.log(savedMelody);
  if (title === "") {
    alert("Please add a title.");
  }else{
  $.post( url, {
    "savedMelody": savedMelody,
    "title": title
  });}
}

  function playSavedMusic(evt) {
    // get id off of button
    let eventId = event.target.id;
    console.log(eventId)
    // console.log(eventId)
    // add melody- to eventId 
    let melodyObjId = "melody-" + eventId;
    // console.log(melodyObjId);
    // select the element that contains the melody object
    melodyObjId=document.getElementById(melodyObjId);
    //turn into JSON 
    userMelody = JSON.parse(melodyObjId.innerHTML);
    // unquantize melody
    userMelody = mm.sequences.unquantizeSequence(userMelody);
    // redraw vizualizer with melody
    visualizer = new mm.PianoRollCanvasVisualizer(userMelody, canvasPianoRoll);
    console.log(userMelody);
  }

  savedMusicButtons = $(".saved-music-buttons")

  savedMusicButtons.click(playSavedMusic)



