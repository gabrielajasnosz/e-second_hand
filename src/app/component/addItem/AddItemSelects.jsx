import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import "./AddItem.scss";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import ListSubheader from "@material-ui/core/ListSubheader";
import SelectInput from "../input/SelectInput";
import AutocompleteInput from "../input/AutocompleteInput";
import { setBrand as setBrandActionCreator, setColor as setColorActionCreator, setCategory as setCategoryActionCreator } from "./action/newItem";
import {
    getNewItemBrand, getNewItemCategory, getNewItemColor, getSex, getType
} from "./selectors";
import { getBrands, getSubcategories } from "../header/selectors";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setBrand: setBrandActionCreator,
    setCategory: setCategoryActionCreator,
    setColor: setColorActionCreator,
}, dispatch);

const mapStateToProps = (state) => ({
    newItemBrand: getNewItemBrand(state),
    newItemColor: getNewItemColor(state),
    newItemCategory: getNewItemCategory(state),
    brands: getBrands(state),
    categories: getSubcategories(state),
    type: getType(state),
    sex: getSex(state)
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setColor: ({ setColor }) => (e) => setColor(e.target.value),
        setBrand: ({ setBrand }) => (e) => setBrand(e.target.value),
        setCategory: ({ setCategory }) => (e) => setCategory(e.target.value),
    }))
);

const AddItemSelects = ({
    classes, setBrand, setColor, setCategory, newItemBrand, newItemColor, newItemCategory, brands, categories, type, sex
}) => (
    <>
        <div className="form-floating mb-3 step-content">
            <span className={classes.cssLabelName}>Brand *</span>
            <AutocompleteInput onChange={setBrand} defaultValue={newItemBrand} passedOptions={brands} />
        </div>
        <div className="form-floating mb-3  step-content">
            <span className={classes.cssLabelName}>Category *</span>
            <SelectInput label={null} onChange={setCategory} defaultValue={newItemCategory}>
                {categories[type][sex].map((item) => [
                    <ListSubheader key={item.id}>{item.name}</ListSubheader>,
                    item.subcategories.map((subItem) => (
                        <MenuItem key={subItem.id} value={subItem.id}>
                            {subItem.name}
                        </MenuItem>
                    ))
                ])}
            </SelectInput>
        </div>
        <div className="form-floating mb-3  step-content">
            <span className={classes.cssLabelName}>Color *</span>
            <SelectInput label={null} onChange={setColor} defaultValue={newItemColor}>
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
        cssLabel: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
        cssOutlinedInput: PropTypes.string.isRequired,
        cssFocused: PropTypes.string.isRequired,
        notchedOutline: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        descriptionInput: PropTypes.string.isRequired,
        userIcon: PropTypes.string.isRequired
    }).isRequired,
    setCategory: PropTypes.func.isRequired,
    setColor: PropTypes.func.isRequired,
    setBrand: PropTypes.func.isRequired,
    newItemBrand: PropTypes.string.isRequired,
    newItemColor: PropTypes.string.isRequired,
    newItemCategory: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    brands: PropTypes.any.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    categories: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired
};

AddItemSelects.propTypes = propTypes;

export default enhance(AddItemSelects);
