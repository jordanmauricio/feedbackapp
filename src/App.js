import React, { Component } from "react";
import "./App.css";
import Question from "./Question";
import base from "./base";

class App extends Component {

    constructor(props){
        super(props);
        this.handleSelections = this.handleSelections.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateQuestions = this.generateQuestions.bind(this);

        this.data = {
            "id": "projectId",
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
            questionCount: 1,
        };

        this.selectedOptions = [
            { "name": "product", "value":false },
            { "name": "scrum", "value":false },
            { "name": "bridge", "value":false }
        ];

    }

    handleSelections(value, name){
        this.selectedOptions.map((obj) => {
            if(obj.name === name){
                return obj.value = value;
            }
            return null;
        });

        //bar counter
        let headerCounter = (this.state.questionCount/3)*100;
        document.querySelector( "#block-counter" ).style.width= headerCounter + "%";

        this.setState({ questionCount: this.state.questionCount+1 });
        window.scrollBy(0, window.innerHeight);
    }

    handleSubmit(){
        //send to Firebase
        console.log(this.selectedOptions);
        // this.selectedOptions.forEach((answer) => {
        //     var immediatelyAvailableReference = base.push(`${this.data.id}/answers`, {
        //         data: answer,
        //         then(err){
        //             if(!err){
        //                 console.log("Firebase sent.");
        //             }
        //         }
        //     });
        //     //available immediately, you don't have to wait for the callback to be called
        //     immediatelyAvailableReference.key = answer.name;
        // });
    }

    generateQuestions(){

        return this.data.questions.map((question) => {
            return <Question
                        name={question.name}
                        question={question.question}
                        answers={question.answers}
                        key={question.name}
                        options={this.handleSelections}
                    />;
        });

    }

    render() {

        return (
        <div className="questionsList">
            <div id="block-counter"></div>

            <div id="introduction-text"><img src="/TRIMM.svg"/><h1>{this.data.title}</h1><br/><h3>{this.data.description}</h3></div>

            <ul id="currentQuestion">{this.generateQuestions()}</ul>

            <div id="submitButton" onClick={this.handleSubmit}><h1>Submit</h1></div>
        </div>
        );
    }
}

export default App;