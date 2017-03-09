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
                <div className="radioWrapper" key={answer.value}>
                    <Radio value={answer.value} id={answer.answer} />
                    <label key={answer.value} htmlFor={answer.answer} >
                        {answer.answer}
                    </label>
                    {/*<div class="check"><div class="inside"></div></div>*/}
                </div>
            );
        });
    }

    handleChange(value){
        this.props.options(value, this.props.name);
    }

    render(){
        return (
            <li>

                    <div id={this.props.name} className="anchorJump"></div>
                    <h1>{this.props.question}</h1>
                    <br />
                    <RadioGroup 
                        name={this.props.name}
                        onChange={this.handleChange}
                        className="radioGroup"
                    >
                        {this.createRadioButtons()}
                    </RadioGroup>
                
            </li>
        );
    }
}

export default Question;