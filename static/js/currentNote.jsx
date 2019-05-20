



class CurrentNote extends React.Component {
        
//   constructor() {
//       super();
      
//       this.state  =  {value:'♩'};
//   }

  noteOne = (evt)=> {
    //   this.setState()
    this.state = {value: evt.target.id}
    console.log("you clicked this");
    const showP =document.getElementById(this.props.className);
    console.log(showP)
    showP.innerHTML = this.state.value
  }
  
    
  render() {
    return(
      <div>   
        <div>
          <label className = "btn btn-secondary active"> 
            <input type="radio" name={this.props.name} id="C3" className={this.props.className} onChange={this.noteOne} defaultChecked value="48"/>C3
          
            </label> 
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="D3" className={this.props.className}  onChange={this.noteOne} value="50"/>D3 
          </label>
                    
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="E3" className={this.props.className}  onChange={this.noteOne} value="52"/>E3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="F3" className={this.props.className}  onChange={this.noteOne} value="53"/>F3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="G3" className={this.props.className}  onChange={this.noteOne} value="55"/>G3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="A3" className={this.props.className}  onChange={this.noteOne} value="57"/>A3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="B3" className={this.props.className}  onChange={this.noteOne} value="59"/>B3
          </label>
          
          <label className="btn btn-secondary">
            <input type="radio" name={this.props.name} id="C4" className={this.props.className}  onChange={this.noteOne} value="60"/>C4
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

