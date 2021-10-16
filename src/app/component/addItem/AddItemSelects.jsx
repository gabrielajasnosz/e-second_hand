import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import "./AddItem.scss";
import SelectInput from "../input/SelectInput";

const AddItemSelects = ({ classes }) => (
    <>
        <div className="form-floating mb-3  step-content">
            <span className={classes.cssLabel}>Category *</span>
            <SelectInput label={null} onChange={() => {}}>
                <MenuItem value="WOMAN" className={classes.cssLabel}>
                    Woman
                </MenuItem>
                <MenuItem value="MAN" className={classes.cssLabel}>
                    Man
                </MenuItem>
                <MenuItem value="OTHER" className={classes.cssLabel}>
                    Other
                </MenuItem>
            </SelectInput>
        </div>
        <div className="form-floating mb-3  step-content">
            <span className={classes.cssLabel}>Size *</span>
            <SelectInput label={null} onChange={() => {}}>
                <MenuItem value="WOMAN" className={classes.cssLabel}>
                    Woman
                </MenuItem>
                <MenuItem value="MAN" className={classes.cssLabel}>
                    Man
                </MenuItem>
                <MenuItem value="OTHER" className={classes.cssLabel}>
                    Other
                </MenuItem>
            </SelectInput>
        </div>
        <div className="form-floating mb-3  step-content">
            <span className={classes.cssLabel}>Color *</span>
            <SelectInput label={null} onChange={() => {}}>
                <MenuItem value="WOMAN" className={classes.cssLabel}>
                    Woman
                </MenuItem>
                <MenuItem value="MAN" className={classes.cssLabel}>
                    Man
                </MenuItem>
                <MenuItem value="OTHER" className={classes.cssLabel}>
                    Other
                </MenuItem>
            </SelectInput>
        </div>
    </>
);

const propTypes = {
    classes: PropTypes.shape({
        textField: PropTypes.string.isRequired,
        cssLabel: PropTypes.string.isRequired,
        cssOutlinedInput: PropTypes.string.isRequired,
        cssFocused: PropTypes.string.isRequired,
        notchedOutline: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        descriptionInput: PropTypes.string.isRequired,
        userIcon: PropTypes.string.isRequired
    }).isRequired,
};

AddItemSelects.propTypes = propTypes;

export default AddItemSelects;
