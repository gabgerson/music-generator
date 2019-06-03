



class CurrentNote extends React.Component {
        
  constructor() {
    super();
    // this.handleChange = this.handleChange.bind(this);
    this.noteOne = this.noteOne.bind(this);
    this.getPitchValue = this.getPitchValue.bind(this);

    this.pianoRollCanvas = React.createRef();
  }



  noteOne(evt) {
    //   this.setState()
    this.state = {value: evt.target.dataset.note}
    console.log("you clicked this");
    const showPitch = document.getElementById(this.props.className);
    console.log(showPitch)
    // console.log("wow my value is" + this.state.value)
    showPitch.innerHTML = this.state.value

    // console.log(this.props.className)
   
    }
   
  getPitchValue(evt) {
    this.state = {value: evt.target.value,
                  name: evt.target.name}
    console.log(this.state.value)
    console.log(this.state.name) 
    let myDict = {}
    myDict[this.state.name] = this.state.value 
    // not sure how to get this to work and format correctly in the userMelodyObject this.state
   
    // console.log(this.state.noteObject) 
    // if(this.state.name==='pitches-one') {
    //   let pOne = this.state.value;
    // }else if (this.state)

    // update note object with this.state
    // jquery gone now 
    
      let pOne = document.querySelector('input[name="pitches-one"]:checked').value;
      let pTwo =  document.querySelector('input[name="pitches-two"]:checked').value;
      let pThree = document.querySelector('input[name="pitches-three"]:checked').value;
      let pFour = document.querySelector('input[name="pitches-four"]:checked').value;
      let pFive = document.querySelector('input[name="pitches-five"]:checked').value;
      let pSix = document.querySelector('input[name="pitches-six"]:checked').value;
      let pSev = document.querySelector('input[name="pitches-sev"]:checked').value;
      let pEight = document.querySelector('input[name="pitches-eight"]:checked').value;
   
      // let pOne = $("input[name='pitches-one']:checked").val();
      // let pTwo =  $("input[name='pitches-two']:checked").val();
      // let pThree = $("input[name='pitches-three']:checked").val();
      // let pFour = $("input[name='pitches-four']:checked").val();
      // let pFive = $("input[name='pitches-five']:checked").val();
      // let pSix = $("input[name='pitches-six']:checked").val();
      // let pSev = $("input[name='pitches-sev']:checked").val();
      // let pEight = $("input[name='pitches-eight']:checked").val();
    //  dictionary of dictionaries  {1: 60,
                                // 2:58}    loop
      // let u = {
      //   'pitches-one': 0
      // }
    userMelody = {notes:[
        {pitch: pOne, startTime:0.0, endTime:1},
        {pitch: pTwo, startTime:1.0, endTime:2},
        {pitch: pThree, startTime:2.0, endTime:3},
        {pitch: pFour, startTime:3.0, endTime:4},
        {pitch: pFive, startTime:4.0, endTime:5},
        {pitch: pSix, startTime:5.0, endTime:6},
        {pitch: pSev, startTime:6.0, endTime:7},
        {pitch: pEight, startTime:7.0, endTime:8}],
        totalTime:8}  
      pianoRoll = new mm.PianoRollCanvasVisualizer(userMelody, this.pianoRollCanvas.current);



  }
    

  // let user say how manypitches they want
  // then render that many buttons
  // then format the obeject correctly ???
  



  handleChange = (evt)=>{
    this.noteOne(evt);
    this.getPitchValue(evt);
}
    

