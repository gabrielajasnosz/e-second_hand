import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import { MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import Alert from "@mui/material/Alert";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import {
    setSize as setSizeActionCreator,
    setPrice as setPriceActionCreator,
    setImages as setImagesActionCreator
} from "./action/newItem";
import {
    getNewItemSize, getNewItemPrice, getType, getNewItemImages
} from "./selectors";
import { getSizes } from "../header/selectors";
import TextButton from "../button/TextButton";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSize: setSizeActionCreator,
    setPrice: setPriceActionCreator,
    setImages: setImagesActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    newItemSize: getNewItemSize(state),
    newItemPrice: getNewItemPrice(state),
    newItemImages: getNewItemImages(state),
    type: getType(state),
    sizes: getSizes(state),
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setSize: ({ setSize }) => (e) => setSize(e.target.value),
        setPrice: ({ setPrice }) => (e) => setPrice(e.target.value)
    }))
);

const AddItemImage = ({
    // eslint-disable-next-line no-unused-vars
    classes, setSize, setPrice, newItemSize, newItemPrice, sizes, type, setImages, newItemImages
}) => {
    const [imageError, setImageError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [imagesPreview, setImagesPreview] = useState([]);

    const inputRef = React.createRef();

    const handleUpload = async (e) => {
        if (e.target.files.length > 4) {
            setImageError(true);
        } else {
            const allFiles = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < e.target.files.length; i++) {
                allFiles.push(e.target.files[i]);
            }
            if (allFiles.length > 0) {
                setImages(allFiles);
            }

            const images = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < e.target.files.length; i++) {
                images.push(URL.createObjectURL(e.target.files[i]));
            }
            console.log(images);
            if (images.length > 0) {
                setImagesPreview(images);
            }
        }
    };

    return (

        <>
            {imageError && (
                <Alert
                    severity="error"
                    variant="outlined"
                    classes={{ root: classes.alertStyle, message: classes.message }}
                >
                    You can send max 4 images!
                </Alert>
            )}
            <div className="form-floating mb-3  step-content">
                <span className={classes.cssLabelName}>Size *</span>
                <SelectInput label={null} onChange={setSize} defaultValue={newItemSize}>
                    {sizes[type.toLowerCase()].map((item) => [
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ])}
                </SelectInput>
            </div>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>Price *</span>
                <TextInput
                    label={null}
                    onChange={setPrice}
                    defaultValue={newItemPrice}
                    /* eslint-disable-next-line no-restricted-globals */
                    error={newItemPrice !== "" && isNaN(newItemPrice) ? "Please provide correct value" : null}
                    endAdornment
                />
            </div>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>Add 1-4 pictures *</span>
                {imagesPreview.length > 0 && (
                    <div>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,react/no-array-index-key */}
                        {imagesPreview.map((img, i) => <img className="preview" src={img} alt={`image-${i}`} key={i} height={50} />)}
                    </div>
                )}
                <label htmlFor="upload-button">
                    <input
                        type="file"
                        id="upload-button"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={inputRef}
                        onChange={handleUpload}
                    />
                    {/* eslint-disable-next-line react/button-has-type */}
                    <TextButton onClick={() => inputRef.current.click()}>Upload images</TextButton>
                </label>
            </div>
        </>
    );
};

const propTypes = {
    classes: PropTypes.shape({
        cssLabel: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
        alertStyle: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }).isRequired,
    setSize: PropTypes.func.isRequired,
    setPrice: PropTypes.func.isRequired,
    newItemSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    newItemPrice: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    sizes: PropTypes.any.isRequired,
    setImages: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    newItemImages: PropTypes.array.isRequired
};

AddItemImage.propTypes = propTypes;

export default enhance(AddItemImage);
