import React, { useEffect, useState } from "react";
import "./ItemList.scss";
import compose from "recompose/compose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import InfiniteScroll from "react-infinite-scroller";
import { useTranslation } from "react-i18next";
import { getBrands, getColors, getSizes } from "../../component/header/selectors";
import FilterPanel from "../../component/filterPanel/FilterPanel";
import {
    fetchItems as fetchItemsActionCreator,
    resetData as resetDataActionCreator,
    setCategoryId as setCategoryIdActionCreator,
    setGender as setGenderActionCreator,
    setSizeId as setSizeActionCreator,
    setColorId as setColorActionCreator,
    setBrandId as setBrandIdActionCreator,
    setSortingColumn as setSortingColumnActionCreator,
    setSortingOrder as setSortingOrderActionCreator,
    setMinPrice as setMinPriceActionCreator,
    setMaxPrice as setMaxPriceActionCreator,
    resetList as resetListActionCreator,
    saveFilters as saveFiltersActionCreator,
    fetchSavedFilters as fetchSavedFiltersActionCreator,
    fetchFiltersById as fetchFiltersByIdActionCreator,
    setOnlyFollowedUsers as setOnlyFollowedUsersActionCreator
} from "./action/itemList";
import {
    getActiveFilters, getFiltersLoading, getItemListItems, getLoading, getNextItemId, getSavedFilters
} from "./selectors";
import ItemPreview from "../../component/itemPreview/ItemPreview";
import { CategoryService } from "../../service/CategoryService";
import Progress from "../../component/progress/Progress";
import { ItemService } from "../../service/ItemService";
import { UserService } from "../../service/UserService";

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
    activeFilters: getActiveFilters(state),
    savedFilters: getSavedFilters(state),
    filtersLoading: getFiltersLoading(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchItems: fetchItemsActionCreator,
    resetData: resetDataActionCreator,
    setCategoryId: setCategoryIdActionCreator,
    setGender: setGenderActionCreator,
    setBrand: setBrandIdActionCreator,
    setSize: setSizeActionCreator,
    setColor: setColorActionCreator,
    setSortingColumn: setSortingColumnActionCreator,
    setSortingOrder: setSortingOrderActionCreator,
    setOnlyFollowedUsers: setOnlyFollowedUsersActionCreator,
    resetList: resetListActionCreator,
    setMinPrice: setMinPriceActionCreator,
    setMaxPrice: setMaxPriceActionCreator,
    saveFilters: saveFiltersActionCreator,
    fetchSavedFilters: fetchSavedFiltersActionCreator,
    fetchFiltersById: fetchFiltersByIdActionCreator
}, dispatch);

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withStyles(styles)
);

const ItemList = ({
    brands,
    colors,
    fetchItems,
    itemList,
    classes,
    history,
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
    setMinPrice,
    setMaxPrice,
    saveFilters,
    fetchSavedFilters,
    savedFilters,
    filtersLoading,
    fetchFiltersById,
    setOnlyFollowedUsers
}) => {
    const [sizesUngrouped, setSizesUngrouped] = useState([]);
    const [priceExtremeValues, setPriceExtremeValues] = useState({});
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    useEffect(() => {
        setLoggedIn(UserService.validateToken(UserService.currentUserValue));
        fetchItems();
        CategoryService.getSizesUngrouped().then((response) => response.json()).then((json) => setSizesUngrouped(json));
        ItemService.getPriceExtremeValues().then((response) => response.json()).then((json) => setPriceExtremeValues(json));
    }, [fetchItems, fetchSavedFilters]);
    useEffect(() => {
        if (UserService.validateToken(UserService.currentUserValue)) {
            fetchSavedFilters();
        }
    }, [fetchItems, fetchSavedFilters]);
    const filters = activeFilters.filter((e) => e.name !== "sortingColumn" && e.name !== "sortingOrder");

    const canSaveFilter = isLoggedIn && (filters.length > 0);

    const { t } = useTranslation();

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
                priceExtremeValues={priceExtremeValues}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                saveFilters={saveFilters}
                savedFilters={savedFilters}
                canSaveFilter={canSaveFilter}
                filtersLoading={filtersLoading}
                fetchFiltersById={fetchFiltersById}
                fetchSavedFilters={fetchSavedFilters}
                setOnlyFollowedUsers={setOnlyFollowedUsers}
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
                        <span className="no-content-info">
                            {t("No items found")}
                            {" "}
                        </span>
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
    brands: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types
    // eslint-disable-next-line react/forbid-prop-types
    colors: PropTypes.array,
    fetchItems: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    itemList: PropTypes.array.isRequired,
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
        progress: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({}).isRequired,
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
    setMinPrice: PropTypes.func.isRequired,
    setMaxPrice: PropTypes.func.isRequired,
    saveFilters: PropTypes.func.isRequired,
    setOnlyFollowedUsers: PropTypes.func.isRequired,
    fetchSavedFilters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    savedFilters: PropTypes.array,
    filtersLoading: PropTypes.bool.isRequired,
    fetchFiltersById: PropTypes.func.isRequired
};

ItemList.defaultProps = {
    nextItemId: null,
    brands: [],
    colors: [],
    savedFilters: []
};

export default enhance(ItemList);
