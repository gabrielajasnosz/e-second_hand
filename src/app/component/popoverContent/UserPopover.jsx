import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Switch from "@mui/material/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
import { UserService } from "../../service/UserService";

const propTypes = {
    classes: PropTypes.shape({
        button: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
        line: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        divider: PropTypes.string.isRequired,
        checked: PropTypes.string.isRequired,
        track: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired
};

const styles = {
    checked: {
        color: "#cb997e !important",
    },
    track: {
        backgroundColor: "#cb997e !important"
    }
};

// eslint-disable-next-line no-unused-vars
const UserPopover = ({ classes, history }) => {
    const [languageCode, setLanguageCode] = useState(localStorage.getItem("i18nextLng"));
    const { t } = useTranslation();

    const user = UserService.decodedTokenValue;

    const changeLanguage = () => {
        const lng = languageCode === "pl" ? "en" : "pl";
        localStorage.setItem("i18nextLng", lng);
        setLanguageCode(lng);
        window.location.reload(true);
    };

    return (
        <Box sx={{ backgroundColor: "#F0EFEB", height: "auto" }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        disableRipple
                        onClick={() => {
                            window.location.href = `/user/${user.userId}`;
                        }}
                    >
                        <AccountCircleIcon className={classes.icon} />
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="body2" className={classes.field}>{t("My profile")}</Typography>}
                        />
                    </ListItemButton>
                </ListItem>
                <Divider className={classes.divider} />
                <ListItem disablePadding>
                    <ListItemButton
                        disableRipple
                        onClick={() => {}}
                    >
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="body2" className={classes.field}>{t("Change language")}</Typography>}
                        />
                        <div className="language-switch">
                            <span>PL</span>
                            <Switch
                                checked={languageCode === "en"}
                                onChange={changeLanguage}
                                classes={{
                                    checked: classes.checked,
                                    track: classes.track
                                }}
                            />
                            <span>EN</span>
                        </div>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        disableRipple
                        onClick={() => {
                            UserService.logout();
                            window.location.href = "/";
                        }}
                    >
                        <LogoutIcon className={classes.icon} />
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="body2" className={classes.field}>{t("Logout")}</Typography>}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};

UserPopover.propTypes = propTypes;
export default withStyles(styles)(UserPopover);
