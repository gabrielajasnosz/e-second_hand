import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import { MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import {
    setSize as setSizeActionCreator,
    setPrice as setPriceActionCreator,
    setImages as setImagesActionCreator, setMainImageId as setMainImageIdActionCreator
} from "./action/newItem";
import {
    getNewItemSize, getNewItemPrice, getType, getNewItemImages, getNewItemMainImageId
} from "./selectors";
import { getSizes } from "../header/selectors";
import TextButton from "../button/TextButton";
import ImagesPreview from "../imagePreview/ImagePreview";
import Progress from "../progress/Progress";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSize: setSizeActionCreator,
    setPrice: setPriceActionCreator,
    setImages: setImagesActionCreator,
    setMainImageId: setMainImageIdActionCreator,
}, dispatch);

const mapStateToProps = (state) => ({
    newItemSize: getNewItemSize(state),
    newItemPrice: getNewItemPrice(state),
    newItemImages: getNewItemImages(state),
    type: getType(state),
    sizes: getSizes(state),
    mainImageId: getNewItemMainImageId(state)
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
    classes, setSize, setPrice, newItemSize, newItemPrice, sizes, type, setImages, newItemImages, setMainImageId, mainImageId
}) => {
    const [imageError, setImageError] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    const inputRef = React.createRef();

    const handleUpload = async (e) => {
        setIsLoading(true);
        if (e.target.files.length > 6) {
            setImages([]);
            setImageError(true);
            setImagesPreview([]);
            setMainImageId(0);
        } else {
            setImageError(false);
            const allFiles = [];
            const images = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < e.target.files.length; i++) {
                allFiles.push(e.target.files[i]);
                images.push({
                    id: i,
                    url: URL.createObjectURL(e.target.files[i])
                });
            }
            if (allFiles.length > 0) {
                setImages(allFiles);
            }
            if (images.length > 0) {
                setImagesPreview(images);
            }
            setMainImageId(0);
        }
        setIsLoading(false);
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
                <span className={classes.cssLabelName}>
                    {t("Size")}
                    {" "}
                    *
                </span>
                <SelectInput label={null} onChange={setSize} defaultValue={newItemSize}>
                    {sizes[type].map((item) => [
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ])}
                </SelectInput>
            </div>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>
                    {t("Price")}
                    {" "}
                    *
                </span>
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
                <span className={classes.cssLabelName}>
                    {t("Add 1-6 pictures")}
                    {" "}
                    *
                </span>
                {isLoading && (
                    <Progress />
                )}
                {imagesPreview.length > 0 && (
                    <ImagesPreview images={imagesPreview} />
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
                    <TextButton
                        onClick={() => inputRef.current.click()}
                    >
                        {newItemImages.length === 0 ? t("Upload images") : t("Change images")}
                    </TextButton>
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
    newItemImages: PropTypes.array.isRequired,
    setMainImageId: PropTypes.func.isRequired,
    mainImageId: PropTypes.number.isRequired
};

AddItemImage.propTypes = propTypes;

export default enhance(AddItemImage);
