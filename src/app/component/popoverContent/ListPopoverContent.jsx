import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    field: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
        width: "9rem"
    },
    root: {
        height: "20rem",
        overflow: "auto",
        background: "#F0EFEB"
    }
};

const ListPopoverContent = ({ list, onClick, classes }) => (
    <List classes={{ root: classes.root }}>
        {/* eslint-disable-next-line array-callback-return */}
        {list.map((element) => (
            <div key={element.id}>
                <ListItem disablePadding>
                    <ListItemButton
                        disableRipple
                        onClick={onClick}
                    >
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="body2" className={classes.field}>{element.name}</Typography>}
                        />
                    </ListItemButton>
                </ListItem>
            </div>
        ))}
    </List>
);

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
