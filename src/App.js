import React, { Component } from "react";
import "./App.css";

class App extends Component {

    constructor(props){
        super(props);
        this.goToNext = this.goToNext.bind(this);

        this.state = {
            count: 0
        };
    }

    goToNext(){
    
        const newQuestions = document.querySelector( "#newQuestions" );
        document.querySelector( "#nextButton" ).innerHTML = "Continue";

        if(newQuestions.hasChildNodes()){
            newQuestions.innerHTML = "";
        }
    
        const questions = Array.from(document.querySelector( "#temp-questions" ).childNodes);
        const question = questions.map((q) => q.innerHTML );

        if( this.state.count < questions.length){
            newQuestions.insertAdjacentHTML("afterbegin", question[this.state.count]);
            this.setState({ count: this.state.count+1 });
        } else {
            newQuestions.insertAdjacentHTML("afterbegin", "<li><h1 className='blue'>I ran out of numbers...<h1></li>");
        }
    }

    render() {
        return (
        <div className="questions">
            <ol id="temp-questions">
            <li>
                <h1>Are YOU happy with our product?</h1>
                <br />
                <form>
                <label for="product">Fantastic!</label>
                <input type="radio" name="product" value="fantastic" />
                <label for="product">Absolutely shit.</label>
                <input type="radio" name="product" value="shit" />
                </form>
            </li>

            <li>
                <h1>How did YOU find our Scrum process?</h1>
                <br/>
                <form>
                <label for="product">Excellent!</label>
                <input type="radio" name="scrum" value="excellent"/>
                <label for="product">Never again.</label>
                <input type="radio" name="scrum" value="Never again" />
                </form>
            </li>

            <li>
                <h1>What's your opinion on the plausibility of the Einstein-Rosen bridge?</h1>
                <br />
                <form>
                <label for="bridge">Everyone forgets about Ludwig!</label>
                <input type="radio" name="bridge" value="ludwig" />
                <label for="bridge">Does Schwarzschild even HAVE a first name?</label>
                <input type="radio" name="bridge" value="schwarzschild" />
                </form>
            </li>
            </ol>

            <ul id="newQuestions"></ul>
            <div id="nextButton" onClick={this.goToNext}>Start</div>
        </div>
        );
    }
}

export default App;