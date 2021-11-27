import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import TextButton from "../button/TextButton";
import TextInput from "../input/TextInput";
import RatingCustom from "../rating/RatingCustom";
import { CommentService } from "../../service/CommentService";

const CommentDialogContent = ({ handleClose, userId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { t } = useTranslation();

    const addComment = () => {
        const commentBody = {
            rating,
            comment,
            receiverId: userId
        };
        CommentService.addComment(commentBody).then((response) => (console.log(response.status)));
    };

    return (
        <>
            <DialogTitle sx={{ fontFamily: "Open Sans, sans-serif !important" }} id="alert-dialog-title">
                {t("Add comment")}
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", margin: "1rem 0" }}>
                <div style={{ marginBottom: "0.5rem" }}>
                    <RatingCustom
                        name="simple-controlled"
                        rating={rating}
                        setRating={setRating}
                    />
                </div>
                <TextInput label={null} onChange={(e) => setComment(e.target.value)} defaultValue={comment || ""} />
            </DialogContent>
            <DialogActions>
                <TextButton
                    onClick={handleClose}
                    sx={{ mr: 1 }}
                >
                    <span>{t("Close")}</span>
                </TextButton>
                <TextButton
                    onClick={addComment}
                    sx={{ mr: 1 }}
                    disabled={rating === 0 || comment === ""}
                >
                    <span>{t("Add")}</span>
                </TextButton>
            </DialogActions>
        </>
    );
};

CommentDialogContent.propTypes = {
    handleClose: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
};

export default CommentDialogContent;
