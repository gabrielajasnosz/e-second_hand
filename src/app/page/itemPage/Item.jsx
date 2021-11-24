import React, { useEffect } from "react";
import { useParams } from "react-router";
import "./Item.scss";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImageListContainer from "../../component/imageList/ImageListContainer";
import {
    getItem as getItemActionCreator,
} from "./action/item";
import { getItemDetails } from "./selectors";
import ItemDetails from "../../component/itemDetails/ItemDetails";

const mapStateToProps = (state) => ({
    item: getItemDetails(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getItem: getItemActionCreator,
}, dispatch);

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps)
);

const Item = ({ item, getItem, history }) => {
    const { id } = useParams();

    useEffect(() => {
        getItem(id);
    }, [getItem, id]);

    return (
        <div className="content">
            <ItemDetails history={history} />
            { item.itemPictures && <ImageListContainer images={item.itemPictures} /> }
        </div>
    );
};

Item.propTypes = {
    getItem: PropTypes.func.isRequired,
    item: PropTypes.shape({
        // eslint-disable-next-line react/forbid-prop-types
        itemPictures: PropTypes.array,
        id: PropTypes.number
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired
};

export default enhance(Item);
