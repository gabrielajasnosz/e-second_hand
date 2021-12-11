import React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import { useTranslation } from "react-i18next";
import RatingCustom from "../rating/RatingCustom";
import "./CommentPreview.scss";
import "moment/locale/pl";

// eslint-disable-next-line no-unused-vars
const CommentPreview = ({ comment, history }) => {
    const { t } = useTranslation();

    return (
        <div className="comment-container">
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                <div
                    className="comment-author-preview"
                    role="button"
                    /* eslint-disable-next-line react/prop-types */
                    onClick={() => {
                        window.location.href = `/user/${comment.creatorId}`;
                    }}
                >
                    <Avatar
                        src={`http://localhost:8080/users/profile-picture/${comment.creatorId}`}
                        sx={{ width: 30, height: 30 }}
                    />
                    <span className="comment-author">{comment.creatorName}</span>
                </div>
                <RatingCustom
                    name="simple-controlled"
                    rating={comment.rating}
                    readOnly
                />
            </div>
            <span className="date">
                {t("Added")}
                {" "}
                {moment(comment.creationDate).locale("pl").format("DD MMM, YYYY")}
            </span>
            <div className="comment-span">
                <span>{comment.comment}</span>
            </div>
        </div>
    );
};

CommentPreview.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    comment: PropTypes.shape({
        rating: PropTypes.number,
        creatorName: PropTypes.string,
        creatorId: PropTypes.number,
        comment: PropTypes.string,
        creationDate: PropTypes.string
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired
};
export default CommentPreview;
