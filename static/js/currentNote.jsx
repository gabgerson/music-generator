



class CurrentNote extends React.Component {
        
  constructor() {
    super();
    // this.handleChange = this.handleChange.bind(this);
    this.noteOne = this.noteOne.bind(this);
    this.getPitchValue = this.getPitchValue.bind(this);
    
  }
  my_lst = []
  user_melody={notes:[], totalTime:8}

  noteOne(evt) {
    //   this.setState()
    this.state = {value: evt.target.id}
    console.log("you clicked this");
    const showP = document.getElementById(this.props.className);
    console.log(showP)
    // console.log("wow my value is" + this.state.value)
    showP.innerHTML = this.state.value

    // console.log(this.props.className)
   
    }
  
  getPitchValue(evt) {
    // this.state = {value: evt.target.value}
    // console.log(this.state.value) 
    
      
      let pOne = $("input[name='pitches-one']:checked").val();
      let pTwo =  $("input[name='pitches-two']:checked").val();
      let pThree = $("input[name='pitches-three']:checked").val();
      let pFour = $("input[name='pitches-four']:checked").val();
      let pFive = $("input[name='pitches-five']:checked").val();
      let pSix = $("input[name='pitches-six']:checked").val();
      let pSev = $("input[name='pitches-sev']:checked").val();
      let pEight = $("input[name='pitches-eight']:checked").val();
   
    
    user_melody = {notes:[
        {pitch: pOne, startTime:0.0, endTime:1},
        {pitch: pTwo, startTime:1.0, endTime:2},
        {pitch: pThree, startTime:2.0, endTime:3},
        {pitch: pFour, startTime:3.0, endTime:4},
        {pitch: pFive, startTime:4.0, endTime:5},
        {pitch: pSix, startTime:5.0, endTime:6},
        {pitch: pSev, startTime:6.0, endTime:7},
        {pitch: pEight, startTime:7.0, endTime:8}],
        totalTime:8}
  
      viz = new mm.PianoRollCanvasVisualizer(user_melody, canvasPianoRoll);



  }
    
  handleChange = (evt)=>{
    this.noteOne(evt);
    this.getPitchValue(evt);
}
    



    



   
    
    
  


  render() {
    return(
      <div>   
        <div>
          <label className = "btn btn-secondary active"> 
            <input type="radio" name={this.props.name} id="C3" className={this.props.className} onChange={this.handleChange}  defaultChecked value="48"/>C3
          
            </label> 
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="D3" className={this.props.className}  onChange={this.handleChange} value="50"/>D3 
          </label>
                    
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="E3" className={this.props.className}  onChange={this.handleChange} value="52"/>E3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="F3" className={this.props.className}  onChange={this.handleChange} value="53"/>F3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="G3" className={this.props.className}  onChange={this.handleChange} value="55"/>G3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="A3" className={this.props.className}  onChange={this.handleChange} value="57"/>A3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="B3" className={this.props.className}  onChange={this.handleChange} value="59"/>B3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="C4" className={this.props.className}  onChange={this.handleChange} value="60"/>C4
          </label>
        
         </div>

         <div id="display"></div>
      </div>
    );
  }
}

class App extends React.Component{

  // get notes off of input form note object with pitch numbers
// use react to get input
    
}

ReactDOM.render(
    (
      <div>
        <CurrentNote name="pitches-one" className="one" />
        <CurrentNote name="pitches-two" className="two" />
        <CurrentNote name="pitches-three" className="three" />
        <CurrentNote name="pitches-four" className="four" />
        <CurrentNote name="pitches-five" className="five" />
        <CurrentNote name="pitches-six" className="six" />
        <CurrentNote name="pitches-sev" className="sev" />
        <CurrentNote name="pitches-eight" className="eight" />
      </div>
    ),
    document.getElementById('show-pitches')
)

