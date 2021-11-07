import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Popover from "@material-ui/core/Popover";
import { MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { bindActionCreators } from "redux";
import withHandlers from "recompose/withHandlers";
import TextInput from "../input/TextInput";
import CategoryPopover from "../popoverContent/CategoryPopover";
import AutocompleteInput from "../input/AutocompleteInput";
import SelectInput from "../input/SelectInput";
import { getBrands, getColors, getSizes } from "../header/selectors";
import BasicButton from "../button/BasicButton";
import {
    setEditedItemName as setEditedItemNameActionCreator,
    setEditedItemDescription as setEditedItemDescriptionActionCreator,
    setEditedItemCategory as setEditedItemCategoryActionCreator,
    setEditedItemBrand as setEditedItemBrandActionCreator,
    setEditedItemColor as setEditedItemColorActionCreator,
    setEditedItemSize as setEditedItemSizeActionCreator,
    setEditedItemPrice as setEditedItemPriceActionCreator,
    setEditedItemGender as setEditedItemGenderActionCreator,
    editItem as editItemActionCreator
} from "./action/editedItem";

import { getEditedItemDetails, getEditedItemType } from "./selectors";

const styles = {
    chosenCategory: {
        display: "flex",
        flexDirection: "row",
        width: "20rem",
        border: "1px #bababa solid",
        alignItems: "center",
        borderRadius: "4px",
        textTransform: "capitalize",
        justifyContent: "space-between",
        height: "56px",
        padding: "13px",
        "&:hover": {
            borderColor: "black",
            cursor: "pointer"
        },
        "&:focus": {
            borderColor: "#a5a58d !important",
            borderWidth: "2px",
            cursor: "pointer"
        },
    },
    cssLabelCategory: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
    },
    paper: {
        width: "20rem",
        maxHeight: "20rem",
        overflow: "auto",
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
    },
    editIcon: {
        color: "#393938",
        fontSize: "22px",
        "&:hover": {
            outline: "none"
        }
    },
    backIcon: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "26px !important",
        "&:hover, &:focus": {
            outline: "none"
        },
    },
    cssLabelName: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        marginBottom: "1rem"
    },
    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        textTransform: "capitalize",
        width: "100%",
        backgroundColor: "#F0EFEB"
    },
    editButton: {
        padding: "0 8px",
        marginTop: "2rem"
    },
    back: {
        color: "rgba(0, 0, 0, 0.54)",
        marginBottom: "1rem !important",
        "&:hover, &:focus": {
            outline: "none"
        },
    }

};

const mapStateToProps = (state) => ({
    brands: getBrands(state),
    colors: getColors(state),
    sizes: getSizes(state),
    itemData: getEditedItemDetails(state),
    type: getEditedItemType(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setEditedItemName: setEditedItemNameActionCreator,
    setEditedItemDescription: setEditedItemDescriptionActionCreator,
    setEditedItemCategory: setEditedItemCategoryActionCreator,
    setEditedItemSize: setEditedItemSizeActionCreator,
    setEditedItemColor: setEditedItemColorActionCreator,
    setEditedItemPrice: setEditedItemPriceActionCreator,
    setEditedItemBrand: setEditedItemBrandActionCreator,
    setEditedItemGender: setEditedItemGenderActionCreator,
    editItem: editItemActionCreator
}, dispatch);

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withStyles(styles),
    withHandlers(() => ({
        setEditedItemName: ({ setEditedItemName }) => (e) => setEditedItemName(e.target.value),
        setEditedItemPrice: ({ setEditedItemPrice }) => (e) => setEditedItemPrice(e.target.value),
        setEditedItemDescription: ({ setEditedItemDescription }) => (e) => setEditedItemDescription(e.target.value),
        setEditedItemBrand: ({ setEditedItemBrand }) => (e) => setEditedItemBrand(e.target.value),
        setEditedItemSize: ({ setEditedItemSize }) => (e) => setEditedItemSize(e.target.value),
        setEditedItemColor: ({ setEditedItemColor }) => (e) => setEditedItemColor(e.target.value),
        setEditedItemGender: ({ setEditedItemGender }) => (e) => setEditedItemGender(e.target.value),

    }))
);

