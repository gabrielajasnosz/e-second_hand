import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import TextInput from "../input/TextInput";
import TextButton from "../button/TextButton";
import { MessageService } from "../../service/MessageService";

const SendNewMessageDialog = ({
// eslint-disable-next-line no-unused-vars
    handleClose, receiverId, history, fetchMessages
}) => {
    const { t } = useTranslation();
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        const content = newMessage;
        const receiver = receiverId;
        MessageService.postMessage({
            content, receiver
        });
        handleClose();
    };

    return (
        <>
            <DialogTitle sx={{ fontFamily: "Open Sans, sans-serif !important" }}>
                {t("Send new message")}
                {" "}
            </DialogTitle>
            <DialogContent sx={{ display: "flex", alignItems: "center" }}>
                <TextInput label={null} onChange={(e) => setNewMessage(e.target.value)} defaultValue={newMessage || ""} />
            </DialogContent>
            <DialogActions>
                <TextButton
                    onClick={handleClose}
                    sx={{ mr: 1 }}
                >
                    <span>{t("Close")}</span>
                </TextButton>
                <TextButton
                    onClick={sendMessage}
                    disabled={newMessage === null || newMessage === ""}
                    sx={{ mr: 1 }}
                >
                    <span>{t("Send")}</span>
                </TextButton>
            </DialogActions>
        </>
    );
};

SendNewMessageDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    receiverId: PropTypes.number.isRequired,
    fetchMessages: PropTypes.func.isRequired
};

export default SendNewMessageDialog;
