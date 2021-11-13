import React, { useEffect, useState } from "react";
import "./ItemList.scss";
import compose from "recompose/compose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import InfiniteScroll from "react-infinite-scroller";
import withHandlers from "recompose/withHandlers";
import debounce from "lodash/debounce";
import { getBrands, getColors, getSizes } from "../../component/header/selectors";
import FilterPanel from "../../component/filterPanel/FilterPanel";
import {
    fetchItems as fetchItemsActionCreator,
    resetData as resetDataActionCreator,
    setCategoryId as setCategoryIdActionCreator,
    setGender as setGenderActionCreator,
    setBrand as setBrandActionCreator,
    setSizeId as setSizeActionCreator,
    setColorId as setColorActionCreator,
    setSortingColumn as setSortingColumnActionCreator,
    setSortingOrder as setSortingOrderActionCreator,
    setMinPrice as setMinPriceActionCreator,
    setMaxPrice as setMaxPriceActionCreator,
    resetList as resetListActionCreator
} from "./action/itemList";
import {
    getActiveFilters, getItemListItems, getLoading, getNextItemId
} from "./selectors";
import ItemPreview from "../../component/itemPreview/ItemPreview";
import { CategoryService } from "../../service/CategoryService";
import Progress from "../../component/progress/Progress";
import { ItemService } from "../../service/ItemService";

const styles = {
    root: {
        height: "18rem !important",
        width: "12rem !important",

        "@media only screen and (max-width: 600px)": {
            height: "18vh !important",
            width: "12vh !important",
            marginRight: "0 !important"
        }
    },
    progress: {
        color: "#cb997e !important"
    }
};

const mapStateToProps = (state) => ({
    brands: getBrands(state),
    colors: getColors(state),
    sizes: getSizes(state),
    itemList: getItemListItems(state),
    nextItemId: getNextItemId(state),
    isLoading: getLoading(state),
    activeFilters: getActiveFilters(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchItems: fetchItemsActionCreator,
    resetData: resetDataActionCreator,
    setCategoryId: setCategoryIdActionCreator,
    setGender: setGenderActionCreator,
    changeBrand: setBrandActionCreator,
    setSize: setSizeActionCreator,
    setColor: setColorActionCreator,
    setSortingColumn: setSortingColumnActionCreator,
    setSortingOrder: setSortingOrderActionCreator,
    resetList: resetListActionCreator,
    setMinPrice: setMinPriceActionCreator,
    setMaxPrice: setMaxPriceActionCreator
}, dispatch);

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => {
        const debouncedSetBrand = debounce((changeBrand, e) => changeBrand(e.target.value), 500);
        return {
            setBrand: ({ changeBrand }) => (e) => debouncedSetBrand(changeBrand, e),
        };
    }),
    withStyles(styles)
);

const ItemList = ({
    brands,
    colors,
    fetchItems,
    itemList,
    classes,
    history,
    // eslint-disable-next-line no-unused-vars
    resetList,
    resetData,
    nextItemId,
    setCategoryId,
    setGender,
    isLoading,
    setBrand,
    setSize,
    setColor,
    setSortingColumn,
    setSortingOrder,
    activeFilters,
    changeBrand,
    setMinPrice,
    setMaxPrice
}) => {
    const [sizesUngrouped, setSizesUngrouped] = useState([]);
    const [priceExtremeValues, setPriceExtremeValues] = useState({});
    useEffect(() => {
        fetchItems();
        CategoryService.getSizesUngrouped().then((response) => response.json()).then((json) => setSizesUngrouped(json));
        ItemService.getPriceExtremeValues().then((response) => response.json()).then((json) => setPriceExtremeValues(json));
    }, [fetchItems]);
    useEffect(() => () => {
        resetData();
    }, [resetData]);
    return (
        <div className="item-list">
            <FilterPanel
                brands={brands}
                sizes={sizesUngrouped}
                colors={colors}
                setCategory={setCategoryId}
                setGender={setGender}
                setBrand={setBrand}
                setSize={setSize}
                setColor={setColor}
                setSortingColumn={setSortingColumn}
                setSortingOrder={setSortingOrder}
                activeFilters={activeFilters}
                changeBrand={changeBrand}
                priceExtremeValues={priceExtremeValues}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
            />
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchItems}
                hasMore={nextItemId !== null && isLoading === false}
            >
                {itemList && (
                    <div className="image-list">
                        {itemList.map((item) => <ItemPreview history={history} item={item} classes={classes} />)}
                    </div>
                )}
                {itemList.length === 0 && isLoading === false && (
                    <div className="item-loader">
                        <span className="no-content-info"> No items found </span>
                    </div>
                )}
                {isLoading && (
                    <Progress />
                )}
            </InfiniteScroll>
        </div>
    );
};

ItemList.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    brands: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    sizes: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    colors: PropTypes.array.isRequired,
    fetchItems: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    itemList: PropTypes.array.isRequired,
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
        progress: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.string.isRequired,
    resetData: PropTypes.func.isRequired,
    nextItemId: PropTypes.number,
    setCategoryId: PropTypes.func.isRequired,
    setGender: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setBrand: PropTypes.func.isRequired,
    setSize: PropTypes.func.isRequired,
    setColor: PropTypes.func.isRequired,
    setSortingColumn: PropTypes.func.isRequired,
    setSortingOrder: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    activeFilters: PropTypes.array.isRequired,
    resetList: PropTypes.func.isRequired,
    changeBrand: PropTypes.func.isRequired,
    setMinPrice: PropTypes.func.isRequired,
    setMaxPrice: PropTypes.func.isRequired
};

ItemList.defaultProps = {
    nextItemId: null
};

export default enhance(ItemList);
