import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import "./ItemPreview.scss";
import Avatar from "@mui/material/Avatar";

const ItemPreview = ({ item, classes, history }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div className="item-preview" role="button" onClick={() => history.push(`/item/${item.id}`)}>
        { item.userDisplayName && (
            <div className="item-preview-author">
                <Avatar sx={{ width: 25, height: 25 }}>{item.userDisplayName.charAt(0).toUpperCase()}</Avatar>
                <span className="author">{item.userDisplayName}</span>
            </div>
        )}
        <ImageListItem key={item.id} classes={{ root: classes.root }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <img
                src={`http://localhost:8080/item/image/${item.mainImageId}?w=250&h=250&fit=crop&auto=format`}
                srcSet={`http://localhost:8080/item/image/${item.mainImageId}?w=250&h=250&fit=crop&auto=format&dpr=2 2x`}
                alt=""
                loading="lazy"
            />
        </ImageListItem>
        <span className="item-preview-price" title={item.price}>
            {item.price}
            {" "}
            PLN
        </span>
        <span className="item-preview-name" title={item.name}>
            {item.name}
        </span>
    </div>
);

ItemPreview.propTypes = {
    item: PropTypes.shape({
        mainImageId: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        userDisplayName: PropTypes.string.isRequired
    }).isRequired,
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.string.isRequired
};

export default ItemPreview;
