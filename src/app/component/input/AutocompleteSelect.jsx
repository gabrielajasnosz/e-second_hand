import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";

const AutocompleteSelect = ({ options, onChange, placeholder }) => {
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
                backgroundColor: "#dbdbd9",
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
            borderRadius: ".3rem",
            border: "2px #a5a58d solid",
            display: "flex",
            height: "50px",
            alignContent: "center",
            alignItems: "center",
            width: "17rem",
        }),
        placeholder: (provided) => ({
            ...provided,
            display: placeholder === null && "none",
            fontFamily: "Open Sans, sans-serif",
            fontSize: "14px",
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: "11rem",
            position: "fixed",
            zIndex: "22222222",
            width: "17rem",
            backgroundColor: "#F0EFEB",
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

    return (
        <div style={{
            width: "18rem", display: "flex", justifyContent: "center"
        }}
        >
            <Select
                onChange={onChange}
                options={options}
                styles={customStyles}
                placeholder={placeholder}
            />
        </div>
    );
};

AutocompleteSelect.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

AutocompleteSelect.defaultProps = {
    options: [],
    placeholder: null
};

export default AutocompleteSelect;
