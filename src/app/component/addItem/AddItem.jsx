import React from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import compose from "recompose/compose";
import { connect } from "react-redux";
import AddItemInputs from "./AddItemInputs";
import TextButton from "../button/TextButton";
import AddItemSelects from "./AddItemSelects";
import AddItemImage from "./AddItemImage";
import BasicButton from "../button/BasicButton";
import {
    isNameEmpty, isColorEmpty, isBrandEmpty, isCategoryEmpty, isSizeEmpty, isPriceEmpty, isTypeEmpty, isSexEmpty
} from "./selectors/index";

const steps = ["Add name and description", "Select product type and category", "Add picture"];

const mapStateToProps = (state) => ({
    isNameEmptySelector: isNameEmpty(state),
    isCategoryEmptySelector: isCategoryEmpty(state),
    isColorEmptySelector: isColorEmpty(state),
    isBrandEmptySelector: isBrandEmpty(state),
    isSizeEmptySelector: isSizeEmpty(state),
    isPriceEmptySelector: isPriceEmpty(state),
    isTypeEmptySelector: isTypeEmpty(state),
    isSexEmptySelector: isSexEmpty(state)
});

const enhance = compose(
    connect(mapStateToProps,
        null),
);

const AddItem = ({
    classes,
    handleClose,
    isNameEmptySelector,
    isColorEmptySelector,
    isBrandEmptySelector,
    // eslint-disable-next-line no-unused-vars
    isCategoryEmptySelector, isSizeEmptySelector, isPriceEmptySelector, isTypeEmptySelector, isSexEmptySelector
}) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderButtons = () => (
        <div className="add-item-row buttons">
            <TextButton
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                <span>Back</span>
            </TextButton>
            {activeStep === 0 && (
            <TextButton onClick={handleNext} disabled={isNameEmptySelector}>
                <span>Next</span>
            </TextButton>
            )}
            {activeStep === 1 && (
                <TextButton onClick={handleNext} disabled={isColorEmptySelector || isCategoryEmptySelector || isBrandEmptySelector}>
                    <span>Next</span>
                </TextButton>
            )}
            {activeStep === 2 && (
                <BasicButton
                    onButtonClick={() => {}}
                    buttonClassName="reverse-button"
                    disabled={isSizeEmptySelector || isPriceEmptySelector}
                >
                    Add Item
                </BasicButton>
            )}

        </div>
    );

    return (
        <div className="add-item-container">
            <div className="add-item-row">
                <span>Add item</span>
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
                    <>
                        <AddItemInputs classes={classes} />
                        {renderButtons()}
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <AddItemSelects classes={classes} />
                        {renderButtons()}
                    </>
                )}
                {activeStep === 2 && (
                    <>
                        <AddItemImage classes={classes} />
                        {renderButtons()}
                    </>
                )}
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
        userIcon: PropTypes.string.isRequired
    }).isRequired,
    handleClose: PropTypes.func.isRequired,
    isNameEmptySelector: PropTypes.bool.isRequired,
    isColorEmptySelector: PropTypes.bool.isRequired,
    isCategoryEmptySelector: PropTypes.bool.isRequired,
    isBrandEmptySelector: PropTypes.bool.isRequired,
    isSizeEmptySelector: PropTypes.bool.isRequired,
    isPriceEmptySelector: PropTypes.bool.isRequired,
    isTypeEmptySelector: PropTypes.bool.isRequired,
    isSexEmptySelector: PropTypes.bool.isRequired
};

AddItem.propTypes = propTypes;

export default enhance(AddItem);
