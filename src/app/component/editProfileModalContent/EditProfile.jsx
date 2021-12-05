import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";
import { MenuItem } from "@material-ui/core";
import BasicButton from "../button/BasicButton";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import { UserService } from "../../service/UserService";

const styles = {
    userIcon: {
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
    column: {
        display: "flex",
        flexDirection: "column",
        marginTop: "1rem"
    },
    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        textTransform: "capitalize",
        width: "100%",
        backgroundColor: "#F0EFEB"
    },
    button: {
        display: "flex",
        justifyContent: "flex-end"
    }
};

const EditProfile = ({
    classes,
    handleClose,
    userData
}) => {
    const { t } = useTranslation();
    const [user, setUser] = useState(userData);

    const editProfile = () => {
        handleClose();
        UserService.editProfile(user).then(() => window.location.reload(true));
    };

    return (
        <div className="app-modal-content">
            <div className="add-item-row">
                <span>{t("Edit profile")}</span>
                <IconButton onClick={handleClose} size="small" classes={{ root: classes.userIcon }}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Box sx={{
                width: "100%", backgroundColor: "#F0EFEB", padding: 0
            }}
            >
                {" "}
                <div className={classes.column}>
                    <span className={classes.cssLabelName}>
                        {t("Phone number")}
                        {" "}
                        *
                    </span>
                    <TextInput
                        label={null}
                        onChange={(e) => { setUser({ ...user, phoneNumber: e.target.value }); }}
                        error={user.phoneNumber && user.phoneNumber.length > 9 ? t("Provided value is incorrect") : undefined}
                        defaultValue={user.phoneNumber || ""}
                    />
                </div>
                <div className={classes.column}>
                    <span className={classes.cssLabelName}>
                        {t("City")}
                        {" "}
                        *
                    </span>
                    <TextInput
                        label={null}
                        onChange={(e) => { setUser({ ...user, city: e.target.value }); }}
                        defaultValue={user.city || ""}
                    />
                </div>
                <div className={classes.column}>
                    <span className={classes.cssLabelName}>
                        {t("Zip code")}
                        {" "}
                        *
                    </span>
                    <TextInput
                        label={null}
                        onChange={(e) => { setUser({ ...user, zipCode: e.target.value }); }}
                        defaultValue={user.zipCode || ""}
                        error={user.zipCode && (user.zipCode.length > 6 || (user.zipCode.length === 6 && !user.zipCode.includes("-")))
                            ? t("Provided value is incorrect") : undefined}
                    />
                </div>
                <div className={classes.column}>
                    <span className={classes.cssLabelName}>
                        {t("Gender")}
                        {" "}
                        *
                    </span>
                    <SelectInput
                        label={null}
                        onChange={(e) => { setUser({ ...user, gender: e.target.value }); }}
                        defaultValue={user.gender}
                    >
                        <MenuItem value="WOMAN" className={classes.cssLabel}>
                            {t("Woman")}
                        </MenuItem>
                        <MenuItem value="MAN" className={classes.cssLabel}>
                            {t("Man")}
                        </MenuItem>
                        <MenuItem value="UNDEFINED" className={classes.cssLabel}>
                            {t("Other")}
                        </MenuItem>
                    </SelectInput>
                </div>
                <div className={classes.button}>
                    <BasicButton onButtonClick={editProfile} label="Save changes" buttonClassName="select-button">
                        <span>
                            {" "}
                            {t("Save")}
                            {" "}
                        </span>
                    </BasicButton>
                </div>
            </Box>
        </div>

    );
};

const propTypes = {
    classes: PropTypes.shape({
        userIcon: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
        column: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
        cssLabel: PropTypes.string.isRequired
    }).isRequired,
    handleClose: PropTypes.func.isRequired,
    userData: PropTypes.shape({
        gender: PropTypes.string,
        phoneNumber: PropTypes.string,
        city: PropTypes.string,
        zipCode: PropTypes.string
    }).isRequired
};

EditProfile.propTypes = propTypes;

export default withStyles(styles)(EditProfile);
