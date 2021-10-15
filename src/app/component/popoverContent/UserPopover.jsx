import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { UserService } from "../../service/UserService";

const propTypes = {
    classes: PropTypes.shape({
        button: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
        line: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        divider: PropTypes.string.isRequired
    }).isRequired,
};

const UserPopover = ({ classes }) => (
    <Box sx={{ backgroundColor: "#F0EFEB", height: "auto" }}>
        <List>
            <ListItem disablePadding>
                <ListItemButton
                    disableRipple
                    onClick={() => {}}
                >
                    <AccountCircleIcon className={classes.icon} />
                    <ListItemText
                        disableTypography
                        primary={<Typography variant="body2" className={classes.field}>My profile</Typography>}
                    />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    disableRipple
                    onClick={() => {}}
                >
                    <SettingsIcon className={classes.icon} />
                    <ListItemText
                        disableTypography
                        primary={<Typography variant="body2" className={classes.field}>Manage your data</Typography>}
                    />
                </ListItemButton>
            </ListItem>
            <Divider className={classes.divider} />
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
                        primary={<Typography variant="body2" className={classes.field}>Logout</Typography>}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
);

UserPopover.propTypes = propTypes;
export default UserPopover;
