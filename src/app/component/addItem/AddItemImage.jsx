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
    setPrice as setPriceActionCreator,
} from "./action/newItem";
import {
    getNewItemSize, getNewItemPrice, getType
} from "./selectors";
import { getSizes } from "../header/selectors";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSize: setSizeActionCreator,
    setPrice: setPriceActionCreator,
}, dispatch);

const mapStateToProps = (state) => ({
    newItemSize: getNewItemSize(state),
    newItemPrice: getNewItemPrice(state),
    type: getType(state),
    sizes: getSizes(state),
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
    classes, setSize, setPrice, newItemSize, newItemPrice, sizes, type,
}) => (
    <>
        { type !== "" && type !== "accessories" && (
            <div className="form-floating mb-3  step-content">
                <span className={classes.cssLabelName}>Size *</span>
                <SelectInput label={null} onChange={setSize} defaultValue={newItemSize}>
                    {sizes[type.toLowerCase()].map((item) => [
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ])}
                </SelectInput>
            </div>
        )}
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabelName}>Price *</span>
            <TextInput
                label={null}
                onChange={setPrice}
                defaultValue={newItemPrice}
                /* eslint-disable-next-line no-restricted-globals */
                error={newItemPrice !== "" && isNaN(newItemPrice) ? "Please provide correct value" : null}
                endAdornment
            />
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
    newItemSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    newItemPrice: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    sizes: PropTypes.any.isRequired,
};

AddItemImage.propTypes = propTypes;

export default enhance(AddItemImage);
