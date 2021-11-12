import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    setCategory as setCategoryActionCreator,
    setCategoryId as setCategoryIdActionCreator,
    setType as setTypeActionCreator,
    setSex as setSexActionCreator
} from "../addItem/action/newItem";
import { getSubcategories } from "../header/selectors";
import {
    setEditedItemCategoryGender as setEditedItemCategoryGenderActionCreator,
    setEditedItemProductType as setEditedItemTypeActionCreator,
    setEditedItemCategory as setEditedItemCategoryActionCreator,
    setEditedItemSize as setEditedItemSizeActionCreator
} from "../itemDetails/action/editedItem";
import { getEditedItemType } from "../itemDetails/selectors";

const propTypes = {
    classes: PropTypes.shape({
        field: PropTypes.string.isRequired,
        fieldBack: PropTypes.string.isRequired,
        subcategory: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        goBackButton: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    categories: PropTypes.any.isRequired,
    sex: PropTypes.string.isRequired,
    openContext: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    setCategoryId: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setSex: PropTypes.func.isRequired,
    setCategoryGender: PropTypes.func.isRequired,
    setItemType: PropTypes.func.isRequired,
    setItemCategory: PropTypes.func.isRequired,
    setItemSize: PropTypes.func.isRequired,
    productType: PropTypes.number
};
const styles = {
    field: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
        width: "9rem"
    },
    fieldBack: {
        textTransform: "capitalize",
        color: "#393938",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
        paddingLeft: "1rem"
    },
    subcategory: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
        width: "10rem",
        marginLeft: "2.5rem !important"
    },
    img: {
        height: "20px",
        marginRight: "1rem"
    },
    icon: {
        color: "#393938",
        fontSize: "20px",
    },
    goBackButton: {
        paddingTop: "0.5rem"
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setCategory: setCategoryActionCreator,
    setCategoryId: setCategoryIdActionCreator,
    setType: setTypeActionCreator,
    setSex: setSexActionCreator,
    setCategoryGender: setEditedItemCategoryGenderActionCreator,
    setItemType: setEditedItemTypeActionCreator,
    setItemCategory: setEditedItemCategoryActionCreator,
    setItemSize: setEditedItemSizeActionCreator

}, dispatch);

const mapStateToProps = (state) => ({
    categories: getSubcategories(state),
    productType: getEditedItemType(state)
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withStyles(styles)
);

const CategoryPopover = ({
    classes,
    categories,
    sex,
    openContext,
    setCategory,
    onClose, setType, setSex, setCategoryId, setCategoryGender, setItemType, setItemCategory, productType, setItemSize
}) => {
    const [content, setContent] = useState([]);
    const [previousContent, setPreviousContent] = useState([]);
    const [currentContentId, setCurrentContentId] = useState(0);
    const [gender, setGender] = useState(sex);

    const genderArray = useMemo(() => [{
        gender: "UNDEFINED",
        id: 1001,
        name: "WOMAN",
        parentId: null,
        subCategories: categories
    }, {
        gender: "UNDEFINED",
        id: 1002,
        name: "MAN",
        parentId: null,
        subCategories: categories
    }], [categories]);

    useEffect(() => {
        if (gender === "UNDEFINED") {
            setContent(genderArray);
        } else {
            setContent(categories);
        }
    }, [categories, gender, genderArray, setContent]);

    const filteredContent = useMemo(() => content.filter((e) => gender && (e.gender === gender.toUpperCase() || e.gender === "UNDEFINED")),
        [content, gender]);
    filteredContent.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    return (
        <Box sx={{ bgcolor: "#F0EFEB", height: "auto" }}>
            <nav aria-label="main mailbox folders">
                { currentContentId > 0 && (
                <ListItem disablePadding className={classes.goBackButton}>
                    <ListItemButton
                        disableRipple
                        onClick={() => {
                            setContent(previousContent.filter((e) => e.contentId === currentContentId - 1)[0].content);
                            setCurrentContentId(currentContentId - 1);
                        }}
                    >
                        <KeyboardArrowLeftIcon />
                        <ListItemText
                            disableTypography
                            primary={(
                                <Typography
                                    variant="body2"
                                    className={classes.fieldBack}
                                >
                                    {previousContent.filter((e) => e.contentId === currentContentId - 1)[0].contentName}
                                </Typography>
)}
                        />
                    </ListItemButton>
                </ListItem>
                )}
                <List>
                    { filteredContent && filteredContent.map((element) => (
                        <div key={element.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    disableRipple
                                    onClick={() => {
                                        if (element.subCategories.length !== 0 && openContext === "HEADER") {
                                            const subcategories = Array.from(element.subCategories);
                                            subcategories.push({
                                                gender: gender.toUpperCase(),
                                                id: 1000,
                                                name: "All",
                                                parentId: element.id,
                                                subCategories: []
                                            });
                                            setPreviousContent(
                                                [...previousContent, {
                                                    contentId: currentContentId,
                                                    contentName: element.name,
                                                    content: filteredContent
                                                }]
                                            );
                                            setContent(subcategories);
                                            setCurrentContentId(currentContentId + 1);
                                            if (currentContentId === 0) {
                                                setType(element.name);
                                            }
                                        } else if (element.subCategories.length !== 0) {
                                            setPreviousContent(
                                                [...previousContent, {
                                                    contentId: currentContentId,
                                                    contentName: element.name,
                                                    content: filteredContent
                                                }]
                                            );
                                            if (gender === "UNDEFINED") {
                                                setGender(element.name.toUpperCase());
                                            }
                                            if (openContext === "ITEM") {
                                                if (currentContentId === 0) {
                                                    setSex(element.name);
                                                }
                                                if (currentContentId === 1) {
                                                    setType(element.id);
                                                }
                                            }
                                            if (openContext === "EDIT_ITEM") {
                                                if (currentContentId === 0) {
                                                    setCategoryGender(element.name);
                                                }
                                                if (currentContentId === 1) {
                                                    if (productType !== element.id) {
                                                        setItemSize(null);
                                                    }
                                                    setItemType(element.id);
                                                }
                                            }

                                            setContent(element.subCategories);
                                            setCurrentContentId(currentContentId + 1);
                                        } else if (element.subCategories.length === 0) {
                                            if (openContext === "ITEM") {
                                                setCategory(element);
                                                setCategoryId(element.id);
                                                onClose();
                                            }
                                            if (openContext === "EDIT_ITEM") {
                                                setItemCategory(element.name);
                                                setCategoryGender(element.gender);
                                                onClose();
                                            }
                                        }
                                    }}
                                >
                                    <ListItemText
                                        disableTypography
                                        primary={<Typography variant="body2" className={classes.field}>{element.name}</Typography>}
                                    />
                                    {element.subCategories.length !== 0 && (
                                        <KeyboardArrowRightIcon />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        </div>
                    ))}
                </List>
            </nav>
        </Box>
    );
};

CategoryPopover.propTypes = propTypes;

CategoryPopover.defaultProps = {
    productType: 0,
};

export default enhance(CategoryPopover);
