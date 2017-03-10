import React from "react";
import base from "./base";

export default class Questionnaire extends React.Component {

    render(){

        this.data = {"id": "DeJongEnLaan",
            "title": "JONGE' LAAN",
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

        let feedbackMessage = "Waiting to deploy";
        var immediatelyAvailableReference = base.push(this.data.id + "/questions", {
            data: this.data,
            then(err){
                console.log("Hi");
                if(!err){
                    feedbackMessage = "Successfully pushed new questionnaire.";
                } else {
                    feedbackMessage = "There was an error pushing your questionnaire.";
                }
            }
        });
            //available immediately, you don't have to wait for the callback to be called
        var generatedKey = immediatelyAvailableReference.key;
    
        
        return(
            <div><h1>{feedbackMessage}</h1></div>
        );
    }
    }