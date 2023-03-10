import React, {Component} from "react";

import "./item-add-form.css";

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        });
    };

    onSubmitValues = (event) => {
        event.preventDefault();
        this.props.onItemAdded(this.state.label)

        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <>
                <form className="item-add-form d-flex"
                        onSubmit={this.onSubmitValues}>
                    <input type="text"
                           className="form-control"
                           onChange={this.onLabelChange}
                           placeholder="What needs to be done"
                           value={this.state.label}
                    />
                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.onSubmitValues}
                            >
                        Send
                    </button>
                </form>

            </>
        )
    }
}