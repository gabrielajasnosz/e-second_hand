import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
const ImageDialog = ({
// eslint-disable-next-line no-unused-vars
    open, handleClose, img
}) => (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <img
            src={`http://localhost:8080/items/image/${img}`}
            srcSet={`http://localhost:8080/items/image/${img}`}
            alt=""
            loading="lazy"
        />
    </Dialog>
);

ImageDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.bool.isRequired,
    img: PropTypes.number.isRequired
};
export default ImageDialog;
