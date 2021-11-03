import React from "react";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

const ImageListContainer = ({
    // eslint-disable-next-line react/prop-types
    images
}) => (

    <div style={{ width: "40rem" }}>
        <ImageList cols={2} rowHeight={200}>
            {/* eslint-disable-next-line react/prop-types */}
            {images.map((img) => (
            // eslint-disable-next-line react/jsx-no-undef
                <ImageListItem>
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img
                        src={`http://localhost:8080/item/image/${img.id}`}
                        alt="image"
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    </div>
);

export default ImageListContainer;
