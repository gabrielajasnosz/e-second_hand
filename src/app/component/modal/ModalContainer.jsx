import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        modal: PropTypes.string.isRequired
    }).isRequired,
    children: PropTypes.node.isRequired
};

const styles = {
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "auto",
        maxWidth: "40rem",
        minWidth: "35rem",
        height: "auto",
        backgroundColor: "#F0EFEB !important",
        borderRadius: ".3rem",
        boxShadow: 24,
        p: 4,
    },
};

const ModalContainer = ({
    open, handleClose, classes, children
}) => {
    const [modalOpen, setModalOpen] = useState(open);
    useEffect(() => { setModalOpen(open); }, [open]);
    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            disableEnforceFocus
        >
            <Box classes={{ root: classes.modal }}>
                { children }
            </Box>
        </Modal>
    );
};

ModalContainer.propTypes = propTypes;

export default withStyles(styles)(ModalContainer);
