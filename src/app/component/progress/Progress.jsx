import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

const styles = {
    loader: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "3rem"
    },
    progress: {
        color: "#cb997e !important"
    }
};

const Progress = ({ classes }) => (
    <div className={classes.loader}>
        <CircularProgress classes={{ svg: classes.progress }} />
    </div>
);

Progress.propTypes = {
    classes: PropTypes.shape({
        progress: PropTypes.string.isRequired,
        loader: PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(Progress);
