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
        this.selectedOptions = {};
        this.areQuestionsReceived = "Loading";
        this.title = "Loading";
        this.desc = "Loading";

        this.state = {
            questionCount: 1,
            submitClass: "",
            receivedData: false,
        };

    }

    componentWillMount(){
        base.fetch("DeJongEnLaan/questions", {
            context: this,
            asArray: true,
            then(data){
                this.data = data[0];
                console.log(this.data);
                 //generate empty values
                for(let question of this.data.questions){
                    this.selectedOptions[question.name] = false;
                }
                this.contentChecker();
                this.setState({ receivedData: true });
            }
        });
    }

    handleSelections(value, name){

       // console.log("Before set: ", this.selectedOptions);
        //console.log(name);
        //set selections
        for(let key in this.selectedOptions){
            console.log(name, key);   
            //console.log(`Initial obj: ${this.selectedOptions[name]}`)
            //if(this.selectedOptions.hasOwnProperty(name)){
            if(key === name){
               // console.log("Should log once");
               // console.log(`${this.selectedOptions[name]} is being assigned ${value}`)
                this.selectedOptions[name] = value;
            }
        }

        //console.log("After set: ", this.selectedOptions);

        //bar counter
        let count = 0;
        for( let key in this.selectedOptions){
            //console.log("The keys: ", this.selectedOptions[key]);
            if (this.selectedOptions[key] !== false) {
                count++;
                //console.log("Inside the if: ", count);
            }
        }
        //this.setState({ questionCount: count });

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
        //console.log(this.selectedOptions);

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
       // let counter = 0;
        return this.data.questions.map((question) => {
            //counter++;
            //console.log("NAME BEING INSERTED: #", counter, " ", question.name);
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
        if(this.state.receivedData === true){
            TweenLite.to(window, 1, {scrollTo:`#${this.data.questions[0].name}`});
        }
    }

    contentChecker(){
        
        //if( this.state.receivedData === true ){
        this.areQuestionsReceived = this.generateQuestions();
        this.title = `${this.data.title}`;
        this.desc = `${this.data.description}`;
        //} 
    }

    render() {

        return (
        <div className="questionsList">
            {/*<Questionnaire />*/}
            <div id="block-counter"></div>

            <div id="introduction-text">
                <div className="svgWrapper">
                    <img src="/TRIMM.svg" alt="TRIMM logo" style={{width:100 + "%"}}/>
                </div>
                <h1>{this.title}</h1><br/>
                <h3>{this.desc}</h3><br />
                <div id="startButton" onClick={this.handleStart}><h4 className="defaultButton">Start</h4></div>
            </div>

            <ul id="currentQuestion">{this.areQuestionsReceived}</ul>

            <div id="submitButton" onClick={this.handleSubmit}><h4 className={`defaultButton ${this.state.submitClass}`}>Submit</h4></div>
        </div>
        );
    }
}

export default App;