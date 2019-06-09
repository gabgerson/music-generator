class NoteRadios extends React.Component {
        
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateNoteDisplay = this.updateNoteDisplay.bind(this);
    // this.pianoRollCanvas = React.createRef();
    this.state = {
      currentNotePitch: "C3",
    }
  }



  updateNoteDisplay(evt) {
    console.log(evt)
    this.setState({currentNotePitch: evt.target.dataset.note})
    const note = {
      noteName: evt.target.dataset.note,
      pitch: evt.target.value,
      startTime: this.props.position,
      endTime: this.props.position + 1,
    }
    this.props.changeNote(this.props.position, note)
    console.log("you clicked this");

    console.log(this.props.position + "this is position")
  }
   
  // pianoRoll = new mm.PianoRollCanvasVisualizer(userMelody, this.pianoRollCanvas.current);

  // let user say how many pitches they want
  // then render that many buttons

  handleChange = (evt)=>{
    this.updateNoteDisplay(evt);
  }
    

  render() {
    const notes = [
      {
        note: "C4",
        value: 60
      },
      {
        note: "B3",
        value: 59
      },
      {
        note: "A#/Bb3",
        value: 58
      },
      {
        note: "A3",
        value: 57
      },
      {
        note: "G#/Ab3",
        value: 56
      },
      {
        note: "G3",
        value: 55
      },
      {
        note: "F#/Gb3",
        value: 54
      },
      {
        note: "F3",
        value: 53
      },
      {
        note: "E3",
        value: 52
      },
      {
        note: "D#/Eb3",
        value: 51
      },
      {
        note: "D3",
        value: 50
      },
      {
        note: "C#/Db3",
        value: 49
      },
      {
        note: "C3",
        value: 48
      },

    ];

    const noteRadios = [];
    for (const note of notes) {
      const isChecked = this.state.currentNotePitch === note.note;
      noteRadios.push(
        <label>
          <input 
            type="radio" 
            name={this.props.name} 
            data-note={note.note} 
            className={this.props.className} 
            onChange={this.handleChange} 
            checked={isChecked} 
            value={note.value}
          />
          {note.note}
        </label>
      );
    }

    return(
        // change this 
      <div className = "pitch-buttons"> 
        <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
          {noteRadios}
        </div>  
      </div>
    );
  }
}


class NoteDisplay extends React.Component {
  constructor() { 
    super();
  }

  render() {
    return(
      <label name="note-span" htmlFor={this.props.id}>
        <span id={this.props.id}>{this.props.name}</span>|
      </label>
    )
  }
}

class ControlButtons extends React.Component {
    constructor(props) {
        super(props);
        this.playStop = this.playStop.bind(this)
        this.stop = this.stop.bind(this)
        this.generateMelody = this.generateMelody.bind(this)
        this.quantizeSequence = this.quantizeSequence.bind(this)
        this.rnnCheckpoint = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    }
    
    // getCanvasRef() {
    //     const pianoRollCanvas = this.props.getCanvasRef();
    // }
    playStop(evt) {
        if (pianoRollPlayer.isPlaying()) {
          pianoRollPlayer.stop();
        } else if (userMelody === undefined){
            pianoRollPlayer.start(defaultSeed);
        }else {
            pianoRollPlayer.start(userMelody);
        } }


    stop(evt) {
        if (pianoRollPlayer.isPlaying()) {
            pianoRollPlayer.stop();
          }}


