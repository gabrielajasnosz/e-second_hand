import React from "react";
import PropTypes from "prop-types";
import "./ImagePreview.scss";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageList from "@material-ui/core/ImageList";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import withStyles from "@material-ui/core/styles/withStyles";
import StarIcon from "@mui/icons-material/Star";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { setMainImageId as setMainImageIdActionCreator } from "../addItem/action/newItem";
import { getNewItemMainImageId } from "../addItem/selectors";

const propTypes = {
    images: PropTypes.shape([]).isRequired,
    classes: PropTypes.shape({
        bar: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    }).isRequired,
    setMainImageId: PropTypes.func.isRequired,
    mainImageId: PropTypes.number.isRequired
};

const styles = {
    bar: {
        background: "rgba(107, 112, 92, 0.5) !important",
        height: "2.5rem"
    },
    icon: {
        color: "white",
        "&:hover,&:focus": {
            outline: "none"
        }
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setMainImageId: setMainImageIdActionCreator,
}, dispatch);

const mapStateToProps = (state) => ({
    mainImageId: getNewItemMainImageId(state),
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withStyles(styles)
);

const ImagesPreview = ({
    images, classes, mainImageId, setMainImageId
}) =>
    // eslint-disable-next-line no-unused-vars,implicit-arrow-linebreak
    (
        <div className="images">
            <ImageList cols={3} rowHeight={140}>
                {images.map((img) => (
                    // eslint-disable-next-line react/jsx-no-undef
                    <ImageListItem>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img
                            src={img.url}
                            alt="image"
                            loading="lazy"
                        />
                        <ImageListItemBar
                            classes={{ root: classes.bar }}
                            position="top"
                            actionIcon={(
                                <IconButton
                                    classes={{ root: classes.icon }}
                                    onClick={() => setMainImageId(img.id)}
                                >
                                    {console.log(img.id)}
                                    { mainImageId === img.id ? (
                                        <StarIcon />
                                    ) : (
                                        <StarBorderIcon />
                                    )}
                                </IconButton>
                              )}
                            actionPosition="left"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
ImagesPreview.propTypes = propTypes;

export default enhance(ImagesPreview);
