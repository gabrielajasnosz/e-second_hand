import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import "./FollowDialog.scss";

// eslint-disable-next-line no-empty-pattern
const FollowDialog = ({ list, title, emptyMessage }) => (
    <>
        <DialogTitle sx={{ fontFamily: "Open Sans, sans-serif !important", fontSize: "18px" }}>
            {title}
        </DialogTitle>
        <DialogContent sx={{
            display: "flex", alignItems: "center", justifyContent: "center", padding: 0
        }}
        >
            {/* eslint-disable-next-line react/prop-types */}
            {list && list.length > 0 ? (
                <div className="users-list">
                    {/* eslint-disable-next-line react/prop-types */}
                    {list.map((e) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
                        <div
                            className="user-preview"
                            role="button"
                                /* eslint-disable-next-line react/prop-types */
                            onClick={() => {
                                window.location.href = `/user/${e.id}`;
                            }}
                        >
                            <Avatar
                                src={`http://localhost:8080/users/profile-picture/${e.id}`}
                                sx={{ width: 30, height: 30 }}
                            />
                            <span className="username">{e.displayName}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <span className="empty">
                    {emptyMessage}
                </span>
            )}
        </DialogContent>

    </>
);

FollowDialog.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    emptyMessage: PropTypes.string.isRequired
};

export default FollowDialog;
