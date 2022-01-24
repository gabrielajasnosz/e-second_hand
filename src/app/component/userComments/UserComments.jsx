import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import ItemPreview from "../itemPreview/ItemPreview";
import "./UserComments.scss";
import TextButton from "../button/TextButton";
// eslint-disable-next-line import/order
import AddIcon from "@mui/icons-material/Add";
// eslint-disable-next-line import/order
import Dialog from "@mui/material/Dialog";
import CommentDialogContent from "./CommentDialogContent";
// eslint-disable-next-line import/order
import InfiniteScroll from "react-infinite-scroller";
import CommentPreview from "../commentPreview/CommentPreview";
import Progress from "../progress/Progress";

const UserComments = ({
// eslint-disable-next-line no-unused-vars
    history, isUsersProfile, userId, userComments, commentsLoading, getUserComments, hasMoreComments
}) => {
    const { t } = useTranslation();

    const [commentDialogOpen, setCommentDialogOpen] = React.useState(false);

    const userRole = localStorage.getItem("role");

    const handleDialogOpen = () => {
        setCommentDialogOpen(true);
    };

    const handleDialogClose = () => {
        setCommentDialogOpen(false);
    };

    return (
        <div className="user-comments-container">
            {!isUsersProfile && userRole === "USER" && (
                <div className="comments-button">
                    <TextButton onClick={handleDialogOpen}>
                        <AddIcon />
                        <div style={{ marginLeft: "1rem" }}>
                            <span>{t("Add comment")}</span>
                        </div>
                    </TextButton>
                </div>
            )}
            <InfiniteScroll
                pageStart={0}
                loadMore={getUserComments}
                hasMore={hasMoreComments && commentsLoading === false}
            >
                {userComments && userComments.length > 0 && (
                <div className="comments-list">
                    {userComments.map((e) => <CommentPreview comment={e} history={history} />)}
                </div>
                )}
                {userComments.length === 0 && !commentsLoading && (
                <div className="items-container">
                    <span className="no-content-info">{t("User don't have any comments yet")}</span>
                </div>
                )}
                {commentsLoading && (
                    <Progress />
                )}
                <Dialog
                    open={commentDialogOpen}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        sx: {
                            backgroundColor: "#F0EFEB",
                            width: "30rem",
                        }
                    }}
                >
                    <CommentDialogContent handleClose={handleDialogClose} userId={userId} />
                </Dialog>
            </InfiniteScroll>
        </div>
    );
};

UserComments.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    isUsersProfile: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    userComments: PropTypes.array.isRequired,
    commentsLoading: PropTypes.bool.isRequired,
    getUserComments: PropTypes.func.isRequired,
    hasMoreComments: PropTypes.bool.isRequired
};

export default UserComments;
