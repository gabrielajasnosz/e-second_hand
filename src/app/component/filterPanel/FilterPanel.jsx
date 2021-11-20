import React from "react";
import "./FilterPanel.scss";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslation } from "react-i18next";
import TextButton from "../button/TextButton";
import CategoryPopover from "../popoverContent/CategoryPopover";
import PopoverCustom from "../popoverContent/PopoverCustom";
import AutocompleteContent from "../popoverContent/AutocompleteContent";
import ListPopoverContent from "../popoverContent/ListPopoverContent";
import ChipCustom from "../chip/ActiveFilterChip";
import PriceRangeContent from "../popoverContent/PriceRangeContent";
import SavedFilters from "../savedFilters/SavedFilters";

const sortingColumns = [{
    id: "creationDate",
    name: "Creation date"
},
{
    id: "price",
    name: "Price"
}];

const sortingOrders = [{
    id: "DESC",
    name: "Descending"
},
{
    id: "ASC",
    name: "Ascending"
}];

const emptyObject = {
    id: null,
    name: null
};

const emptyObjectBrand = {
    value: null,
    label: null
};

// eslint-disable-next-line no-unused-vars
const FilterPanel = ({
    sizes,
    brands,
    colors,
    setCategory,
    setGender,
    // eslint-disable-next-line no-unused-vars
    setBrand, setSize, setColor, setSortingColumn, setSortingOrder, activeFilters, priceExtremeValues,
    setMinPrice,
    setMaxPrice,
    savedFilters,
    saveFilters,
    canSaveFilter,
    filtersLoading,
    fetchFiltersById
}) => {
    const [anchorCategory, setAnchorCategory] = React.useState(null);
    const [anchorPriceRange, setAnchorPriceRange] = React.useState(null);
    const [anchorBrand, setAnchorBrand] = React.useState(null);
    const [anchorSize, setAnchorSize] = React.useState(null);
    const [anchorColor, setAnchorColor] = React.useState(null);
    const [anchorSortingColumn, setAnchorSortingColumn] = React.useState(null);
    const [anchorSortingOrder, setAnchorSortingOrder] = React.useState(null);
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation();

    const handleClick = (event, element) => {
        if (element === "category") {
            setAnchorCategory(event.currentTarget);
        }
        if (element === "brand") {
            setAnchorBrand(event.currentTarget);
        }
        if (element === "color") {
            setAnchorColor(event.currentTarget);
        }
        if (element === "size") {
            setAnchorSize(event.currentTarget);
        }
        if (element === "sortingColumn") {
            setAnchorSortingColumn(event.currentTarget);
        }
        if (element === "sortingOrder") {
            setAnchorSortingOrder(event.currentTarget);
        }
        if (element === "priceRange") {
            setAnchorPriceRange(event.currentTarget);
        }
    };
    const handleClose = (element) => {
        if (element === "category") {
            setAnchorCategory(null);
        }
        if (element === "brand") {
            setAnchorBrand(null);
        }
        if (element === "color") {
            setAnchorColor(null);
        }
        if (element === "size") {
            setAnchorSize(null);
        }
        if (element === "sortingColumn") {
            setAnchorSortingColumn(null);
        }
        if (element === "sortingOrder") {
            setAnchorSortingOrder(null);
        }
        if (element === "priceRange") {
            setAnchorPriceRange(null);
        }
    };
    const openCategory = Boolean(anchorCategory);
    const openSortingColumn = Boolean(anchorSortingColumn);
    const openSortingOrder = Boolean(anchorSortingOrder);
    const openPriceRange = Boolean(anchorPriceRange);
    const openBrand = Boolean(anchorBrand);
    const openColor = Boolean(anchorColor);
    const openSize = Boolean(anchorSize);
    const categoryId = openCategory ? "simple-popover" : undefined;
    const sortingColumnId = openSortingColumn ? "simple-popover" : undefined;
    const sortingOrderId = openSortingOrder ? "simple-popover" : undefined;
    // eslint-disable-next-line no-unused-vars
    const sizeId = openSize ? "simple-popover" : undefined;
    const brandId = openBrand ? "simple-popover" : undefined;
    // eslint-disable-next-line no-unused-vars
    const colorId = openColor ? "simple-popover" : undefined;
    const priceRangeId = openPriceRange ? "simple-popover" : undefined;

    // eslint-disable-next-line implicit-arrow-linebreak
    return (
        <div>
            <div className="filter-panel-container">
                <div className="filters">
                    <TextButton onClick={(event) => handleClick(event, "category")}>
                        <span>{t("Category")}</span>
                        <ArrowDropDownOutlinedIcon />
                    </TextButton>
                    <PopoverCustom
                        id={categoryId}
                        open={openCategory}
                        anchor={anchorCategory}
                        onClose={() => { handleClose("category"); }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <CategoryPopover
                            openContext="ITEM_LIST"
                            sex="UNDEFINED"
                            onClose={() => { handleClose("category"); }}
                            setSex={setGender}
                            setType={() => {}}
                            setCategory={setCategory}
                        />
                    </PopoverCustom>
                    <TextButton onClick={(event) => handleClick(event, "brand")}>
                        <span>{t("Brand")}</span>
                        <ArrowDropDownOutlinedIcon />
                    </TextButton>
                    <PopoverCustom
                        id={brandId}
                        open={openBrand}
                        anchor={anchorBrand}
                        onClose={() => { handleClose("brand"); }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <AutocompleteContent list={brands} onClick={setBrand} />
                    </PopoverCustom>
                    <TextButton onClick={(event) => handleClick(event, "size")}>
                        <span>{t("Size")}</span>
                        <ArrowDropDownOutlinedIcon />
                    </TextButton>
                    <PopoverCustom
                        id={sizeId}
                        open={openSize}
                        anchor={anchorSize}
                        onClose={() => { handleClose("size"); }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <ListPopoverContent list={sizes} onClick={setSize} />
                    </PopoverCustom>
                    <TextButton onClick={(event) => handleClick(event, "color")}>
                        <span>{t("Color")}</span>
                        <ArrowDropDownOutlinedIcon />
                    </TextButton>
                    <PopoverCustom
                        id={colorId}
                        open={openColor}
                        anchor={anchorColor}
                        onClose={() => { handleClose("color"); }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <ListPopoverContent list={colors} onClick={setColor} />
                    </PopoverCustom>
                </div>
                <div className="filters">
                    <TextButton onClick={(event) => handleClick(event, "sortingColumn")}>
                        <span>{t("Sort by")}</span>
                        <ArrowDropDownOutlinedIcon />
                    </TextButton>
                    <PopoverCustom
                        id={sortingColumnId}
                        open={openSortingColumn}
                        anchor={anchorSortingColumn}
                        onClose={() => { handleClose("sortingColumn"); }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <ListPopoverContent list={sortingColumns} onClick={setSortingColumn} />
                    </PopoverCustom>
                    <TextButton onClick={(event) => handleClick(event, "sortingOrder")}>
                        <span>{t("Sorting order")}</span>
                        <ArrowDropDownOutlinedIcon />
                    </TextButton>
                    <PopoverCustom
                        id={sortingOrderId}
                        open={openSortingOrder}
                        anchor={anchorSortingOrder}
                        onClose={() => { handleClose("sortingOrder"); }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <ListPopoverContent list={sortingOrders} onClick={setSortingOrder} />
                    </PopoverCustom>
                    <TextButton onClick={(event) => handleClick(event, "priceRange")}>
                        <span>{t("Price range")}</span>
                        <ArrowDropDownOutlinedIcon />
                    </TextButton>
                    <PopoverCustom
                        id={priceRangeId}
                        open={openPriceRange}
                        anchor={anchorPriceRange}
                        onClose={() => { handleClose("priceRange"); }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <PriceRangeContent
                            priceExtremeValues={priceExtremeValues}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                        />
                    </PopoverCustom>
                </div>
            </div>

            <div className="filters-subpanel">
                <div className="active-filters">
                    {activeFilters && activeFilters.length > 0 && (
                        activeFilters.map((e) => {
                            if (e.name === "sortingColumn") {
                                return <ChipCustom activeFilter={e} />;
                            }
                            if (e.name === "sortingOrder" && e.value === "DESC") {
                                return <ChipCustom activeFilter={e} icon={<ArrowCircleDownIcon />} />;
                            }
                            if (e.name === "sortingOrder" && e.value === "ASC") {
                                return <ChipCustom activeFilter={e} icon={<ArrowCircleUpIcon />} />;
                            }
                            if (e.name === "categoryName") {
                                return (
                                    <ChipCustom
                                        activeFilter={e}
                                        onDelete={() => {
                                            setGender(null);
                                            setCategory(emptyObject);
                                        }}
                                        deleteIcon={<HighlightOffIcon />}
                                    />
                                );
                            }
                            if (e.name === "colorName") {
                                return <ChipCustom activeFilter={e} onDelete={() => setColor(emptyObject)} deleteIcon={<HighlightOffIcon />} />;
                            }
                            if (e.name === "sizeName") {
                                return <ChipCustom activeFilter={e} onDelete={() => setSize(emptyObject)} deleteIcon={<HighlightOffIcon />} />;
                            }
                            if (e.name === "brandName") {
                                return (
                                    <ChipCustom
                                        activeFilter={e}
                                        onDelete={() => setBrand(emptyObjectBrand)}
                                        deleteIcon={<HighlightOffIcon />}
                                    />
                                );
                            }
                            if (e.name === "minPrice") {
                                const maxPrice = activeFilters.filter((x) => x.name === "maxPrice")[0].value;
                                return (
                                    <ChipCustom
                                        activeFilter={e}
                                        maxPrice={maxPrice}
                                        onDelete={() => {
                                            setMinPrice(null);
                                            setMaxPrice(null);
                                        }}
                                        deleteIcon={<HighlightOffIcon />}
                                    />
                                );
                            }
                            return null;
                        })
                    )}
                </div>
                <SavedFilters
                    saveFilters={saveFilters}
                    savedFilters={savedFilters}
                    canSaveFilter={canSaveFilter}
                    filtersLoading={filtersLoading}
                    fetchFiltersById={fetchFiltersById}
                />
            </div>
        </div>

    );
};
FilterPanel.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    brands: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types
    sizes: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types
    colors: PropTypes.array,
    setCategory: PropTypes.func.isRequired,
    setGender: PropTypes.func.isRequired,
    setBrand: PropTypes.func.isRequired,
    setSize: PropTypes.func.isRequired,
    setColor: PropTypes.func.isRequired,
    setSortingColumn: PropTypes.func.isRequired,
    setSortingOrder: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    activeFilters: PropTypes.array.isRequired,
    changeBrand: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    priceExtremeValues: PropTypes.object.isRequired,
    setMinPrice: PropTypes.func.isRequired,
    setMaxPrice: PropTypes.func.isRequired,
    saveFilters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    savedFilters: PropTypes.array,
    canSaveFilter: PropTypes.bool.isRequired,
    filtersLoading: PropTypes.bool.isRequired,
    fetchFiltersById: PropTypes.func.isRequired
};

FilterPanel.defaultProps = {
    brands: [],
    sizes: [],
    colors: [],
    savedFilters: []
};

export default FilterPanel;
