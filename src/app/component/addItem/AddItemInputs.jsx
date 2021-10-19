import React from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import { MenuItem } from "@material-ui/core";
import TextInput from "../input/TextInput";
import {
    setName as setNameActionCreator,
    setDescription as setDescriptionActionCreator,
    setType as setTypeActionCreator,
    setSex as setSexActionCreator
} from "./action/newItem";
import { getNewItemName, getType, getSex } from "./selectors/index";
import SelectInput from "../input/SelectInput";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setName: setNameActionCreator,
    setDescription: setDescriptionActionCreator,
    setType: setTypeActionCreator,
    setSex: setSexActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    newItemName: getNewItemName(state),
    type: getType(state),
    sex: getSex(state)
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setName: ({ setName }) => (e) => setName(e.target.value),
        setDescription: ({ setDescription }) => (e) => setDescription(e.target.value),
        setType: ({ setType }) => (e) => setType(e.target.value),
        setSex: ({ setSex }) => (e) => setSex(e.target.value),
    }))
);

const AddItemInputs = ({
    classes, setName, setDescription, newItemName, type, setType, sex, setSex
}) => (
    <>
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabelName}>Name *</span>
            <TextInput label={null} onChange={setName} defaultValue={newItemName || ""} />
        </div>
        <div className="form-floating mb-3  step-content">
            <span className={classes.cssLabelName}>Type *</span>
            <SelectInput label={null} onChange={setType} defaultValue={type}>
                <MenuItem value="clothes" className={classes.cssLabel}>
                    Clothes
                </MenuItem>
                <MenuItem value="shoes" className={classes.cssLabel}>
                    Shoes
                </MenuItem>
                <MenuItem value="accessories" className={classes.cssLabel}>
                    Accessories
                </MenuItem>
            </SelectInput>
        </div>
        <div className="form-floating mb-3  step-content">
            <span className={classes.cssLabelName}>Sex *</span>
            <SelectInput label={null} onChange={setSex} defaultValue={sex}>
                <MenuItem value="female" className={classes.cssLabel}>
                    Woman
                </MenuItem>
                <MenuItem value="male" className={classes.cssLabel}>
                    Man
                </MenuItem>
            </SelectInput>
        </div>

        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabelName}>Description</span>
            <TextInput label={null} onChange={setDescription} multiline />
        </div>
    </>
);

const propTypes = {
    classes: PropTypes.shape({
        cssLabel: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
    }).isRequired,
    setName: PropTypes.func.isRequired,
    setDescription: PropTypes.func.isRequired,
    newItemName: PropTypes.string,
    setType: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    setSex: PropTypes.func.isRequired
};

const defaultProps = {
    newItemName: null
};

AddItemInputs.defaultProps = defaultProps;

AddItemInputs.propTypes = propTypes;

export default enhance(AddItemInputs);
