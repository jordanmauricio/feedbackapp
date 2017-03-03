import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.goToNext = this.goToNext.bind(this);

    this.state = {
      count: 0,
    }
  }

  goToNext(){
    
    const newQuestions = document.querySelector( '#newQuestions' );
    document.querySelector( '#nextButton' ).innerHTML = "Continue";

    if(newQuestions.hasChildNodes()){
      newQuestions.innerHTML = '';
    }
    
    const questions = Array.from(document.querySelector( '#temp-questions' ).childNodes);
    const question = questions.map((q) => q.innerHTML );

    if( this.state.count < questions.length){
        newQuestions.insertAdjacentHTML('afterbegin', question[this.state.count]);
        this.setState({ count: this.state.count+1 });
    } else {
        newQuestions.insertAdjacentHTML('afterbegin', "<li><h1 className='blue'>I ran out of numbers...<h1></li>");
    }
  }

  render() {
    return (
      <div className="questions">
        <ol id="temp-questions">
          <li><h1>1</h1></li>
          <li><h1>2</h1></li>
          <li><h1>3</h1></li>
        </ol>

        <ul id="newQuestions"></ul>
        <div id="nextButton" onClick={this.goToNext}>Start</div>
      </div>
    );
  }
}

export default App;