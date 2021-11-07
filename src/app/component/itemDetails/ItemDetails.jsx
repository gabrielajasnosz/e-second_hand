import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ItemDetails.scss";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import EditItemDetails from "./EditItemDetails";
import { UserService } from "../../service/UserService";
import { getItemDetails } from "../../page/itemPage/selectors";

const styles = {
    icon: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "20px",
        "&:hover,&:focus": {
            outline: "none"
        }
    },
};

const mapStateToProps = (state) => ({
    itemData: getItemDetails(state),
});

const enhance = compose(
    connect(mapStateToProps,
        null),
    withStyles(styles)
);

const ItemDetails = ({
    itemData, classes
}) => {
    const [isEditModeOn, setEditModeOn] = useState(false);
    const isLoggedIn = UserService.validateToken(UserService.currentUserValue);
    const userHasRightToEdit = isLoggedIn && UserService.decodedTokenValue.userId === itemData.userId;

    return (
        <div className="item-info">
            <div className="item-details">
                {!isEditModeOn ? (
                    <>
                        <div style={{
                            display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", marginBottom: "1rem"
                        }}
                        >
                            { itemData.userDisplayName && (
                            <div className="info-author">
                                <Avatar sx={{ width: 30, height: 30 }}>{itemData.userDisplayName.charAt(0).toUpperCase()}</Avatar>
                                <span className="author">{itemData.userDisplayName}</span>
                            </div>
                            )}
                            {userHasRightToEdit && (
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <IconButton onClick={() => { setEditModeOn(true); }} size="small" classes={{ root: classes.icon }}>
                                    <EditIcon className={classes.icon} />
                                </IconButton>
                                <IconButton onClick={() => {}} size="small" classes={{ root: classes.icon }}>
                                    <DeleteIcon className={classes.icon} />
                                </IconButton>
                            </div>
                            )}
                        </div>
                        <span className="item-detail-price">
                            {itemData.price}
                            {" "}
                            PLN
                        </span>
                        <div className="item-name">
                            <span className="item-name-span">{itemData.name}</span>
                            {itemData.description ? (
                                <span>{itemData.description}</span>
                            ) : (
                                <span className="no-info">No description</span>
                            )}
                        </div>
                        <div className="item-row">
                            <span className="item-feature">Category</span>
                            <span className="item-detail">{itemData.category}</span>
                        </div>
                        <div className="item-row">
                            <span className="item-feature">Brand</span>
                            <span className="item-detail">{itemData.brand}</span>
                        </div>
                        <div className="item-row">
                            <span className="item-feature">Color</span>
                            <span className="item-detail">{itemData.color}</span>
                        </div>
                        <div className="item-row">
                            <span className="item-feature">Size</span>
                            <span className="item-detail">{itemData.size}</span>
                        </div>
                        <div className="item-row">
                            <span className="item-feature">Gender</span>
                            <span className="item-detail">{itemData.gender}</span>
                        </div>
                    </>
                ) : (
                    <EditItemDetails setEditModeOn={setEditModeOn} />

                )}
            </div>
        </div>
    );
};
ItemDetails.propTypes = {
    itemData: PropTypes.shape({
        userDisplayName: PropTypes.string,
        category: PropTypes.string,
        categoryGender: PropTypes.string,
        brand: PropTypes.string,
        color: PropTypes.string,
        size: PropTypes.string,
        gender: PropTypes.string,
        price: PropTypes.number,
        name: PropTypes.string,
        userId: PropTypes.number,
        description: PropTypes.string
    }).isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired
    }).isRequired
};

export default enhance(ItemDetails);
