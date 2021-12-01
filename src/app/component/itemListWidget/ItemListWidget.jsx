import React from "react";
import "./ItemListWidget.scss";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import ItemPreview from "../itemPreview/ItemPreview";
import TextButton from "../button/TextButton";
import Progress from "../progress/Progress";

const styles = {
    root: {
        height: "18rem !important",
        width: "12rem !important",

        "@media only screen and (max-width: 600px)": {
            height: "23vh !important",
            width: "17vh !important",
        }
    }
};
// eslint-disable-next-line react/prop-types
const ItemListWidget = ({
    classes, items, history, title, onButtonClick
}) => {
    const { t } = useTranslation();

    return (
        <div className="image-list-widget">
            <div className="widget-title">
                <span className="widget-name">
                    {title}
                </span>
                {/* eslint-disable-next-line react/prop-types */}
                <TextButton onClick={onButtonClick}>
                    <span>
                        {" "}
                        {t("See more")}
                        {" "}
                    </span>
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
                <Progress />
            )}
        </div>
    );
};
ItemListWidget.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.array,
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    onButtonClick: PropTypes.func.isRequired
};

ItemListWidget.defaultProps = {
    items: undefined
};

export default withStyles(styles)(ItemListWidget);
