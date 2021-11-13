import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AutocompleteInput from "../input/AutocompleteInput";

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

const AutocompleteContent = ({ list, onClick }) => (
    <div style={{
        padding: "1rem 0", display: "flex", justifyContent: "center", backgroundColor: "#F0EFEB"
    }}
    >
        <AutocompleteInput onChange={onClick} defaultValue="" passedOptions={list} disableAdding attributeName="id" />
    </div>

);

AutocompleteContent.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    list: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        field: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(AutocompleteContent);
