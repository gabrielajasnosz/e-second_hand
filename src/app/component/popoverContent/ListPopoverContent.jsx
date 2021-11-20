import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { useTranslation } from "react-i18next";

const styles = {
    field: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
        width: "9rem"
    },
    root: {
        height: "auto",
        maxHeight: "20rem",
        overflow: "auto",
        background: "#F0EFEB"
    }
};

const ListPopoverContent = ({ list, onClick, classes }) => {
    const { t } = useTranslation();

    return (
        <List classes={{ root: classes.root }}>
            {/* eslint-disable-next-line array-callback-return */}
            {list && list.length > 0 && list.map((element) => (
                <div key={element.id}>
                    <ListItem disablePadding>
                        <ListItemButton
                            disableRipple
                            onClick={() => onClick(element)}
                        >
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="body2" className={classes.field}>{t(element.name)}</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>
                </div>
            ))}
        </List>
    );
};

ListPopoverContent.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    list: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        field: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(ListPopoverContent);
