import React from "react";
import "./UserItems.scss";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import ItemPreview from "../itemPreview/ItemPreview";
import Progress from "../progress/Progress";

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

const UserItems = ({
    items, history, classes, itemsLoading, getUserItems, nextItemId
}) => {
    const { t } = useTranslation();

    return (
        <div className="user-items-container">
            <InfiniteScroll
                pageStart={0}
                loadMore={getUserItems}
                hasMore={nextItemId !== null && itemsLoading === false}
            >
                {items && (
                    <div className="image-list">
                        {items.map((item) => <ItemPreview history={history} item={item} classes={classes} />)}
                    </div>
                )}
                {items.length === 0 && itemsLoading === false && (
                    <div className="items-container">
                        <span className="no-content-info">{t("User don't have any items added yet")}</span>
                    </div>
                )}
                {itemsLoading && (
                    <Progress />
                )}
            </InfiniteScroll>
        </div>
    );
};

UserItems.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    classes: PropTypes.shape({
        root: PropTypes.string
    }).isRequired,
    itemsLoading: PropTypes.bool.isRequired,
    getUserItems: PropTypes.func.isRequired,
    nextItemId: PropTypes.number
};

UserItems.defaultProps = {
    nextItemId: null
};

export default withStyles(styles)(UserItems);
