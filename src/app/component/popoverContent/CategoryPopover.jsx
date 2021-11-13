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
import { getSubcategories } from "../header/selectors";

const CategoryPopover = ({
    classes,
    categories,
    sex,
    openContext,
    setCategory,
    // eslint-disable-next-line no-unused-vars
    onClose, setType, setSex, productType, setItemSize, history
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
            setSex(gender.toUpperCase());
            setContent(categories);
        }
    }, [categories, gender, genderArray, setContent, setSex]);

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
                                        if (element.subCategories.length !== 0) {
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
                                            if (currentContentId === 0 && setSex && openContext !== "HEADER") {
                                                setSex(element.name);
                                            }

                                            if (currentContentId === 1 && setType) {
                                                setType(element.id);

                                                if (productType && productType !== element.id && setItemSize) {
                                                    setItemSize(null);
                                                }
                                            }
                                            if (openContext !== "ITEM" && openContext !== "EDIT_ITEM") {
                                                const subcategories = Array.from(element.subCategories);
                                                subcategories.push({
                                                    gender: gender.toUpperCase(),
                                                    id: element.id,
                                                    name: `All from: ${element.name}`,
                                                    parentId: element.id,
                                                    subCategories: []
                                                });
                                                setContent(subcategories);
                                                setCurrentContentId(currentContentId + 1);
                                            } else {
                                                setContent(element.subCategories);
                                                setCurrentContentId(currentContentId + 1);
                                            }
                                        } else if (element.subCategories.length === 0) {
                                            onClose();
                                            if (openContext === "HEADER") {
                                                setCategory(element);
                                                history.push("/list");
                                                // window.location.href = ("/list");
                                            } else {
                                                setCategory(element);
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
    setCategory: PropTypes.func,
    setType: PropTypes.func,
    setSex: PropTypes.func,
    setItemSize: PropTypes.func.isRequired,
    productType: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object
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

const mapStateToProps = (state) => ({
    categories: getSubcategories(state),
});

const enhance = compose(
    connect(mapStateToProps,
        null),
    withStyles(styles)
);

CategoryPopover.propTypes = propTypes;

CategoryPopover.defaultProps = {
    productType: undefined,
    setCategory: undefined,
    setType: undefined,
    setSex: undefined,
    history: undefined
};

export default enhance(CategoryPopover);
