import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Popover from "@mui/material/Popover";

const styles = {
    paper: {
        width: "20rem",
        height: "auto",
        backgroundColor: "#F0EFEB !important",
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
    id: PropTypes.number,
    open: PropTypes.bool.isRequired,
    anchor: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    anchorOrigin: PropTypes.shape({}).isRequired

};

PopoverCustom.defaultProps = {
    id: undefined,
    anchor: null
};
export default withStyles(styles)(PopoverCustom);
