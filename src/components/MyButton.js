import React from 'react';

import Button from 'react-bootstrap/Button';

export default class MyButton extends React.Component {
    constructor(props) {
        super(props)
        this.isSelected = false;
        this.notSelected = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
        this.selected = "bg-blue-500  font-semibold text-white py-2 px-4 border border-transparent rounded";
    }

    //Button background switches bwtween solid and transparent
    // TODO: Not working
    switchAppearance() {
        if (this.isSelected) {
            this.className= this.notSelected;
        } else {
            this.className= this.selected;
        }
        this.isSelected = !this.isSelected;
    }

    //I do not like this
    onClick = (event) => {
        this.props.whenPressed(); 
        this.switchAppearance();
    }

    render() {
        return (
            <Button className= {this.notSelected} 
                id={this.props.buttonId} onClick= { this.onClick }>
                {this.props.buttonId}
            </Button>
        )
    }
}