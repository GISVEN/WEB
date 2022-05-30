import React, {Component} from 'react';

class InputField extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        userInput: ''
    }

    setValue = (value) => {
        this.setState({
            userInput: value
        })
    }

    getValue = () => this.state.userInput

    render() {
        return (
            <div>
                <input type="number" value={this.state.userInput} name="sampleInput" />
            </div>
        )
    }
}


export default InputField;