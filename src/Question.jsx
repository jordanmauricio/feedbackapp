import React, {Component} from "react";
import {RadioGroup, Radio} from "react-radio-group";

class Question extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    createRadioButtons(){
        const buttons = this.props.answers;
        return buttons.map((answer) => {
            return (
                <label key={answer.value}>
                    <Radio value={answer.value}/>{answer.answer}
                </label>
            );
        });
    }

    handleChange(value){
        this.props.options(value, this.props.name);
    }

    render(){
        return (
            <li>
                <h1>{this.props.question}</h1>
                <br />
                <RadioGroup 
                    name={this.props.name}
                    onChange={this.handleChange}
                >
                    {this.createRadioButtons()}
                </RadioGroup>
            </li>
        );
    }
}

export default Question;