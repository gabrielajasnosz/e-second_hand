import React from "react";
import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    filled: {
        color: "#F3C430"
    },
};

const RatingCustom = ({
    rating, setRating, readOnly, classes, precision
}) => (
    <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
            setRating(newValue);
        }}
        readOnly={readOnly}
        precision={precision}
        classes={{
            iconFilled: classes.filled,
        }}
    />
);

RatingCustom.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    classes: PropTypes.shape({
        filled: PropTypes.string.isRequired,
    }).isRequired,
    precision: PropTypes.number
};

RatingCustom.defaultProps = {
    readOnly: false,
    precision: 1
};

export default withStyles(styles)(RatingCustom);
