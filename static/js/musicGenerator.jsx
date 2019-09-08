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
    this.setState({currentNotePitch: evt.target.dataset.note})
    const note = {
      noteName: evt.target.dataset.note,
      pitch: evt.target.value,
      startTime: this.props.position,
      endTime: this.props.position + 1,
    }

    this.props.changeNote(this.props.position, note)
 
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
        value: 60,
        className: "note-radios"
      },
      {
        note: "B3",
        value: 59,
        className: "note-radios"
      },
      {
        note: "A#/Bb3",
        value: 58,
        className: "note-radios black-keys"
      },
      {
        note: "A3",
        value: 57,
        className: "note-radios"
      },
      {
        note: "G#/Ab3",
        value: 56,
        className: "black-keys"
      },
      {
        note: "G3",
        value: 55,
        className: "note-radios"
      },
      {
        note: "F#/Gb3",
        value: 54,
        className: "black-keys"
      },
      {
        note: "F3",
        value: 53,
        className: "note-radios"
      },
      {
        note: "E3",
        value: 52,
        className: "note-radios"
      },
      {
        note: "D#/Eb3",
        value: 51,
        className: "black-keys"
      },
      {
        note: "D3",
        value: 50,
        className: "note-radios"
      },
      {
        note: "C#/Db3",
        value: 49,
        className: "black-keys"
      },
      {
        note: "C3",
        value: 48,
        className: "note-radios"
      },

    ];

    const noteRadios = [];
    for (const note of notes) {
      const isChecked = this.state.currentNotePitch === note.note;
      noteRadios.push(
        <label className={note.className}>
          <input 
            type="radio" 
            name={this.props.name} 
            data-note={note.note} 
            className={note.className}
            onChange={this.handleChange} 
            checked={isChecked} 
            value={note.value}
            id="black"

          />
        <span>{note.note}</span>
        </label>
      );
    }

    return(
        // change this 
      <div className="pitch-buttons"> 
        
          {noteRadios}
        
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
      <label name="note-span" htmlFor={this.props.id}><span id={this.props.id}>{this.props.name}</span> |&nbsp;
      </label>
    )
  }
}

class ControlButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sample : undefined,
            title : "",
            isNotLoading : true
        }
        this.playStop = this.playStop.bind(this)
        this.stop = this.stop.bind(this)
        this.generateMelody = this.generateMelody.bind(this)
        this.quantizeSequence = this.quantizeSequence.bind(this)
        this.getGeneratedMelodyTitle = this.getGeneratedMelodyTitle.bind(this)
        this.saveToDatabase = this.saveToDatabase.bind(this)
        this.displayLoader = this.displayLoader.bind(this)
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

    displayLoader(bool) {
            let displayLoaderStateCopy = jQuery.extend(true, {}, this.state)
            displayLoaderStateCopy.isNotLoading = bool
            this.setState(displayLoaderStateCopy)    
    }

    quantizeSequence() {
        let quantizedS;
        let seedSequence;
         if (userMelody===undefined) {
        
              quantizedS = mm.sequences.quantizeNoteSequence(defaultSeed, 4);

               seedSequence="default seed"
         }else {
             quantizedS = mm.sequences.quantizeNoteSequence(userMelody, 4);
       
              seedSequence="user melody"
         } return quantizedS
       }

    generateMelody(evt) {

        const qns = this.quantizeSequence();
    
        this.displayLoader(false)
       
        musicAi.continueSequence(qns, rnn_steps, rnn_temperature)
          .then((sample) => {

            this.displayLoader(true)
            let controlButtonStateCopy = jQuery.extend(true, {}, this.state)
        
            
            controlButtonStateCopy.sample = sample
            
    
            visualizer = new mm.PianoRollCanvasVisualizer(sample, canvasPianoRoll)

            pianoRollPlayer.start(sample)
            
            this.setState(controlButtonStateCopy)

            
      
          })}
        
        getGeneratedMelodyTitle(evt) {
            this.setState({
                title: evt.target.value
                }
            )
        }
        saveToDatabase(evt) {
            const url="/save-melody.json";
            evt.preventDefault()
            let title = this.state.title
    
            let savedMelody = this.state.sample;

            savedMelody = JSON.stringify(savedMelody);


            if (this.state.sample === undefined) {
                alert("Please generate a melody.");
            } else if (title === "") {
              alert("Please add a title.");
            } else{
            $.post( url, {
              "savedMelody": savedMelody,
              "title": title
            }); alert("Melody Saved")}
          }


       
    render() {
        let saveForm = null;
        if(window.loggedIn) {
            saveForm = (
            <div>
                <div id="add-title">Add a title to your generated melody:</div>
              <form action="saved-melody.json" method = "POST">
               <label htmlFor="title">
               
               <input type="text" id="title" value={this.state.title} onChange={this.getGeneratedMelodyTitle} required name="title"/> 
               </label>              
               <label htmlFor="save-button">
                <button id="save" type="button" onClick={this.saveToDatabase}><i className="fas fa-save"></i> Save</button>
               </label> 
              </form>
            </div>
            );
        }
        return(
            <div className="control-buttons-div">
              <label htmlFor="play-button">
                <button className="control-buttons" id="play-button" 
                        type="button"
                        onClick={this.playStop}
                        >
                        <i className="fas fa-play-circle"></i> Play
                </button>
              </label>
              <label htmlFor="stop-button">
                <button className="control-buttons" id="stop-button" 
                type="button" 
                onClick={this.stop}>
                <i className="fas fa-stop-circle"></i> Stop</button>
              </label>
              <label htmlFor="generate-melody-button">
                <button className="control-buttons" id="generate-melody" 
                type="button" 
                onClick={this.generateMelody}><i className="fas fa-redo"></i> Generate Melody</button>
              </label>
              <span id="loader" hidden={this.state.isNotLoading}>Loading...<img src="/static/img/quarter_note.gif" alt=""/></span>
              {saveForm}
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
        { 
          noteName: "C3",
          pitch: 48,
          startTime: 1.0,
          endTime: 2.0
        },
        { 
          noteName: "C3",
          pitch: 48,
          startTime: 2.0,
          endTime: 3.0
        },
        { 
          noteName: "C3",
          pitch: 48,
          startTime: 3.0,
          endTime: 4.0
        },
        { 
          noteName: "C3",
          pitch: 48,
          startTime: 4.0,
          endTime: 5.0
        },
        { 
          noteName: "C3",
          pitch: 48,
          startTime: 5.0,
          endTime: 6.0
        },
        { 
          noteName: "C3",
          pitch: 48,
          startTime: 6.0,
          endTime: 7.0
        },
        { 
          noteName: "C3",
          pitch: 48,
          startTime: 7.0,
          endTime: 8.0
        },
      ],

    };
    this.pianoRollCanvas = React.createRef();
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.changeNote = this.changeNote.bind(this);

  }
  

  changeNote(position, note) { //deep copy

    let stateCopy = $.extend(true, {}, this.state)
    stateCopy.notes[position] = note;
    this.setState(stateCopy)  
    let totalTime = this.state.notes.slice(-1)
    totalTime = totalTime[0]["endTime"]
  
    
    userMelody = {
        notes: stateCopy.notes,
        totalTime: totalTime  
       }
    visualizer = new mm.PianoRollCanvasVisualizer(userMelody, this.pianoRollCanvas.current) 
    
  }


   
  addNote(evt) {
    this.setState((prevState) => {
      
      let end = this.state.notes.slice(-1)
      
      if (end === []){
          end = 0
      } else { end = end[0].endTime}
    
      return {
        
        notes: prevState.notes.concat([ { 
                                          noteName: "C3",
                                          pitch: 48, 
                                          startTime: end, // get the endime form the last item in this.state.notes to use as startTime for next note 
                                          endTime: end + 1 } ]) // add one to get endtime for added note
      };

    });
  }

  deleteNote(evt) {

    if(this.state.notes.length > 1) {

    let deleteNoteStateCopy = $.extend(true, {}, this.state)

    deleteNoteStateCopy.notes.pop()

    this.setState(deleteNoteStateCopy)

    let totalTime = deleteNoteStateCopy.notes.slice(-1)

         totalTime = totalTime[0]["endTime"]
    userMelody = {
        notes: deleteNoteStateCopy.notes,
        totalTime: totalTime  
    }
    visualizer = new mm.PianoRollCanvasVisualizer(userMelody, this.pianoRollCanvas.current) 
  }
  }

  render() {
    const currNotes = [];
    const noteDisplay = [];
    let position = 0;
    for (const note of this.state.notes) {
      currNotes.push(<NoteRadios  
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
        <div className="add-delete">
          <button className="buttons-control" onClick={this.addNote}>Add Note</button>
          <button className="buttons-control" id="delete" onClick={this.deleteNote}> Delete Note</button>
        </div>
        <div className="curr-notes">
          {currNotes}
        </div>
        
        <div className="note-display">
        Your Melody:&nbsp;
        {noteDisplay}
        </div>
        <div className="canvas-roll">
          
          <canvas ref={this.pianoRollCanvas}></canvas>
        </div>
        <div className="app-control-btns">
            <ControlButtons/>
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