import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Popover from "@material-ui/core/Popover";
import EditIcon from "@mui/icons-material/Edit";
import { MenuItem } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import TextButton from "../button/TextButton";
import TextInput from "../input/TextInput";
import CategoryUngroupedPopover from "../popoverContent/CategoryUngroupedPopover";
import SelectInput from "../input/SelectInput";
import { CategoryService } from "../../service/CategoryService";

const styles = {
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: "220px",
        fontSize: "12px",
        border: "1px solid #dadde9"
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "auto",
        maxWidth: "40rem",
        minWidth: "35rem",
        height: "auto",
        backgroundColor: "#F0EFEB !important",
        borderRadius: ".3rem",
        boxShadow: 24,
        p: 4,
    },
    step: {
        width: "auto",
        height: "auto",
        maxHeight: "25rem",
        overflow: "auto"
    },
    stepper: {
        width: "100%",
        backgroundColor: "transparent",
        padding: "2rem 0"
    },
    icon: {
        color: "#bababa"
    },
    editIcon: {
        color: "#393938",
        fontSize: "20px"
    },
    iconActive: {
        color: "#cb997e !important",
    },
    iconCompleted: {
        color: "#ddbea9 !important",
    },
    label: {
        fontFamily: "Open Sans, sans serif !important",
        fontSize: "16px"
    },
    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        textTransform: "capitalize",
        width: "100%",
        backgroundColor: "#F0EFEB"
    },
    cssLabelName: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        paddingBottom: "1rem"
    },
    cssLabelCategory: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
    },
    userIcon: {
        "&:hover, &:focus": {
            outline: "none",
        }
    },
    paper: {
        width: "20rem",
        maxHeight: "20rem",
        overflow: "auto",
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
    },
    chosenCategory: {
        display: "flex",
        flexDirection: "row",
        width: "20rem",
        border: "1px #bababa solid",
        alignItems: "center",
        borderRadius: "4px",
        textTransform: "capitalize",
        justifyContent: "space-between",
        height: "56px",
        padding: "13px",
        "&:hover": {
            borderColor: "black",
            cursor: "pointer"
        },
        "&:focus": {
            borderColor: "#a5a58d !important",
            borderWidth: "2px",
            cursor: "pointer"
        },
    },
    alert: {
        justifyContent: "center",
        width: "20rem",
        margin: "1rem 0"
    },
    message: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
    }
};

