import React from "react";
import PropTypes from "prop-types";
import "./BasicButton.scss";
import classnames from "classnames";

const propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    buttonClassName: PropTypes.string,
    disabled: PropTypes.bool,
};

const defaultProps = {
    disabled: false,
    buttonClassName: "submit-button"
};

const BasicButton = ({
    onButtonClick, label, buttonClassName, disabled, children
}) => (
    <button
        type="submit"
        onClick={onButtonClick}
        className={classnames("app-button", buttonClassName)}
        disabled={disabled}
        title={label}
    >
        {children}
    </button>
);

BasicButton.propTypes = propTypes;
BasicButton.defaultProps = defaultProps;

export default BasicButton;
