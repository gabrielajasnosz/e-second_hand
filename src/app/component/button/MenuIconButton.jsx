import React from "react";
import PropTypes from "prop-types";
import "./BasicButton.scss";
import MenuIcon from "@material-ui/icons/Menu";
import classnames from "classnames";

const propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    buttonClassName: PropTypes.string,
    disabled: PropTypes.bool,
};

const defaultProps = {
    disabled: false,
    buttonClassName: "submit-button",
};

const MenuIconButton = ({
    onButtonClick, label, buttonClassName, disabled,
}) => (
    <button
        onClick={onButtonClick}
        className={classnames("icon-button", buttonClassName)}
        disabled={disabled}
        title={label}
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="true"
        aria-label="Toggle navigation"
    >
        <MenuIcon />
    </button>
);

MenuIconButton.propTypes = propTypes;
MenuIconButton.defaultProps = defaultProps;

export default MenuIconButton;
