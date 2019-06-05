class NoteRadios extends React.Component {
        
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.updateNoteDisplay = this.updateNoteDisplay.bind(this);
    // this.getPitchValue = this.getPitchValue.bind(this);

    // this.pianoRollCanvas = React.createRef();
    this.state = {
      currentNotePitch: "C3",
    }
  }



  updateNoteDisplay(evt) {
    console.log(evt)
    this.setState({currentNotePitch: evt.target.dataset.note})
    const note = {
      pitch: evt.target.value,
      startTime: this.props.position,
      endTime: this.props.position + 1,
    }
    this.props.changeNote(this.props.position, note)
    console.log("you clicked this");
    const showPitch = document.getElementById(this.props.className);
    console.log(showPitch)
    // console.log("wow my value is" + this.state.value)
    showPitch.innerHTML = this.state.currentNotePitch

    // console.log(this.props.className)
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
        <label className="btn btn-secondary">
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
  };

  render() {
    return(
      <label name="note span" htmlFor={this.props.id}>
        <span id={this.props.id}>C3</span>|
      </label>
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
          pitch: 48,
          startTime: 0.0,
          endTime: 1.0
        },
      ],

    };
    this.pianoRollCanvas = React.createRef();
    this.seed = {
      pianoRoll : new mm.PianoRollCanvasVisualizer(userMelody, this.pianoRollCanvas.current)
    }
    // this.pitchValue = {
    //   C4: 60,
    //   B3: 59,
    //   Bb3: 58,
    //   A3: 57,
    //   Ab3: 56,
    //   G3: 55,
    //   Gb3: 54,
    //   F3: 53,
    //   E3: 52,
    //   Eb3: 51,
    //   D3: 50,
    //   Db3: 49,
    //   C3: 48,
    // };

    this.addNote = this.addNote.bind(this);
    this.changeNote = this.changeNote.bind(this);
  }

  changeNote(position, note) {
    let stateCopy = Object.assign({}, this.state)
    stateCopy.notes[position] = note;
    this.setState(stateCopy)  
    let totalTime = this.state.notes.slice(-1)
    totalTime = totalTime[0]["endTime"]
    userMelody = {notes: this.state.notes,
                   totalTime: totalTime  
                  }
    pianoRoll = new mm.PianoRollCanvasVisualizer(userMelody, this.pianoRollCanvas.current)  
    //need to fix this 
    // console.log(this.state.notes+ "from change note")
    // console.log(JSON.stringify(userMelody) +" "+"this is user Melody from change note") 
  }

  addNote(evt) {
    this.setState((prevState) => {
      const end = this.state.notes.slice(-1)
      console.log( end[0].startTime, end[0].endTime)
      console.log(this.state)
      
          
      return {
        
        notes: prevState.notes.concat([ { pitch: 48, 
                                          startTime: end[0].endTime, 
                                          endTime: end[0].endTime + 1 } ])
      };

    });
  }
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
      noteDisplay.push(<NoteDisplay id={position}/>)
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
          <canvas id="piano-roll" ref={this.pianoRollCanvas}></canvas>
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

