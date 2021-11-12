import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import "./AddItem.scss";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import Popover from "@material-ui/core/Popover";
import EditIcon from "@mui/icons-material/Edit";
import SelectInput from "../input/SelectInput";
import AutocompleteInput from "../input/AutocompleteInput";
import {
    setBrand as setBrandActionCreator,
    setColor as setColorActionCreator,
    setCategory as setCategoryActionCreator,
    setSex as setSexActionCreator,
    setType as setTypeActionCreator
} from "./action/newItem";
import {
    getNewItemBrand, getNewItemCategory, getNewItemColor, getNewItemSex, getType
} from "./selectors";
import { getBrands, getColors } from "../header/selectors";
import BasicButton from "../button/BasicButton";
import CategoryPopover from "../popoverContent/CategoryPopover";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setBrand: setBrandActionCreator,
    setCategory: setCategoryActionCreator,
    setColor: setColorActionCreator,
    setSex: setSexActionCreator,
    setType: setTypeActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    newItemBrand: getNewItemBrand(state),
    newItemColor: getNewItemColor(state),
    newItemCategory: getNewItemCategory(state),
    newItemSex: getNewItemSex(state),
    brands: getBrands(state),
    type: getType(state),
    colors: getColors(state)
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setColor: ({ setColor }) => (e) => setColor(e.target.value),
        setBrand: ({ setBrand }) => (e) => setBrand(e.target.value),
        changeSex: ({ setSex }) => (e) => setSex(e.target.value),
    }))
);

const AddItemSelects = ({
    classes, setBrand, setColor, newItemBrand, newItemColor, newItemCategory, brands, colors, setSex, newItemSex, setType, changeSex, setCategory
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

    return (
        <>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>Brand *</span>
                <AutocompleteInput onChange={setBrand} defaultValue={newItemBrand} passedOptions={brands} />
            </div>
            { newItemCategory === "" ? (
                <div className="form-floating mb-3 step-button">
                    <span className={classes.cssLabelName}>Category *</span>
                    <BasicButton onButtonClick={handleClickGender} label="Choose category" buttonClassName="select-button">
                        <span> Choose category </span>
                    </BasicButton>
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
                        <CategoryPopover
                            openContext="ITEM"
                            sex="UNDEFINED"
                            onClose={handleCloseGender}
                            setSex={setSex}
                            setType={setType}
                            setCategory={setCategory}
                        />
                    </Popover>
                </div>
            ) : (
                <div className="form-floating mb-3 step-content">
                    <span className={classes.cssLabelName}>Category *</span>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                    <div className={classes.chosenCategory} role="button" onClick={handleClickGender} tabIndex={0}>
                        <span className={classes.cssLabelCategory}>{newItemCategory.name}</span>
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
                        <CategoryPopover
                            openContext="ITEM"
                            sex="UNDEFINED"
                            onClose={handleCloseGender}
                            setSex={setSex}
                            setType={setType}
                            setCategory={setCategory}
                        />
                    </Popover>
                </div>
            ) }
            { newItemCategory !== "" && newItemCategory.gender === "UNDEFINED" && (
                <div className="form-floating mb-3  step-content">
                    <span className={classes.cssLabelName}>Gender *</span>
                    <SelectInput label={null} onChange={changeSex} defaultValue={newItemSex}>
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
                <span className={classes.cssLabelName}>Color *</span>
                <SelectInput label={null} onChange={setColor} defaultValue={newItemColor}>
                    {colors.map((e) => (
                        <MenuItem value={e.id} className={classes.cssLabel} key={e.id}>
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
        </>
    );
};

const propTypes = {
    classes: PropTypes.shape({
        cssLabel: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
        userIcon: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
        chosenCategory: PropTypes.string.isRequired,
        editIcon: PropTypes.string.isRequired,
        cssLabelCategory: PropTypes.string.isRequired
    }).isRequired,
    setColor: PropTypes.func.isRequired,
    setBrand: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    newItemBrand: PropTypes.string.isRequired,
    newItemColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    newItemSex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    newItemCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        name: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired
    })]).isRequired,
    changeSex: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    brands: PropTypes.any.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    setSex: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    colors: PropTypes.any.isRequired
};

AddItemSelects.propTypes = propTypes;

export default enhance(AddItemSelects);
