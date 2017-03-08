import React from "react";
import base from "./base";

export default class Questionnaire extends React.Component {

    render(){

        this.data = {"id": "anotherProject",
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

        var immediatelyAvailableReference = base.push('unicarriersQuestionnaire', {
                            data: this.data,
                            then(err){
                            if(!err){
                                console.log("Success");
                            }
                        }
        });
            //available immediately, you don't have to wait for the callback to be called
            var generatedKey = immediatelyAvailableReference.key;
    
        
        return(
            <div></div>
        );
    }
    }