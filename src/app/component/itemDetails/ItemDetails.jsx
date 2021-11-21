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
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { bindActionCreators } from "redux";
import { Tooltip } from "@material-ui/core";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Visibility } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { getItemDetails } from "../../page/itemPage/selectors";
import { UserService } from "../../service/UserService";
import EditItemDetails from "./EditItemDetails";
import TextButton from "../button/TextButton";
import {
    deleteItem as deleteItemActionCreator,
    hideItem as hideItemActionCreator,
    showItem as showItemActionCreator
} from "./action/editedItem";

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

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteItem: deleteItemActionCreator,
    hideItem: hideItemActionCreator,
    showItem: showItemActionCreator
}, dispatch);

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withStyles(styles)
);

const ItemDetails = ({
    itemData, classes, deleteItem, hideItem, showItem
}) => {
    const [isEditModeOn, setEditModeOn] = useState(false);
    const isLoggedIn = UserService.validateToken(UserService.currentUserValue);
    const userHasRightToEdit = isLoggedIn && UserService.decodedTokenValue.userId === itemData.userId;

    const date = moment(itemData.creationDate).format("DD MMM, YYYY");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const { t } = useTranslation();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="item-info">
            <div className="item-details">
                {!isEditModeOn ? (
                    <>
                        {itemData.isHidden && (
                            <span className="hidden-item">
                                {t("This item is hidden. Only you can see this page.")}
                            </span>
                        )}
                        <span className="date">
                            {t("Added")}
                            {" "}
                            {date}
                        </span>
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
                                <Tooltip
                                    title={t("Edit item")}
                                >
                                    <IconButton onClick={() => { setEditModeOn(true); }} size="small" classes={{ root: classes.icon }}>
                                        <EditIcon className={classes.icon} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={t("Delete item")}>
                                    <IconButton onClick={handleClickOpen} size="small" classes={{ root: classes.icon }}>
                                        <DeleteIcon className={classes.icon} />
                                    </IconButton>
                                </Tooltip>
                                {itemData.isHidden ? (
                                    <Tooltip title={t("Make item visible")}>
                                        <IconButton onClick={showItem} size="small" classes={{ root: classes.icon }}>
                                            <Visibility className={classes.icon} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title={t("Hide item")}>
                                        <IconButton onClick={hideItem} size="small" classes={{ root: classes.icon }}>
                                            <VisibilityOffIcon className={classes.icon} />
                                        </IconButton>
                                    </Tooltip>
                                )}

                            </div>
                            )}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                PaperProps={{
                                    sx: {
                                        backgroundColor: "#F0EFEB",
                                        width: "30rem",
                                        padding: "0 1rem"
                                    }
                                }}
                            >
                                <DialogTitle sx={{ fontFamily: "Open Sans, sans-serif !important" }} id="alert-dialog-title">
                                    {t("Are you sure?")}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {t("This action cannot be undone")}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <TextButton
                                        onClick={handleClose}
                                        sx={{ mr: 1 }}
                                    >
                                        <span>{t("Close")}</span>
                                    </TextButton>
                                    <TextButton
                                        onClick={deleteItem}
                                        sx={{ mr: 1 }}
                                    >
                                        <span>{t("Delete item")}</span>
                                    </TextButton>
                                </DialogActions>
                            </Dialog>
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
                                <span className="no-info">{t("No description")}</span>
                            )}
                        </div>
                        <div className="item-row">
                            <span className="item-feature">{t("Category")}</span>
                            <span className="item-detail">{t(itemData.category)}</span>
                        </div>
                        <div className="item-row">
                            <span className="item-feature">{t("Brand")}</span>
                            <span className="item-detail">{t(itemData.brand)}</span>
                        </div>
                        <div className="item-row">
                            <span className="item-feature">{t("Color")}</span>
                            <span className="item-detail">{t(itemData.color)}</span>
                        </div>
                        <div className="item-row">
                            <span className="item-feature">{t("Size")}</span>
                            <span className="item-detail">{itemData.size}</span>
                        </div>
                        <div className="item-row">
                            <span className="item-feature">{t("Gender")}</span>
                            <span className="item-detail">{t(itemData.gender)}</span>
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
        description: PropTypes.string,
        creationDate: PropTypes.string,
        isHidden: PropTypes.bool
    }).isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired
    }).isRequired,
    deleteItem: PropTypes.func.isRequired,
    hideItem: PropTypes.func.isRequired,
    showItem: PropTypes.func.isRequired
};

export default enhance(ItemDetails);
