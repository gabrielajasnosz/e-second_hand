import React from "react";
import PropTypes from "prop-types";
import "./BasicButton.scss";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
    }).isRequired,
    component: PropTypes.string
};

const styles = {
    root: {
        color: "#6b705c",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        "&:hover, &:focus": {
            outline: "none"
        }
    },
};

const defaultProps = {
    disabled: false,
    component: undefined
};

const TextButton = ({
    onClick, disabled, children, classes, component
}) => (
    <Button
        disabled={disabled}
        onClick={onClick}
        component={component}
        classes={{
            root: classes.root
        }}
    >
        {children}
    </Button>

);

TextButton.propTypes = propTypes;
TextButton.defaultProps = defaultProps;

export default withStyles(styles)(TextButton);
