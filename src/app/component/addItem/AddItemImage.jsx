import React from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import TextInput from "../input/TextInput";
import BasicButton from "../button/BasicButton";

const AddItemImage = ({ classes }) => (
    <>
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabel}>Brand *</span>
            <TextInput label={null} onChange={() => {}} />
        </div>
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabel}>Price *</span>
            <TextInput label={null} onChange={() => {}} endAdornment />
        </div>
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabel}>Add pictures *</span>
            <input
                accept="image/*"
                id="contained-button-file"
                multiple
                hidden
                type="file"
                onChange={() => {}}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="contained-button-file">
                <BasicButton onButtonClick={() => {}}>Load images</BasicButton>
            </label>
        </div>
    </>
);

const propTypes = {
    classes: PropTypes.shape({
        cssLabel: PropTypes.string.isRequired,
    }).isRequired,
};

AddItemImage.propTypes = propTypes;

export default AddItemImage;
