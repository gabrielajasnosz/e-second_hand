import React from "react";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { useTranslation } from "react-i18next";
import BasicButton from "../button/BasicButton";

const styles = {
    container: {
        backgroundColor: "#F0EFEB !important",
        padding: "1.5rem",
    },
    root: {
        color: "#cb997e !important",
        marginBottom: "1rem",
        marginTop: "1rem"
    }
};

const PriceRangeContent = ({
// eslint-disable-next-line no-unused-vars
    priceExtremeValues, classes, setMinPrice, setMaxPrice
}) => {
    const [value, setValue] = React.useState([priceExtremeValues.minPrice, priceExtremeValues.maxPrice]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { t } = useTranslation();

    const savePriceRange = () => {
        setMaxPrice(value[1]);
        setMinPrice(value[0]);
    };

    return (
        <div className={classes.container}>
            <span>{t("Select price range")}</span>
            <Slider
                getAriaLabel={() => "Price range"}
                size="small"
                min={priceExtremeValues.minPrice}
                max={priceExtremeValues.maxPrice}
                value={value}
                step={20}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText=""
                classes={{ root: classes.root }}
            />
            <BasicButton onButtonClick={savePriceRange}>
                <span>{t("Save")}</span>
            </BasicButton>
        </div>
    );
};

PriceRangeContent.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    priceExtremeValues: PropTypes.object.isRequired,
    classes: PropTypes.shape({
        container: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired
    }).isRequired,
    setMinPrice: PropTypes.func.isRequired,
    setMaxPrice: PropTypes.func.isRequired,
};

export default withStyles(styles)(PriceRangeContent);
