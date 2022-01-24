import React from "react";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { useTranslation } from "react-i18next";

const styles = {
    root: {
        border: "2px #a5a58d solid !important",
        height: "2.5rem !important",
        borderRadius: ".3rem !important",
        margin: "0 1rem 1rem 1rem !important",
    },
    label: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: "12px",
        textTransform: "capitalize"
    },
    deleteIcon: {
        color: "#393938 !important",
        fontSize: "20px !important",

        "&:hover": {
            fontSize: "22px !important"
        }
    },
    icon: {
        color: "#393938 !important",
        fontSize: "20px !important",
    }
};

const ActiveFilterChip = ({
    activeFilter, onDelete, icon, classes, deleteIcon, maxPrice
}) => {
    const { t } = useTranslation();
    const prepareChipLabel = () => {
        if (activeFilter.name === "sortingOrder") {
            const value = activeFilter.value === "DESC" ? t("Descending") : t("Ascending");
            return `${t("Sorting order")}: ${value}`;
        }
        if (activeFilter.name === "sortingColumn") {
            const value = activeFilter.value === "creationDate" ? t("Creation date") : t("Price");
            return `${t("Sort by")}: ${value}`;
        }
        if (activeFilter.name === "brandName") {
            return `${t("Brand")}: ${activeFilter.value}`;
        }
        if (activeFilter.name === "sizeName") {
            return `${t("Size")}: ${activeFilter.value}`;
        }
        if (activeFilter.name === "colorName") {
            return `${t("Color")}: ${t(activeFilter.value)}`;
        }
        if (activeFilter.name === "categoryName") {
            return `${t("Category")}: ${t(activeFilter.value)}`;
        }
        if (activeFilter.name === "minPrice") {
            return `${t("Price range")}: ${activeFilter.value} - ${maxPrice} `;
        }
        if (activeFilter.name === "onlyFollowedUsers") {
            return `${t("Followed users items")}`;
        }
        return "";
    };

    return (
        <Chip
            classes={{
                root: classes.root, label: classes.label, icon: classes.icon, deleteIcon: classes.deleteIcon
            }}
            label={prepareChipLabel(activeFilter)}
            variant="outlined"
            onDelete={onDelete}
            icon={icon}
            deleteIcon={deleteIcon}
        />
    );
};

ActiveFilterChip.propTypes = {
    activeFilter: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired,
    onDelete: PropTypes.func,
    icon: PropTypes.node,
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        deleteIcon: PropTypes.string.isRequired
    }).isRequired,
    deleteIcon: PropTypes.node,
    maxPrice: PropTypes.number
};

ActiveFilterChip.defaultProps = {
    onDelete: undefined,
    icon: undefined,
    deleteIcon: undefined,
    maxPrice: undefined
};

export default withStyles(styles)(ActiveFilterChip);
