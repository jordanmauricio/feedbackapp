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

        this.data;
        this.selectedOptions = [];
            
        this.state = {
            questionCount: 1,
            submitClass: "",
        };

    }

    componentWillMount(){
        base.fetch("unicarriersQuestionnaire", {
            context: this,
            asArray: true,
            then(data){
                this.data = data;
                this.generateQuestions(this.data);
            }
        });

        //console.log(this.data);
    }

    handleSelections(value, name){
        this.selectedOptions.map((obj) => {
            if(obj.name === name){
                return obj.value = value;
            }
            return null;
        });

        let count = 0;
        for( value of this.selectedOptions){
            if (value.value !== false) {
                count++;
            }
        }
        this.setState({ questionCount: count });

        //bar counter
        let headerCounter = (count/3)*100;
        document.querySelector( "#block-counter" ).style.width= headerCounter + "%";

        //smooth transition animations
        let nextSlide;
        if( count !== this.data.questions.length ){
            nextSlide = this.data.questions[count].name;
        } else {
            nextSlide = "submitButton";
        }

        TweenLite.to(window, 0.4, {scrollTo:`#${nextSlide}`});
    }

    handleSubmit(){
        //data check
        console.log(this.selectedOptions);

        this.setState({ submitClass: "processing" });

        //send to Firebase
        this.selectedOptions.map((answer) => {
            var immediatelyAvailableReference = base.push(`${this.data.id}/answers`, {
                data: answer,
                then: this.resolveForThisCallback
            });
            //available immediately, you don't have to wait for the callback to be called
            var generatedKey = immediatelyAvailableReference.key;
        });
    }

    resolveForThisCallback(err) {
        //todo: Set error message here
        if(!err){
            this.setState({ submitClass: "doneProcessing" });
            return document.querySelector( "#submitButton h4" ).textContent = "Done";
        }
    }

    generateQuestions(data){

        //generate empty values
        for(let question of data.questions){
            this.selectedOptions.push({"name": question.name, "value": false});
        } 

        return data.questions.map((question) => {
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
            {/*<Questionnaire />*/}
            <div id="block-counter"></div>

            <div id="introduction-text"><img src="/TRIMM.svg" alt="TRIMM logo"/><h1>{this.data.title}</h1><br/><h3>{this.data.description}</h3></div>

            <ul id="currentQuestion">{this.generateQuestions()}</ul>

            <div id="submitButton" onClick={this.handleSubmit}><h4 className={`defaultButton ${this.state.submitClass}`}>Submit</h4></div>
        </div>
        );
    }
}

export default App;