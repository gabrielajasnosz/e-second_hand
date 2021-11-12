import React from "react";
import "./ImageListWidget.scss";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ItemPreview from "../itemPreview/ItemPreview";
import TextButton from "../button/TextButton";

const styles = {
    root: {
        height: "18rem !important",
        width: "12rem !important",

        "@media only screen and (max-width: 600px)": {
            height: "18vh !important",
            width: "12vh !important",
        }
    }
};
// eslint-disable-next-line react/prop-types
const ImageListWidget = ({ classes, items, history }) => (
    <div className="image-list-widget">
        <div className="widget-title">
            <span className="widget-name"> Explore latest items </span>
            {/* eslint-disable-next-line react/prop-types */}
            <TextButton onClick={() => { history.push("/list"); }}>
                <span>See more</span>
                <ArrowForwardIosIcon sx={{ fontSize: 20, marginLeft: "1rem" }} />
            </TextButton>
        </div>

        { items ? (
            <div className="image-list">
                {items.map((item) => (
                    <ItemPreview item={item} classes={classes} history={history} />
                ))}
            </div>
        ) : (
            <CircularProgress color="secondary" />
        )}
    </div>
);

ImageListWidget.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.array.isRequired
};

export default withStyles(styles)(ImageListWidget);
