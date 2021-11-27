import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import UserItems from "../userItems/UserItems";
import { UserService } from "../../service/UserService";
import { ItemService } from "../../service/ItemService";
import ItemPreview from "../itemPreview/ItemPreview";
import UserComments from "../userComments/UserComments";

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    // eslint-disable-next-line react/require-default-props
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const styles = {
    selected: {
        color: "#cb997e !important",
        fontWeight: "600 !important"
    },
    root: {
        fontFamily: "Open Sans, sans-serif !important",
        outline: "none !important",
        fontWeight: "600 !important",
        alignItems: "center"
    },
    list: {
        padding: "1rem",
        margin: "0 1rem 1rem 1rem",
        borderRadius: ".3rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    }
};

// eslint-disable-next-line no-unused-vars
const UserTabs = ({
    classes, userItemsList, history, itemsLoading, getUserItems, nextItemId, userId, userComments, commentsLoading, getUserComments, hasMoreComments
}) => {
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    const [hiddenItems, setHiddenItems] = React.useState([]);
    const [counters, setCounters] = React.useState({});
    const isLoggedIn = UserService.validateToken(UserService.currentUserValue);
    // eslint-disable-next-line max-len
    const isUsersProfile = isLoggedIn && UserService.decodedTokenValue.userId.toString() === userId;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (isUsersProfile) {
            ItemService.getHiddenItems().then((response) => response.json())
                .then((json) => {
                    setHiddenItems(json);
                });
        }
        ItemService.getUserCounters(userId).then((response) => response.json())
            .then((json) => {
                setCounters(json);
            });
    }, [isUsersProfile, userId]);

    const createLabel = (label, counter) => (
        <div style={{
            display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"
        }}
        >
            <span>{label}</span>
            <div style={{
                marginLeft: "1rem",
                border: "1px #a5a58d solid",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: ".3rem",
                display: "flex",
                color: "#393938",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
                {counter}
            </div>
        </div>
    );

    return (
        <div style={{ width: "60%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} classes={{ root: classes.root }}>
                <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { background: "#cb997e" } }}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading,max-len */}
                    <Tab label={createLabel(t("User's items"), counters.itemsCounter)} {...a11yProps(0)} classes={{ selected: classes.selected, root: classes.root }} disableRipple />
                    {/* eslint-disable-next-line react/jsx-props-no-spreading,max-len */}
                    <Tab label={createLabel(t("Comments"), counters.commentsCounter)} {...a11yProps(1)} classes={{ selected: classes.selected, root: classes.root }} disableRipple />
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    { isUsersProfile && (
                        // eslint-disable-next-line react/jsx-props-no-spreading,max-len
                        <Tab label={createLabel(t("Hidden items"), counters.hiddenItemsCounter)} {...a11yProps(2)} classes={{ selected: classes.selected, root: classes.root }} disableRipple />
                    )}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UserItems items={userItemsList} history={history} itemsLoading={itemsLoading} getUserItems={getUserItems} nextItemId={nextItemId} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserComments
                    history={history}
                    isUsersProfile={isUsersProfile}
                    userId={userId}
                    userComments={userComments}
                    commentsLoading={commentsLoading}
                    getUserComments={getUserComments}
                    hasMoreComments={hasMoreComments}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className="user-items-container">
                    <div>
                        {hiddenItems.length > 0 ? (
                            <div className={classes.list}>
                                {hiddenItems.map((item) => <ItemPreview history={history} item={item} />)}
                            </div>
                        ) : (
                            <div className="items-container">
                                <span className="no-content-info">{t("User don't have any hidden items added yet")}</span>
                            </div>
                        )}
                    </div>
                </div>
            </TabPanel>
        </div>
    );
};

UserTabs.propTypes = {
    classes: PropTypes.shape({
        selected: PropTypes.string,
        root: PropTypes.string,
        list: PropTypes.string
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    userItemsList: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    itemsLoading: PropTypes.bool.isRequired,
    getUserItems: PropTypes.func.isRequired,
    nextItemId: PropTypes.number,
    userId: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    userComments: PropTypes.array.isRequired,
    commentsLoading: PropTypes.bool.isRequired,
    getUserComments: PropTypes.func.isRequired,
    hasMoreComments: PropTypes.bool.isRequired
};

UserTabs.defaultProps = {
    nextItemId: null
};

export default withStyles(styles)(UserTabs);
