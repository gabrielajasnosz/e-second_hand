import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import Alert from "@mui/material/Alert";
import PasswordInput from "../input/PasswordInput";
import BasicButton from "../button/BasicButton";
import { UserService } from "../../service/UserService";

const styles = {
    icon: {
        "&:hover, &:focus": {
            outline: "none",
        }
    },
    cssLabelName: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        paddingBottom: "1rem"
    },
    button: {
        display: "flex",
        justifyContent: "flex-end"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        marginTop: "1rem"
    },
    alert: {
        justifyContent: "center",
        width: "20rem",
        margin: "1rem 0"
    },
    message: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
    }
};

const ChangePassword = ({ handleClose, classes }) => {
    // eslint-disable-next-line no-unused-vars
    const [oldPassword, setOldPassword] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [newPassword, setNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { t } = useTranslation();

    const setNewPasswordHandler = (pass) => {
        setSuccess("");
        setError("");
        setNewPassword(pass);
    };

    const setOldPasswordHandler = (pass) => {
        setSuccess("");
        setError("");
        setOldPassword(pass);
    };

    const changePassword = () => {
        if (newPassword === oldPassword) {
            setError("Passwords can't be the same");
        } else {
            const passwordData = {
                oldPassword,
                newPassword
            };
            UserService.changePassword(passwordData).then((response) => {
                if (response.status === 403) {
                    setSuccess("");
                    setError(t("Wrong password!"));
                } else {
                    setError("");
                    setSuccess(t("Password changed successfully"));
                    setTimeout(() => {
                        UserService.logout();
                        window.location.href = "/login";
                    }, 2000);
                }
            });
        }
    };

    return (
        <div className="app-modal-content">
            <div className="add-item-row">
                <span style={{ fontSize: "18px" }}>{t("Change password")}</span>
                <IconButton onClick={handleClose} size="small" classes={{ root: classes.icon }}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Box sx={{
                width: "100%", backgroundColor: "#F0EFEB", padding: 0
            }}
            >
                { success !== "" && (
                    <Alert
                        severity="success"
                        variant="outlined"
                        classes={{ root: classes.alert, message: classes.message }}
                    >
                        {success}
                    </Alert>
                )}
                { error !== "" && (
                    <Alert
                        severity="error"
                        variant="outlined"
                        classes={{ root: classes.alert, message: classes.message }}
                    >
                        {error}
                    </Alert>
                )}

                <div className="w-100">
                    <div className={classes.column}>
                        <span className={classes.cssLabelName}>
                            {t("Enter current password")}
                            {" "}
                        </span>
                        <PasswordInput
                            label={t("Current password")}
                            onChange={(e) => setOldPasswordHandler(e.target.value)}
                            showPassword={showOldPassword}
                            setShowPassword={setShowOldPassword}
                        />
                    </div>
                    <div className={classes.column}>
                        <span className={classes.cssLabelName}>
                            {t("Enter new password")}
                            {" "}
                        </span>
                        <PasswordInput
                            label={t("New password")}
                            onChange={(e) => setNewPasswordHandler(e.target.value)}
                            showPassword={showNewPassword}
                            setShowPassword={setShowNewPassword}
                        />
                    </div>
                    <div className={classes.button}>
                        <BasicButton
                            onButtonClick={changePassword}
                            label="Save changes"
                            buttonClassName="select-button"
                            disabled={newPassword === "" || oldPassword === ""}
                        >
                            <span>
                                {" "}
                                {t("Change")}
                                {" "}
                            </span>
                        </BasicButton>
                    </div>
                </div>
            </Box>
        </div>
    );
};

ChangePassword.propTypes = {
    handleClose: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
        column: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(ChangePassword);
