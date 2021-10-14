import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { getCategories } from "../header/selectors";

const propTypes = {
    classes: PropTypes.shape({
        field: PropTypes.string.isRequired,
        subcategory: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
    }).isRequired,
    categories: PropTypes.shape({}).isRequired,
    sex: PropTypes.string.isRequired
};

const styles = {
    field: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
        width: "9rem"
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
    }
};

const mapStateToProps = (state) => ({
    categories: getCategories(state),
});

const enhance = compose(
    connect(mapStateToProps,
        null),
    withStyles(styles)
);

const CategoryPopover = ({
    classes, categories, sex
}) => {
    const [content, setContent] = useState(null);
    const categoriesArray = ["clothes", "shoes", "accessories"];
    const [showSubcategories, setShowSubcategories] = useState({
        show: false,
        categoryId: null,
    });
    useEffect(() => () => {
        setContent(null);
    }, [sex]);
    return (
        <Box sx={{ bgcolor: "#F0EFEB", height: "auto" }}>
            <nav aria-label="main mailbox folders">
                {content === null ? (
                    <List>
                        {categoriesArray.map((element) => (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        disableRipple
                                        onClick={() => {
                                            const categoriesByType = categories[element];
                                            if (categoriesByType[sex]) {
                                                setContent(categoriesByType[sex]);
                                            }
                                        }}
                                    >
                                        <img className={classes.img} src={`${process.env.PUBLIC_URL}/categoryIcons/${element}.png`} alt="lol" />
                                        <ListItemText
                                            disableTypography
                                            primary={<Typography variant="body2" className={classes.field}>{element}</Typography>}
                                        />
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ))}

                    </List>
                ) : (
                    <List>
                        { content.map((element) => (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        disableRipple
                                        onClick={() => setShowSubcategories({ show: !showSubcategories.show, categoryId: element.id })}
                                    >
                                        <img className={classes.img} src={`${process.env.PUBLIC_URL}/categoryIcons/${element.name}.png`} alt="lol" />
                                        <ListItemText
                                            disableTypography
                                            primary={<Typography variant="body2" className={classes.field}>{element.name}</Typography>}
                                        />
                                        <ListItemIcon>
                                            {!(element.subcategories
                                                && showSubcategories.show
                                                && showSubcategories.categoryId === element.id) ? (<KeyboardArrowDownIcon />) : (<ArrowDropUpIcon />)}
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                                {element.subcategories && showSubcategories.show && showSubcategories.categoryId === element.id && (
                                    <>
                                        { element.subcategories.map((e) => (
                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    disableRipple
                                                    onClick={() => {}}
                                                >
                                                    <ListItemText
                                                        disableTypography
                                                        primary={<Typography variant="body2" className={classes.subcategory}>{e.name}</Typography>}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </>
                                )}
                            </>
                        ))}
                    </List>
                ) }
            </nav>
        </Box>
    );
};

CategoryPopover.propTypes = propTypes;

export default enhance(CategoryPopover);
