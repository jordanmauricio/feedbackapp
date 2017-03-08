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
        // this.pushAnswers = this.pushAnswers.bind(this);
        // this.sendData = this.sendData.bind(this);
        this.callback = this.callback.bind(this);
        // this.sleep = this.sleep.bind(this);

        this.data = {
            "id": "anotherProject",
            "title": "Unicarriers",
            "description": "As part of TRIMM's commitment to providing the best possible service to our clients, we kindly request you to fill out this short questionnaire regarding our performance in our last sprint.",
            "questions": [
                {
                    "name": "proactive",
                    "question": "To which extent would you consider TRIMM to be a proactive partner to work with?",
                    "answers": [
                        {
                            "answer": "Terrible",
                            "value": "1",
                        },
                        {
                            "answer": "Bad",
                            "value": "2",
                        },
                        {
                            "answer": "Neutral",
                            "value": "3",
                        },
                        {
                            "answer": "Good",
                            "value": "4",
                        },
                        {
                            "answer": "Excellent",
                            "value": "5",
                        },
                        
                    ]
                },

                {
                    "name": "sprint",
                    "question": "How satisfied are you with the results of the past sprint?",
                    "answers": [
                        {
                            "answer": "Terrible",
                            "value": "1",
                        },
                        {
                            "answer": "Bad",
                            "value": "2",
                        },
                        {
                            "answer": "Neutral",
                            "value": "3",
                        },
                        {
                            "answer": "Good",
                            "value": "4",
                        },
                        {
                            "answer": "Excellent",
                            "value": "5",
                        },
                        
                    ]
                },

                {
                    "name": "budget",
                    "question": "How satisfied are you with the provided budget updates?",
                    "answers": [
                        {
                            "answer": "Terrible",
                            "value": "1",
                        },
                        {
                            "answer": "Bad",
                            "value": "2",
                        },
                        {
                            "answer": "Neutral",
                            "value": "3",
                        },
                        {
                            "answer": "Good",
                            "value": "4",
                        },
                        {
                            "answer": "Excellent",
                            "value": "5",
                        },
                    ]
                }
            ]
        };

        this.state = {
            questionCount: 1,
            submitClass: "",
        };

        this.selectedOptions = [];
        for(let question of this.data.questions){
            this.selectedOptions.push({"name": question.name, "value": false});
        } 
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

        this.setState({ submitClass: "processing" });

        this.selectedOptions.map((answer) => {
            var immediatelyAvailableReference = base.push(`${this.data.id}/answers`, {
                data: answer,
                then: this.callback
            });
            //available immediately, you don't have to wait for the callback to be called
            var generatedKey = immediatelyAvailableReference.key;
        });
    }

    callback(err) {
        if(!err){
            //console.log("callback fn");
            this.setState({ submitClass: "doneProcessing" });
            document.querySelector( "#submitButton h4" ).textContent = "Done";
        }
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

            <div id="introduction-text"><img src="/TRIMM.svg" alt="TRIMM logo"/><h1>{this.data.title}</h1><br/><h3>{this.data.description}</h3></div>

            <ul id="currentQuestion">{this.generateQuestions()}</ul>

            <div id="submitButton" onClick={this.handleSubmit}><h4 className={`defaultButton ${this.state.submitClass}`}>Submit</h4></div>
        </div>
        );
    }
}

export default App;