import React from 'react';

import Button from 'react-bootstrap/Button';

export default class MyButton extends React.Component {
    constructor(props) {
        super(props)
        this.notSelected = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
        this.selected = "bg-blue-500  font-semibold text-white py-2 px-4 border border-transparent rounded";
    }

    state = { isSelected: false }

    // Switch from outline to solid background button
    switchAppearance = () => {
        this.setState({ isSelected: !this.state.isSelected })
    }

    onClick = () => {
        this.props.whenPressed(); 
        this.switchAppearance();
    }

    render() {
        const selectedClass = this.state.isSelected || this.props.solid 
                              ? this.selected : this.notSelected;
        return (
            <Button className= { selectedClass } 
                id={this.props.buttonId} onClick= { this.onClick }>
                {this.props.buttonId}
            </Button>
        )
    }
}