const EditItemDetails = ({
    classes,
    itemData,
    brands,
    colors,
    sizes,
    setEditedItemName,
    setEditedItemPrice,
    setEditedItemDescription,
    setEditedItemBrand,
    setEditedItemSize,
    setEditedItemColor,
    setEditedItemGender,
    setEditModeOn,
    editItem
}) => {
    const [anchorGender, setAnchorGender] = React.useState(null);

    const handleClickGender = (event) => {
        setAnchorGender(event.currentTarget);
    };

    const handleCloseGender = () => {
        setAnchorGender(null);
    };
    const openGender = Boolean(anchorGender);
    const genderId = openGender ? "simple-popover" : undefined;

    /* eslint-disable-next-line no-restricted-globals */
    const isPriceValueIncorrect = itemData.price !== "" && isNaN(itemData.price);

    const isButtonDisabled = itemData.name === "" || itemData.size === null || isPriceValueIncorrect;

    const { productType } = itemData;

    return (
        <>
            <IconButton onClick={() => setEditModeOn(false)} size="medium" className={classes.back}>
                <CloseIcon className={classes.backIcon} />
            </IconButton>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>Price *</span>
                <TextInput
                    label={null}
                    onChange={setEditedItemPrice}
                    defaultValue={itemData.price}
                    error={isPriceValueIncorrect ? "Please provide correct value" : null}
                    /* eslint-disable-next-line no-restricted-globals */
                    endAdornment
                />
            </div>
            {" "}
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>Name *</span>
                <TextInput label={null} onChange={setEditedItemName} defaultValue={itemData.name || ""} />
            </div>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>Description</span>
                <TextInput label={null} onChange={setEditedItemDescription} defaultValue={itemData.description} multiline />
            </div>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>Category *</span>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div className={classes.chosenCategory} role="button" onClick={handleClickGender} tabIndex={0}>
                    <span className={classes.cssLabelCategory}>{itemData.category}</span>
                    <EditIcon className={classes.editIcon} />
                </div>
                <Popover
                    id={genderId}
                    open={openGender}
                    anchorEl={anchorGender}
                    onClose={handleCloseGender}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    classes={{
                        paper: classes.paper
                    }}
                >
                    <CategoryPopover openContext="EDIT_ITEM" sex="UNDEFINED" onClose={handleCloseGender} />
                </Popover>
            </div>

            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>Brand *</span>
                <AutocompleteInput onChange={setEditedItemBrand} defaultValue={itemData.brand} passedOptions={brands} />
            </div>
            <div className="form-floating mb-3  step-content">
                <span className={classes.cssLabelName}>Color *</span>
                <SelectInput label={null} onChange={setEditedItemColor} defaultValue={itemData.color}>
                    {colors.map((e) => (
                        <MenuItem value={e.name} className={classes.cssLabel} key={e.id}>
                            <span style={{
                                width: "100%",
                                textTransform: "capitalize",
                                borderBottom: `2px ${e.hexCode} solid`,
                            }}
                            >
                                {e.name}
                            </span>
                        </MenuItem>
                    ))}
                </SelectInput>
            </div>
            { itemData.categoryGender === "UNDEFINED" && (
                <div className="form-floating mb-3  step-content">
                    <span className={classes.cssLabelName}>Gender *</span>
                    <SelectInput label={null} onChange={setEditedItemGender} defaultValue={itemData.gender}>
                        <MenuItem value="WOMAN" className={classes.cssLabel}>
                            Woman
                        </MenuItem>
                        <MenuItem value="MAN" className={classes.cssLabel}>
                            Man
                        </MenuItem>
                        <MenuItem value="UNDEFINED" className={classes.cssLabel}>
                            Unisex
                        </MenuItem>
                    </SelectInput>
                </div>

            )}
            <div className="form-floating mb-3  step-content">
                <span className={classes.cssLabelName}>Size *</span>
                <SelectInput label={null} onChange={setEditedItemSize} defaultValue={itemData.size}>
                    {sizes[productType].map((item) => [
                        <MenuItem key={item} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ])}
                </SelectInput>
            </div>
            <div className={classes.editButton}>
                <BasicButton onButtonClick={editItem} disabled={isButtonDisabled} label="Save changes" buttonClassName="select-button">
                    <span> Save changes </span>
                </BasicButton>
            </div>
        </>
    );
};

EditItemDetails.propTypes = {
    itemData: PropTypes.shape({
        category: PropTypes.string.isRequired,
        categoryGender: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        productType: PropTypes.string
    }).isRequired,
    classes: PropTypes.shape({
        paper: PropTypes.string.isRequired,
        chosenCategory: PropTypes.string.isRequired,
        editIcon: PropTypes.string.isRequired,
        cssLabelCategory: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
        cssLabel: PropTypes.string.isRequired,
        editButton: PropTypes.string.isRequired,
        backIcon: PropTypes.string.isRequired,
        back: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    brands: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    colors: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    sizes: PropTypes.array.isRequired,
    setEditedItemName: PropTypes.func.isRequired,
    setEditedItemPrice: PropTypes.func.isRequired,
    setEditedItemDescription: PropTypes.func.isRequired,
    setEditedItemBrand: PropTypes.func.isRequired,
    setEditedItemSize: PropTypes.func.isRequired,
    setEditedItemColor: PropTypes.func.isRequired,
    setEditedItemGender: PropTypes.func.isRequired,
    setEditModeOn: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    editItem: PropTypes.func.isRequired
};

export default enhance(EditItemDetails);
