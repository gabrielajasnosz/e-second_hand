import React, { useEffect } from "react";
import "./ItemList.scss";
import compose from "recompose/compose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getBrands, getColors, getSizes } from "../../component/header/selectors";
import FilterPanel from "../../component/filterPanel/FilterPanel";
import {
    fetchItems as fetchItemsActionCreator,
    resetData as resetDataActionCreator
} from "./action/itemList";
import { getItemListItems, getNextItemId } from "./selectors";
import ItemPreview from "../../component/itemPreview/ItemPreview";

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
    nextItemId: getNextItemId(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchItems: fetchItemsActionCreator,
    resetData: resetDataActionCreator
}, dispatch);

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withStyles(styles)
);

const ItemList = ({
// eslint-disable-next-line no-unused-vars
    brands, sizes, colors, fetchItems, itemList, classes, history, resetData, nextItemId
}) => {
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);
    useEffect(() => () => {
        resetData();
    }, [resetData]);
    return (
        <div className="item-list">
            <FilterPanel brands={brands} sizes={sizes} colors={colors} />
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchItems}
                hasMore={nextItemId !== null}
                loader={(
                    <div className="item-loader">
                        <CircularProgress classes={{ svg: classes.progress }} />
                    </div>
)}
            >
                {itemList && (
                    <div className="image-list">
                        {itemList.map((item) => <ItemPreview history={history} item={item} classes={classes} />)}
                    </div>
                )}
                {itemList.length === 0 && (
                    <div className="item-loader">
                        <CircularProgress classes={{ svg: classes.progress }} />
                    </div>
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
    nextItemId: PropTypes.number
};

ItemList.defaultProps = {
    nextItemId: null
};

export default enhance(ItemList);
