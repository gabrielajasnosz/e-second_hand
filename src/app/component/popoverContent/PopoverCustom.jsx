import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Popover from "@mui/material/Popover";

const styles = {
    paper: {
        width: "20rem",
        maxHeight: "20rem",
        overflow: "auto",
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
    },
};

const PopoverCustom = ({
    id, open, anchor, onClose, children, classes, anchorOrigin
}) => (
    <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        classes={{
            paper: classes.paper
        }}
    >
        {children}
    </Popover>
);

PopoverCustom.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({
        paper: PropTypes.string.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    anchor: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    anchorOrigin: PropTypes.shape({}).isRequired

};
export default withStyles(styles)(PopoverCustom);
