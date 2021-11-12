import React from "react";
import "./FilterPanel.scss";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import TextButton from "../button/TextButton";
// eslint-disable-next-line no-unused-vars
import CategoryPopover from "../popoverContent/CategoryPopover";
// eslint-disable-next-line no-unused-vars
import PopoverCustom from "../popoverContent/PopoverCustom";
import AutocompleteContent from "../popoverContent/AutocompleteContent";

// eslint-disable-next-line no-unused-vars
const FilterPanel = ({ sizes, brands, colors }) => {
    const [anchorCategory, setAnchorCategory] = React.useState(null);
    const handleClickCategory = (event) => {
        setAnchorCategory(event.currentTarget);
    };
    const handleCloseCategory = () => {
        setAnchorCategory(null);
    };
    const openCategory = Boolean(anchorCategory);
    const categoryId = openCategory ? "simple-popover" : undefined;

    const [anchorBrand, setAnchorBrand] = React.useState(null);
    const handleClickBrand = (event) => {
        setAnchorBrand(event.currentTarget);
    };
    const handleCloseBrand = () => {
        setAnchorBrand(null);
    };
    const openBrand = Boolean(anchorBrand);
    const brandId = openBrand ? "simple-popover" : undefined;

    // eslint-disable-next-line implicit-arrow-linebreak
    return (
        <div className="filter-panel-container">
            <TextButton onClick={handleClickCategory}>
                <span>Category</span>
                <ArrowDropDownOutlinedIcon />
            </TextButton>
            <PopoverCustom
                id={categoryId}
                open={openCategory}
                anchor={anchorCategory}
                onClose={handleCloseCategory}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <CategoryPopover
                    openContext="ITEM"
                    sex="UNDEFINED"
                    onClose={handleCloseCategory}
                    setSex={() => {}}
                    setType={() => {}}
                    setCategory={() => {}}
                />
            </PopoverCustom>
            <TextButton onClick={handleClickBrand}>
                <span>Brand</span>
                <ArrowDropDownOutlinedIcon />
            </TextButton>
            <PopoverCustom
                id={brandId}
                open={openBrand}
                anchor={anchorBrand}
                onClose={handleCloseBrand}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <AutocompleteContent list={brands} onClick={() => {}} />
            </PopoverCustom>
            <TextButton onClick={() => {
            }}
            >
                <span>Size</span>
                <ArrowDropDownOutlinedIcon />
            </TextButton>
            <TextButton onClick={() => {
            }}
            >
                <span>Color</span>
                <ArrowDropDownOutlinedIcon />
            </TextButton>
        </div>
    );
};
FilterPanel.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    brands: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    sizes: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    colors: PropTypes.array.isRequired
};

export default FilterPanel;
