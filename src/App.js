import React, { Component } from "react";
import "./App.css";
import Question from "./Question";

class App extends Component {

    constructor(props){
        super(props);
        this.handleSelections = this.handleSelections.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToNext = this.goToNext.bind(this);

        this.data = {
            "title": "Client Name",
            "description": "This will be our introduction text",
            "questions": [
                {
                    "name": "product",
                    "question": "Are YOU happy with our product?",
                    "answers": [
                        {
                            "answer": "Fanstastic!",
                            "value": "fantastic",
                        },
                        {
                            "answer": "Absolutely shit.",
                            "value": "shit",
                        }
                        
                        
                    ]
                },

                {
                    "name": "scrum",
                    "question": "How did YOU find our Scrum process?",
                    "answers": [
                        {
                            "answer": "Excellent!",
                            "value": "excellent",
                        },
                        {
                            "answer": "Never again.",
                            "value": "never",
                        },
                        
                    ]
                },

                {
                    "name": "bridge",
                    "question": "What's your opinion on the plausibility of the Einstein-Rosen bridge?",
                    "answers": [
                        {
                            "answer": "Everyone forgets about Ludwig!",
                            "value": "ludwig"
                        },
                        {
                            "answer": "Does Schwarzschild even HAVE a first name?",
                            "value": "schwarzschild"
                        }
                    ]
                }
            ]
        };

        this.state = {
            pageCount: -1,
        };

        this.selectedOptions = [
            { "name": "product", "value":false },
            { "name": "scrum", "value":false },
            { "name": "bridge", "value":false }
        ];

        this.currentQuestion = "";
    }

    handleSelections(value, name){
        this.selectedOptions.map((obj) => {
            if(obj.name === name){
                return obj.value = value;
            }
        });
    }

    handleSubmit(){
        //send to Firebase
        console.log(this.selectedOptions);

    }

    goToNext(){
    
        const button = document.querySelector( "#nextButton" );
        button.innerHTML = "Continue";

        this.setState({ pageCount: this.state.pageCount+1 });

        //bar counter
        let headerCounter = ((this.state.pageCount+1)/3)*100;
        document.querySelector( "#block-counter" ).style.width=headerCounter + "%";

    }

    render() {
        if( this.state.pageCount !== -1) {
            this.currentQuestion = this.state.pageCount < 3 ? <Question
                        name={this.data.questions[this.state.pageCount].name}
                        question={this.data.questions[this.state.pageCount].question}
                        answers={this.data.questions[this.state.pageCount].answers}
                        key={this.data.questions[this.state.pageCount].name}
                        options={this.handleSelections}
                    /> : <h1><div onClick={this.handleSubmit}>Submit</div></h1>; 
        }

        return (
        <div className="questionsList">
            <div id="block-counter"></div>

            <ul id="currentQuestion">{this.currentQuestion}</ul>

            <div id="nextButton" onClick={this.goToNext}>Start</div>
        </div>
        );
    }
}

export default App;