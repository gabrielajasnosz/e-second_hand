import React, { useEffect } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import "./ItemPreview.scss";
import Avatar from "@mui/material/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
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
};

const ItemPreview = ({ item, classes, history }) => {
    const [isLoggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        setLoggedIn(UserService.validateToken(UserService.currentUserValue));
    }, []);

    return (
        <div className="item-preview">
            { item.userDisplayName && (
                // eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
                <div
                    className={isLoggedIn ? "item-preview-author-with-hover" : "item-preview-author"}
                    role="button"
                    /* eslint-disable-next-line react/prop-types */
                    onClick={() => (isLoggedIn ? history.push(`/user/${item.userId}`) : {})}
                >
                    <Avatar
                        src={`http://localhost:8080/users/profile-picture/${item.userId}`}
                        sx={{ width: 30, height: 30 }}
                    />
                    <span className="author">{item.userDisplayName}</span>
                </div>
            )}
            {/* eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
            <div role="button" onClick={() => history.push(`/item/${item.id}`)}>
                <ImageListItem key={item.id} classes={{ root: classes.root }}>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <img
                        src={`http://localhost:8080/items/image/${item.mainImageId}?w=250&h=250&fit=crop&auto=format`}
                        srcSet={`http://localhost:8080/items/image/${item.mainImageId}?w=250&h=250&fit=crop&auto=format&dpr=2 2x`}
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
};

ItemPreview.propTypes = {
    item: PropTypes.shape({
        mainImageId: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        userDisplayName: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired
    }).isRequired,
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ItemPreview);