    quantizeSequence() {
        let quantizedS;
        let seedSequence;
         if (userMelody===undefined) {
        
              quantizedS = mm.sequences.quantizeNoteSequence(defaultSeed, 4);
              console.log("using seed")
               seedSequence="default seed"
         }else {
             quantizedS = mm.sequences.quantizeNoteSequence(userMelody, 4);
             console.log("using user_melody")
              seedSequence="user melody"
         } return quantizedS
       }
       generateMelody(evt) {

        const qns = this.quantizeSequence()
        musicAi.continueSequence(qns, rnn_steps, rnn_temperature)
          .then((sample) => {
            
            visualizer = new mm.PianoRollCanvasVisualizer(sample, canvasPianoRoll)
      
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
       
    render() {
        return(
            <div>
              <label htmlFor="play-button">
                <button id="play-button" 
                        type="button"
                        onClick={this.playStop}
                        >
                        <i className="fas fa-play-circle"></i> 
                        Play
                </button>
              </label>
              <label htmlFor="stop-button">
                <button id="stop-button" type="button" onClick={this.stop}><i className="fas fa-stop-circle"></i>Stop</button>
              </label>
              <label htmlFor="generate-melody">
                <button id="generate-melody" type="button" onClick={this.generateMelody}><i className="fas fa-redo"></i> Generate Melody</button>
              </label>
            </div>
        )
    }
}


class App extends React.Component {

  // get notes off of input form note object with pitch numbers
// use react to get input
  constructor(){
    super();
    this.state = {
      notes: [
        { 
          noteName: "C3",
          pitch: 48,
          startTime: 0.0,
          endTime: 1.0
        },
      ],
     seed: {notes:[
        {endTime: 1, pitch: 55, startTime: 0},
        {endTime: 2, pitch: 48, startTime: 1},
        {endTime: 3, pitch: 57, startTime: 2},
        {endTime: 4, pitch: 53, startTime: 3},
        {endTime: 5, pitch: 52, startTime: 4},
        {endTime: 6, pitch: 48, startTime: 5},
        {endTime: 7, pitch: 50, startTime: 6},
        {endTime: 8, pitch: 55, startTime: 7}],
        totalTime:8}

    };
    this.pianoRollCanvas = React.createRef();
    this.addNote = this.addNote.bind(this);
    this.changeNote = this.changeNote.bind(this);
    


  }
  componentDidMount() {
    let visualizer = new mm.PianoRollCanvasVisualizer(this.state.seed, this.pianoRollCanvas.current)
    pianoRollPlayer = new mm.Player(false, {
        run: (note) => visualizer.redraw(note),
        stop: () => {console.log('done');}
      });
  }
  changeNote(position, note) { //deep copy
    let stateCopy = Object.assign({}, this.state)
    stateCopy.notes[position] = note;
    this.setState(stateCopy)  
    let totalTime = this.state.notes.slice(-1)
    totalTime = totalTime[0]["endTime"]
    userMelody = {
                   notes: this.state.notes,
                   totalTime: totalTime  
                  }
   visualizer = new mm.PianoRollCanvasVisualizer(userMelody, this.pianoRollCanvas.current) 
    // console.log(this.state.notes+ "from change note")
    // console.log(JSON.stringify(userMelody) +" "+"this is user Melody from change note")
  }
 
  addNote(evt) {
    this.setState((prevState) => {
      const end = this.state.notes.slice(-1)
    //   console.log( end[0].startTime, end[0].endTime)
    //   console.log(this.state)
      
          
      return {
        
        notes: prevState.notes.concat([ { 
                                          noteName: "C3",
                                          pitch: 48, 
                                          startTime: end[0].endTime, // get the endime form the last item in this.state.notes to use as startTime for next note 
                                          endTime: end[0].endTime + 1 } ]) // add one to get endtime for added note
      };

    });
  }
//   getCanvasRef(){
//       return this.pianoRollCanvas
//   }
  render() {
    const currNotes = [];
    const noteDisplay = [];
    let position = 0;
    for (const note of this.state.notes) {
      currNotes.push(<NoteRadios 
                      className={position} 
                      name={position} 
                      currentNotePitch={note.pitch} 
                      changeNote={this.changeNote} 
                      position={position}
                     /> );
      noteDisplay.push(<NoteDisplay name={note.noteName} position={position}
                                    id={position}/>)
      position++;
       
    };
    
    return (
      <div>
        <button onClick={this.addNote}>Add Note</button>
        <p>Hello I am the app component</p>
        <div>
          {currNotes}
        </div>
        <div>
          {noteDisplay}
        </div>
        <div>
          <canvas ref={this.pianoRollCanvas}></canvas>
        </div>
        <div>
            <ControlButtons pianoRollCanvas={this.pianoRollCanvas}/>
        </div>
      </div>  
    );
  }
    
}

ReactDOM.render(
    (
      <div>
        <App/>
      </div>
    ),
    document.getElementById('show-pitches')
)