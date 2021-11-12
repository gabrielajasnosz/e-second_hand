import React from "react";
import "./FilterPanel.scss";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import TextButton from "../button/TextButton";
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
const FilterPanel = ({ sizes, brands, colors }) => (
    <div className="filter-panel-container">
        <TextButton onClick={() => {}}>
            <span>Category</span>
            <ArrowDropDownOutlinedIcon />
        </TextButton>
        <TextButton onClick={() => {}}>
            <span>Brand</span>
            <ArrowDropDownOutlinedIcon />
        </TextButton>
        <TextButton onClick={() => {}}>
            <span>Size</span>
            <ArrowDropDownOutlinedIcon />
        </TextButton>
        <TextButton onClick={() => {}}>
            <span>Color</span>
            <ArrowDropDownOutlinedIcon />
        </TextButton>
    </div>

);

FilterPanel.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    brands: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    sizes: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    colors: PropTypes.array.isRequired
};

export default FilterPanel;
