"use strict";


//Display test result on page
let user_melody;

function testResult(evt) {
    evt.preventDefault();
    let url = "/pitches.json"
    let formInputs = {
        "pitches-one": $("input[name='pitches-one']:checked").val(),
        "pitches-two": $("input[name='pitches-two']:checked").val(),
        "pitches-three": $("input[name='pitches-three']:checked").val(),
        "pitches-four": $("input[name='pitches-four']:checked").val(),
        "pitches-five": $("input[name='pitches-five']:checked").val(),
        "pitches-six": $("input[name='pitches-six']:checked").val(),
        "pitches-sev": $("input[name='pitches-sev']:checked").val(),
        "pitches-eight": $("input[name='pitches-eight']:checked").val()
    };
    console.log(formInputs)
    
    $.post(url, formInputs, (results) =>{ user_melody=results; 
          viz = new mm.PianoRollCanvasVisualizer(user_melody, canvasPianoRoll);
                             console.log(results); 
                             $("#show-pitches").text(JSON.stringify(results))}
                             )}
                                                    

// $('#pitch-form').on('submit',getPitches);

// function getPitches(evt){
//     evt.preventDefault();
//     let pOne = $("input[name='pitches-one']:checked").val();
//     let pTwo =  $("input[name='pitches-two']:checked").val();
//     let pThree = $("input[name='pitches-three']:checked").val();
//     let pFour = $("input[name='pitches-four']:checked").val();
//     let pFive = $("input[name='pitches-five']:checked").val();
//     let pSix = $("input[name='pitches-six']:checked").val();
//     let pSev = $("input[name='pitches-sev']:checked").val();
//     let pEight = $("input[name='pitches-eight']:checked").val();

//   user_melody = {notes:[
//       {pitch: pOne, startTime:0.0, endTime:1},
//       {pitch: pTwo, startTime:1.0, endTime:2},
//       {pitch: pThree, startTime:2.0, endTime:3},
//       {pitch: pFour, startTime:3.0, endTime:4},
//       {pitch: pFive, startTime:4.0, endTime:5},
//       {pitch: pSix, startTime:5.0, endTime:6},
//       {pitch: pSev, startTime:6.0, endTime:7},
//       {pitch: pEight, startTime:7.0, endTime:8}],
//       totalTime:8}

//     console.log(user_melody)
//   
// };




let seed = {"notes":[
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
let viz = new mm.PianoRollCanvasVisualizer(seed, canvasPianoRoll);
//reset vizualizer to userMelody
playButton.click(()=>{viz = new mm.PianoRollCanvasVisualizer(user_melody, canvasPianoRoll)});
//make visualzer redraw pitches while melody is playing and instantiate player
const vizPlayer = new mm.Player(false, {
    run: (note) => viz.redraw(note),
    stop: () => {console.log('done');}
  });
  ;
  
//replace seed canvas piano roll with user melody piano canvas roll   
function playStop(evt){
    
  if (vizPlayer.isPlaying()) {
    vizPlayer.stop();
  } else if (user_melody === undefined){
      vizPlayer.start(seed);
  }else {
      vizPlayer.start(user_melody);
  } 
  }


const musicAi = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
  
let rnn_steps = 100;
let rnn_temperature = 3;

const musicAiPlayer = new mm.Player();

function musicone() {
   let qns;
   let sCheck;
    if (user_melody===undefined) {
   
         qns = mm.sequences.quantizeNoteSequence(seed, 4);
         console.log("using seed")
          sCheck="seed"
    }else {
        qns = mm.sequences.quantizeNoteSequence(user_melody, 4);
        console.log("using user_melody")
         sCheck="userM"
    }
musicAi.continueSequence(qns, rnn_steps, rnn_temperature).then((sample) => {
// sam = sample;
// const aiViz = new mm.PianoRollCanvasVisualizer(sample, canvasTwo);
  console.log(sCheck)
// console.log(sam)
musicAiPlayer.start(sample)});
}
  
  



// function userPianoRoll(evt){
//     if (user_melody === null) {}


//     viz = new mm.PianoRollCanvasVisualizer(user_melody, canvasPianoRoll)

//     if (vizPlayer.isPlaying()) {
//       vizPlayer.stop();
//     }else{

//     vizPlayer.start(user_melody);
//   }}

