import React from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import { MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import TextInput from "../input/TextInput";
import BasicButton from "../button/BasicButton";
import SelectInput from "../input/SelectInput";
import {
    setSize as setSizeActionCreator,
    setPrice as setPriceActionCreator
} from "./action/newItem";
import { getNewItemSize, getNewItemPrice } from "./selectors";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSize: setSizeActionCreator,
    setPrice: setPriceActionCreator,
}, dispatch);

const mapStateToProps = (state) => ({
    newItemSize: getNewItemSize(state),
    newItemPrice: getNewItemPrice(state),
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setSize: ({ setSize }) => (e) => setSize(e.target.value),
        setPrice: ({ setPrice }) => (e) => setPrice(e.target.value)
    }))
);

const AddItemImage = ({
    classes, setSize, setPrice, newItemSize, newItemPrice
}) => (
    <>
        <div className="form-floating mb-3  step-content">
            <span className={classes.cssLabelName}>Size *</span>
            <SelectInput label={null} onChange={setSize} defaultValue={newItemSize}>
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
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabelName}>Price *</span>
            <TextInput label={null} onChange={setPrice} defaultValue={newItemPrice} endAdornment />
        </div>
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabelName}>Add pictures *</span>
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
        cssLabelName: PropTypes.string.isRequired,
    }).isRequired,
    setSize: PropTypes.func.isRequired,
    setPrice: PropTypes.func.isRequired,
    newItemSize: PropTypes.string.isRequired,
    newItemPrice: PropTypes.string.isRequired
};

AddItemImage.propTypes = propTypes;

export default enhance(AddItemImage);
