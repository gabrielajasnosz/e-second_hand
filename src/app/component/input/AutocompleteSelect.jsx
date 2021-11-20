import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";

const customStyles = {
    // eslint-disable-next-line no-unused-vars
    option: (state) => ({
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        height: "35px",
        display: "flex",
        padding: "8px 16px",
        alignItems: "center",
        alignContent: "center",
        textTransform: "capitalize",
        backgroundColor: "#F0EFEB",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            cursor: "pointer"
        }
    }),
    indicatorsContainer: () => ({
        display: "none"
    }),
    singleValue: () => ({
        display: "none"
    }),
    // eslint-disable-next-line no-unused-vars
    control: (state) => ({
        backgroundColor: "#F0EFEB",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        height: "50px",
        borderRadius: ".3rem",
        border: "2px #a5a58d solid",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        width: "17rem"
    }),
    placeholder: () => ({
        display: "none"
    }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: "11rem"
    }),
    // eslint-disable-next-line no-unused-vars
    menu: (state) => ({
        // none of react-select's styles are passed to <Control />
        margin: 0,
        borderRadius: ".3rem",
        boxShadow: "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
        backgroundColor: "#F0EFEB",
        overflow: "hidden",
    }),
};

const AutocompleteSelect = ({ options, onChange }) => (
    <div style={{
        height: "15rem", width: "18rem", display: "flex", justifyContent: "center"
    }}
    >
        <Select
            onChange={onChange}
            options={options}
            styles={customStyles}
            menuIsOpen
        />
    </div>
);

AutocompleteSelect.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired
};

AutocompleteSelect.defaultProps = {
    options: []
};

export default AutocompleteSelect;