  render() {
    const notes = [
      {
        note: 'C4',
        value: 60
      },
      {
        note: 'C3',
        value: 68
      },
    ];

    const noteRadios = [];
    for (const note of notes) {
      const isChecked = this.props.currentNotePitch === note.note;
      noteRadios.push(
        <label className="btn btn-secondary">
          <input type="radio" name={this.props.name} data-note={note.note} className={this.props.className}  onChange={this.handleChange} checked={isChecked} value={note.value}/>
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
          {/* <div>
            <label className="btn btn-secondary">
              <input type="radio" name={this.props.name} data-note="C4" className={this.props.className}  onChange={this.handleChange} value="60"/>C4
            </label>
          </div>
          <div>
            <label className="btn btn-secondary">
              <input type="radio" name={this.props.name} data-note="B3" className={this.props.className}  onChange={this.handleChange} value="59"/>B3
            </label>
          </div>
          <div>
            <label className="btn btn-secondary">
              <input type="radio" name={this.props.name} data-note="A3" className={this.props.className}  onChange={this.handleChange} value="57"/>A3
            </label>
          </div>
          <div>
            <label className="btn btn-secondary">
              <input type="radio" name={this.props.name} data-note="G3" className={this.props.className}  onChange={this.handleChange} value="55"/>G3
            </label>
          </div>
          <div>
            <label className="btn btn-secondary">
              <input type="radio" name={this.props.name} data-note="F3" className={this.props.className}  onChange={this.handleChange} value="53"/>F3
            </label>
          </div>
          <div>
            <label className="btn btn-secondary">
              <input type="radio" name={this.props.name} data-note="E3" className={this.props.className}  onChange={this.handleChange} value="52"/>E3
            </label> 
          </div>
          <div>
            <label className="btn btn-secondary">
              <input type="radio" name={this.props.name} data-note="D3" className={this.props.className}  onChange={this.handleChange} value="50"/>D3 
            </label>
          </div>
          <div>
            <label className="btn btn-secondary"> 
              <input type="radio" name={this.props.name} data-note="C3" className={this.props.className} onChange={this.handleChange}  defaultChecked value="48"/>C3
            </label>  
          </div> */}
         
                    
          {/* <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} data-note="E3" className={this.props.className}  onChange={this.handleChange} value="52"/>E3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} data-note="F3" className={this.props.className}  onChange={this.handleChange} value="53"/>F3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} data-note="G3" className={this.props.className}  onChange={this.handleChange} value="55"/>G3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} data-note="A3" className={this.props.className}  onChange={this.handleChange} value="57"/>A3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} data-note="B3" className={this.props.className}  onChange={this.handleChange} value="59"/>B3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} data-note="C4" className={this.props.className}  onChange={this.handleChange} value="60"/>C4
          </label> */}
        
        
      </div>
    );
  }
}

class App extends React.Component{

  // get notes off of input form note object with pitch numbers
// use react to get input
  constructor(){
    super();
    this.state = {
      notes: [
        {
          pitch: "C3"
        }
      ],

    };

    this.pitchValue = {
      C3: 48
    };

    this.addNote = this.addNote.bind(this);
  }

  addNote() {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.concat([ { pitch: "C4" } ])
      };
    });
  }

  render() {
    const currNotes = [];
    for (const note of this.state.notes) {
      currNotes.push(<CurrentNote currentNotePitch={note.pitch} />);
    }

    return (
      <div>
        <button onClick={this.addNote}>Add Note</button>
        <canvas id="piano-roll" ref={this.pianoRollCanvas}></canvas>
        <p>Hello I am the app component</p>
        <div 
        >
          {currNotes}
        </div>
      </div>  
    );
  }
    
}

ReactDOM.render(
    (
      <div>
        {/* <CurrentNote name="pitches-one" className="one" />
        <CurrentNote name="pitches-two" className="two" />
        <CurrentNote name="pitches-three" className="three" />
        <CurrentNote name="pitches-four" className="four" />
        <CurrentNote name="pitches-five" className="five" />
        <CurrentNote name="pitches-six" className="six" />
        <CurrentNote name="pitches-sev" className="sev" />
        <CurrentNote name="pitches-eight" className="eight" /> */}
        <App/>
      </div>
    ),
    document.getElementById('show-pitches')
)

