import React, { Component } from "react";
import "./App.css";
import Question from "./Question";
import base from "./base";
import { TweenLite } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
// import Questionnaire from "./question-data";

class App extends Component {

    constructor(props){
        super(props);
        this.handleSelections = this.handleSelections.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateQuestions = this.generateQuestions.bind(this);
        this.resolveForThisCallback = this.resolveForThisCallback.bind(this);
        this.handleStart = this.handleStart.bind(this);

        this.data;
        this.selectedOptions = [];

        this.state = {
            questionCount: 1,
            submitClass: "",
            receivedData: false,
        };

    }

    componentWillMount(){
        base.fetch("DeJongEnLaan", {
            context: this,
            asArray: true,
            then(data){
                //
                let firstIndex = Object.keys(data[0])[0];
                this.data = data[0][firstIndex];
                this.setState({ receivedData: true });
            }
        });

        //generate empty values
        this.selectedOptions = {};
        for(let question of this.data.questions){
            this.selectedOptions[question.name] = false;
        }
    }

    handleSelections(value, name){

        //set selections
        for(var key in this.selectedOptions){
            if(this.selectedOptions.hasOwnProperty(name)){
                this.selectedOptions[name] = value;
            }
        }

        //bar counter
        let count = 0;
        for( key in this.selectedOptions){
            if (this.selectedOptions[key] !== false) {
                count++;
            }
        }
        this.setState({ questionCount: count });

        let amountOfQuestions = this.data.questions.length;
        let headerCounter = (count/amountOfQuestions)*100;
        document.querySelector( "#block-counter" ).style.width= headerCounter + "%";

        //smooth transition animations
        let nextSlide;
        if( count !== this.data.questions.length ){
            nextSlide = this.data.questions[count].name;
        } else {
            nextSlide = "submitButton";
        }

        setTimeout(function(){
            TweenLite.to(window, 1, {scrollTo:`#${nextSlide}`});
        }, 300);
    }

    handleSubmit(){
        //data check
        const timestamp = Date.now();
        this.selectedOptions["timestamp"] = timestamp;
        console.log(this.selectedOptions);

        this.setState({ submitClass: "processing" });

        //send to Firebase
        var immediatelyAvailableReference = base.push(`${this.data.id}/answers`, {
            data: this.selectedOptions,
            then: this.resolveForThisCallback
        });
        //available immediately, you don't have to wait for the callback to be called
        var generatedKey = immediatelyAvailableReference.key;
    }

    resolveForThisCallback(err) {
        //todo: Set error message here
        if(!err){
            this.setState({ submitClass: "doneProcessing" });
            return document.querySelector( "#submitButton h4" ).textContent = "Done";
        }
    }

    generateQuestions(){

        //generate empty values
        for(let question of this.data.questions){
            this.selectedOptions.push({"name": question.name, "value": false});
        }

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

    handleStart(){
        TweenLite.to(window, 1, {scrollTo:`#${this.data.questions[0].name}`});
    }

    render() {

        let areQuestionsReceived, title, desc;
        if( this.state.receivedData === true ){
            areQuestionsReceived = this.generateQuestions();
            title = `${this.data.title}`;
            desc = `${this.data.description}`;
        } else {
            areQuestionsReceived = "Loading";
            title = "Loading";
            desc = "Loading";
        }

        return (
        <div className="questionsList">
            {/*<Questionnaire />*/}
            <div id="block-counter"></div>

            <div id="introduction-text">
                <div className="svgWrapper">
                    <img src="/TRIMM.svg" alt="TRIMM logo" style={{width:100 + "%"}}/>
                </div>
                <h1>{title}</h1><br/>
                <h3>{desc}</h3><br />
                <div id="startButton" onClick={this.handleStart}><h4 className="defaultButton">Start</h4></div>
            </div>

            <ul id="currentQuestion">{areQuestionsReceived}</ul>

            <div id="submitButton" onClick={this.handleSubmit}><h4 className={`defaultButton ${this.state.submitClass}`}>Submit</h4></div>
        </div>
        );
    }
}

export default App;