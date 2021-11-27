import React from "react";
import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    filled: {
        color: "#F3C430"
    }
};

const RatingCustom = ({
    rating, setRating, readOnly, classes
}) => (
    <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
            setRating(newValue);
        }}
        readOnly={readOnly}
        classes={{
            iconFilled: classes.filled
        }}
    />
);

RatingCustom.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    classes: PropTypes.shape({
        filled: PropTypes.string.isRequired
    }).isRequired
};

RatingCustom.defaultProps = {
    readOnly: false
};

export default withStyles(styles)(RatingCustom);
