import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import "./ItemPreview.scss";
import Avatar from "@mui/material/Avatar";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const ItemPreview = ({ item, classes, history }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,react/prop-types
    <div className="item-preview">
        { item.userDisplayName && (
            // eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
            <div className="item-preview-author" role="button" onClick={() => history.push(`/user/${item.userId}`)}>
                <Avatar sx={{ width: 25, height: 25 }}>
                    <PersonRoundedIcon />
                </Avatar>
                <span className="author">{item.userDisplayName}</span>
            </div>
        )}
        {/* eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
        <div role="button" onClick={() => history.push(`/item/${item.id}`)}>
            <ImageListItem key={item.id} classes={{ root: classes.root }}>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <img
                    src={`http://localhost:8080/item/image/${item.mainImageId}?w=250&h=250&fit=crop&auto=format`}
                    srcSet={`http://localhost:8080/item/image/${item.mainImageId}?w=250&h=250&fit=crop&auto=format&dpr=2 2x`}
                    alt=""
                    loading="lazy"
                    className="img"
                />
            </ImageListItem>
        </div>
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
        userDisplayName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired
    }).isRequired,
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({}).isRequired
};

export default ItemPreview;