const AddCategoryModal = ({
    classes,
    handleClose
}) => {
    const { t } = useTranslation();

    const steps = [`${t("Step")} 1`, `${t("Step")} 2`];
    const [activeStep, setActiveStep] = React.useState(0);
    // eslint-disable-next-line no-unused-vars
    const [parentCategory, setParentCategory] = useState(null);
    const [categoryGender, setCategoryGender] = useState("UNDEFINED");

    const [anchorGender, setAnchorGender] = React.useState(null);
    const [success, setSuccess] = useState(false);

    const handleClickGender = (event) => {
        setAnchorGender(event.currentTarget);
    };

    const handleCloseGender = () => {
        setAnchorGender(null);
    };
    const openGender = Boolean(anchorGender);
    const genderId = openGender ? "simple-popover" : undefined;

    // eslint-disable-next-line no-unused-vars
    const [categoryName, setCategoryName] = useState("");

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const saveCategory = () => {
        const newCategory = {
            parentId: parentCategory.id,
            categoryGender,
            categoryName
        };

        CategoryService.saveCategory(newCategory).then(() => {
            setSuccess(true);
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
        });
    };

    const renderButtons = () => (
        <div className="add-item-row buttons">
            <TextButton
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                <span>{t("Back")}</span>
            </TextButton>
            {activeStep === 0 && (
                <TextButton onClick={handleNext} disabled={categoryName === ""}>
                    <span>{t("Next")}</span>
                </TextButton>
            )}
            {activeStep === 1 && (
                <TextButton
                    onClick={saveCategory}
                >
                    <span>{t("Add category")}</span>
                </TextButton>
            )}

        </div>
    );

    return (
        <div className="app-modal-content">
            <div className="add-item-row">
                <span>{t("Add new category")}</span>
                <IconButton onClick={handleClose} size="small" classes={{ root: classes.userIcon }}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Box sx={{
                width: "100%", backgroundColor: "#F0EFEB", padding: 0
            }}
            >
                <Stepper classes={{ root: classes.stepper }} activeStep={activeStep}>
                    {steps.map((label) => (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <Step key={label}>
                            <StepLabel
                                StepIconProps={{
                                    classes: {
                                        root: classes.icon,
                                        active: classes.iconActive,
                                        completed: classes.iconCompleted
                                    }
                                }}
                                classes={{
                                    label: classes.label
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 0 && (
                    <div className={classes.step}>
                        <div className="form-floating mb-3 step-content">
                            <span className={classes.cssLabelName}>
                                {t("Category name")}
                                {" "}
                                *
                            </span>
                            <TextInput label={null} onChange={(e) => setCategoryName(e.target.value)} defaultValue={categoryName} />
                        </div>
                    </div>
                )}
                {activeStep === 1 && (
                    <div className={classes.step}>
                        { success && (
                            <Alert
                                severity="success"
                                variant="outlined"
                                classes={{ root: classes.alert, message: classes.message }}
                            >
                                {t("New category was created.")}
                            </Alert>
                        )}
                        {/* eslint-disable-next-line no-undef */}
                        <div className="form-floating mb-3 step-content">
                            <span className={classes.cssLabelName}>{t("Choose parent category")}</span>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                            <div className={classes.chosenCategory} role="button" onClick={handleClickGender} tabIndex={0}>
                                <span className={classes.cssLabelCategory}>{parentCategory ? t(parentCategory.name) : t("New main category")}</span>
                                <EditIcon className={classes.editIcon} />
                            </div>
                            <Popover
                                id={genderId}
                                open={openGender}
                                anchorEl={anchorGender}
                                onClose={handleCloseGender}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                classes={{
                                    paper: classes.paper
                                }}
                            >
                                <CategoryUngroupedPopover onClose={handleCloseGender} setCategory={setParentCategory} />
                            </Popover>
                        </div>
                        { parentCategory !== null && parentCategory.gender === "UNDEFINED" && (
                            <div className="form-floating mb-3  step-content">
                                <span className={classes.cssLabelName}>
                                    {t("Gender")}
                                    {" "}
                                    *
                                </span>
                                <SelectInput label={null} onChange={(e) => setCategoryGender(e.target.value)} defaultValue={categoryGender}>
                                    <MenuItem value="WOMAN" className={classes.cssLabel}>
                                        {t("Woman")}
                                    </MenuItem>
                                    <MenuItem value="MAN" className={classes.cssLabel}>
                                        {t("Man")}
                                    </MenuItem>
                                    <MenuItem value="UNDEFINED" className={classes.cssLabel}>
                                        Unisex
                                    </MenuItem>
                                </SelectInput>
                            </div>
                        )}

                    </div>
                )}
                {renderButtons()}
            </Box>
        </div>

    );
};

const propTypes = {
    classes: PropTypes.shape({
        modal: PropTypes.string.isRequired,
        stepper: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        iconActive: PropTypes.string.isRequired,
        iconCompleted: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        userIcon: PropTypes.string.isRequired,
        step: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
        paper: PropTypes.string,
        cssLabelCategory: PropTypes.string,
        chosenCategory: PropTypes.string,
        editIcon: PropTypes.string,
        cssLabel: PropTypes.string,
        alert: PropTypes.string,
        message: PropTypes.string
    }).isRequired,
    handleClose: PropTypes.func.isRequired,
};

AddCategoryModal.propTypes = propTypes;

export default withStyles(styles)(AddCategoryModal);
