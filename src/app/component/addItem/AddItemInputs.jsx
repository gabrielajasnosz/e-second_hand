import React from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import TextInput from "../input/TextInput";

const AddItemInputs = ({ classes }) => (
    <>
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabel}>Name *</span>
            <TextInput label={null} onChange={() => {}} />
        </div>
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabel}>Description</span>
            <TextInput label={null} onChange={() => {}} multiline />
        </div>
    </>
);

const propTypes = {
    classes: PropTypes.shape({
        cssLabel: PropTypes.string.isRequired,
    }).isRequired,
};

AddItemInputs.propTypes = propTypes;

export default AddItemInputs;
