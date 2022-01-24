import React, { useEffect, useState } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getSubcategories } from "../header/selectors";

const CategoryUngroupedPopover = ({
    classes,
    categories,
    setCategory,
    onClose
}) => {
    const [content, setContent] = useState([]);
    const [previousContent, setPreviousContent] = useState([]);
    const [currentContentId, setCurrentContentId] = useState(0);
    const [currentSelected, setCurrentSelected] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
        setContent(categories);
    }, [categories]);

    content.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    return (
        <Box sx={{ bgcolor: "#F0EFEB", height: "auto" }}>
            <nav aria-label="main mailbox folders">
                { currentContentId > 0 && (
                    <>
                        <ListItem disablePadding className={classes.addNewCategory}>
                            <ListItemButton
                                classes={{
                                    root: classes.addCategory
                                }}
                                disableRipple
                                onClick={() => {
                                    setCategory(currentSelected);
                                    onClose();
                                }}
                            >
                                <AddIcon />
                            </ListItemButton>
                        </ListItem>
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
                                            {t(previousContent.filter((e) => e.contentId === currentContentId - 1)[0].contentName)}
                                        </Typography>
                                )}
                                />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
                <List>
                    { content && content.map((element) => (
                        <div key={element.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    disableRipple
                                    onClick={() => {
                                        setCurrentSelected(element);
                                        if (element.subCategories.length !== 0) {
                                            setPreviousContent(
                                                [...previousContent, {
                                                    contentId: currentContentId,
                                                    contentName: t(element.name),
                                                    content
                                                }]
                                            );
                                            setContent(element.subCategories);
                                            setCurrentContentId(currentContentId + 1);
                                        } else if (element.subCategories.length === 0) {
                                            setCategory(element);
                                            onClose();
                                        }
                                    }}
                                >
                                    <ListItemText
                                        disableTypography
                                        primary={<Typography variant="body2" className={classes.field}>{t(element.name)}</Typography>}
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
        goBackButton: PropTypes.string.isRequired,
        addNewCategory: PropTypes.string.isRequired,
        addCategory: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    categories: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired,
    setCategory: PropTypes.func
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
        paddingTop: 0
    },
    addNewCategory: {
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        paddingTop: "0.5rem"
    },
    addCategory: {
        display: "flex !important",
        width: "100%",
        justifyContent: "flex-end !important"
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

CategoryUngroupedPopover.propTypes = propTypes;

CategoryUngroupedPopover.defaultProps = {
    setCategory: undefined,
};

export default enhance(CategoryUngroupedPopover);
