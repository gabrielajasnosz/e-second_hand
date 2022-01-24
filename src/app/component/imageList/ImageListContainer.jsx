import React, { useState } from "react";
import Box from "@mui/material/Box";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import "./ImageListContainer.scss";
import ImageDialog from "../imageDialog/ImageDialog";

const styles = {
    root: {
        overflow: "hidden",
        marginTop: "4rem"
    },
    itemRoot: {
        overflow: "hidden",
        marginTop: "1rem"
    }
};
const propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
        itemRoot: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    images: PropTypes.array.isRequired
};
const ImageListContainer = ({
    // eslint-disable-next-line react/prop-types
    images,
    classes
}) => {
    const [open, setOpen] = useState(false);
    const [imageId, setImageId] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{
            maxWidth: "40rem",
            height: "35rem",
            overflow: "auto",
            padding: "2rem 1rem 0 1rem",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F0EFEB"
        }}
        >
            <ImageList cols={images.length > 2 ? 2 : 1} rowHeight={images.length > 1 ? 300 : 520} classes={{ root: classes.root }}>
                {/* eslint-disable-next-line react/prop-types */}
                {images.map((img) => (
                    // eslint-disable-next-line react/jsx-no-undef,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
                    <div
                        role="button"
                        style={{
                            height: "auto"
                        }}
                        onClick={() => {
                            handleClickOpen();
                            setImageId(img.id);
                        }}
                    >
                        <ImageListItem key={img.id} classes={{ root: classes.itemRoot }}>
                            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                            <img
                                src={`http://localhost:8080/items/image/${img.id}?w=250&h=250&fit=crop&auto=format`}
                                srcSet={`http://localhost:8080/items/image/${img.id}?w=250&h=250&fit=crop&auto=format&dpr=2 2x`}
                                alt=""
                                loading="lazy"
                                className="img"
                            />
                        </ImageListItem>
                    </div>
                ))}
                {open && (
                    <ImageDialog handleClose={handleClose} open={open} img={imageId} />
                )}
            </ImageList>
        </Box>
    );
};

ImageListContainer.propTypes = propTypes;

export default withStyles(styles)(ImageListContainer);
