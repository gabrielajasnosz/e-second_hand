import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AddItem from "../addItem/AddItem";

const propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        modal: PropTypes.string.isRequired
    }).isRequired
};

const AddItemModal = ({
    open, handleClose, classes
}) => {
    const [modalOpen, setModalOpen] = useState(open);
    useEffect(() => { setModalOpen(open); }, [open]);
    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <Box classes={{ root: classes.modal }}>
                <AddItem classes={classes} handleClose={handleClose} />
            </Box>
        </Modal>
    );
};

AddItemModal.propTypes = propTypes;

export default AddItemModal;
