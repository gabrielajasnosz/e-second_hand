import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import withStyles from "@material-ui/core/styles/withStyles";
import TextButton from "../button/TextButton";
import { UserService } from "../../service/UserService";

const styles = {
    icon: {
        color: "rgba(0, 0, 0, 0.54) !important",
        fontSize: "40px !important",
        "&:hover,&:focus": {
            outline: "none"
        }
    },
};

const ChangeImageDialog = ({ handleClose, classes }) => {
    const { t } = useTranslation();
    // eslint-disable-next-line no-unused-vars
    const [imagePreview, setImagePreview] = useState([]);
    const [image, setImage] = useState("");

    const saveProfilePicture = () => {
        const formData = new FormData();

        formData.append("file", image);
        UserService.setProfilePicture(formData).then((response) => {
            response.json();
        }).then(() => {
            window.location.reload(true);
        });
    };

    const inputRef = React.createRef();

    const handleUpload = async (e) => {
        setImage(e.target.files[0]);
        const preview = [];
        preview.push({
            id: 0,
            url: URL.createObjectURL(e.target.files[0])
        });
        setImagePreview(preview);
    };

    return (
        <>
            <DialogTitle sx={{ fontFamily: "Open Sans, sans-serif !important" }}>
                {t("Upload photo")}
                {" "}
            </DialogTitle>
            <DialogContent sx={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: 0
            }}
            >
                {imagePreview.length === 0 ? (
                    <label htmlFor="upload-button">
                        <input
                            type="file"
                            id="upload-button"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={inputRef}
                            onChange={handleUpload}
                        />
                        {/* eslint-disable-next-line react/button-has-type */}
                        <IconButton onClick={() => inputRef.current.click()} classes={{ root: classes.icon }}>
                            <AddAPhotoIcon classes={{ root: classes.icon }} />
                        </IconButton>
                    </label>
                ) : (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                        src={imagePreview[0].url}
                        alt="image"
                        loading="lazy"
                        style={{ width: "10rem" }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <TextButton
                    onClick={handleClose}
                    sx={{ mr: 1 }}
                >
                    <span>{t("Close")}</span>
                </TextButton>
                <TextButton
                    onClick={saveProfilePicture}
                    sx={{ mr: 1 }}
                    disabled={image === ""}
                >
                    <span>{t("Save")}</span>
                </TextButton>
            </DialogActions>
        </>
    );
};

ChangeImageDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string
    }).isRequired
};

export default withStyles(styles)(ChangeImageDialog);
