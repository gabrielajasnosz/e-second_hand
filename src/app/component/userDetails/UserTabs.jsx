import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import UserItems from "../userItems/UserItems";

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
        fontWeight: "600 !important"
    }
};

// eslint-disable-next-line no-unused-vars
const UserTabs = ({
    classes, userItemsList, history, itemsLoading, getUserItems, nextItemId
}) => {
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ width: "60%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} classes={{ root: classes.root }}>
                <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { background: "#cb997e" } }}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Tab label={t("User's items")} {...a11yProps(0)} classes={{ selected: classes.selected, root: classes.root }} disableRipple />
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Tab label={t("Comments")} {...a11yProps(1)} classes={{ selected: classes.selected, root: classes.root }} disableRipple />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UserItems items={userItemsList} history={history} itemsLoading={itemsLoading} getUserItems={getUserItems} nextItemId={nextItemId} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </div>
    );
};

UserTabs.propTypes = {
    classes: PropTypes.shape({
        selected: PropTypes.string,
        root: PropTypes.string
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    userItemsList: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    itemsLoading: PropTypes.bool.isRequired,
    getUserItems: PropTypes.func.isRequired,
    nextItemId: PropTypes.number
};

UserTabs.defaultProps = {
    nextItemId: null
};

export default withStyles(styles)(UserTabs);
