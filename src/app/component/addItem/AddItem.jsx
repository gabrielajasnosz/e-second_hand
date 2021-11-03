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
import { bindActionCreators } from "redux";
import AddItemInputs from "./AddItemInputs";
import TextButton from "../button/TextButton";
import AddItemSelects from "./AddItemSelects";
import AddItemImage from "./AddItemImage";
import BasicButton from "../button/BasicButton";
import {
    isNameEmpty,
    isColorEmpty,
    isBrandEmpty,
    isCategoryIdEmpty,
    isSizeEmpty,
    isPriceEmpty,
    isSexEmpty,
    isPriceIncorrect,
    areImagesEmpty
} from "./selectors/index";
import {
    saveItem as saveItemActionCreator,
} from "./action/newItem";

const steps = ["Step 1", "Step 2", "Step 3"];

const mapStateToProps = (state) => ({
    isNameEmptySelector: isNameEmpty(state),
    isCategoryIdEmptySelector: isCategoryIdEmpty(state),
    isColorEmptySelector: isColorEmpty(state),
    isBrandEmptySelector: isBrandEmpty(state),
    isSizeEmptySelector: isSizeEmpty(state),
    isPriceEmptySelector: isPriceEmpty(state),
    isSexEmptySelector: isSexEmpty(state),
    isPriceIncorrectSelector: isPriceIncorrect(state),
    areImagesEmptySelector: areImagesEmpty(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveItem: saveItemActionCreator,
}, dispatch);

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
);

const AddItem = ({
    classes,
    handleClose,
    isNameEmptySelector,
    isColorEmptySelector,
    isBrandEmptySelector,
    isCategoryIdEmptySelector,
    isSizeEmptySelector,
    isPriceEmptySelector,
    isSexEmptySelector,
    isPriceIncorrectSelector,
    saveItem,
    areImagesEmptySelector
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
                <TextButton
                    onClick={handleNext}
                    disabled={isColorEmptySelector || isCategoryIdEmptySelector || isSexEmptySelector || isBrandEmptySelector}
                >
                    {console.log(isColorEmptySelector)}
                    <span>Next</span>
                </TextButton>
            )}
            {activeStep === 2 && (
                <BasicButton
                    onButtonClick={saveItem}
                    buttonClassName="reverse-button"
                    disabled={isSizeEmptySelector || isPriceEmptySelector || isPriceIncorrectSelector || areImagesEmptySelector}
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
                    <div className={classes.step}>
                        <AddItemInputs classes={classes} />
                    </div>
                )}
                {activeStep === 1 && (
                    <div className={classes.step}>
                        <AddItemSelects classes={classes} />
                    </div>
                )}
                {activeStep === 2 && (
                    <div className={classes.step}>
                        <AddItemImage classes={classes} />
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
        step: PropTypes.string.isRequired
    }).isRequired,
    handleClose: PropTypes.func.isRequired,
    isNameEmptySelector: PropTypes.bool.isRequired,
    isColorEmptySelector: PropTypes.bool.isRequired,
    isCategoryIdEmptySelector: PropTypes.bool.isRequired,
    isBrandEmptySelector: PropTypes.bool.isRequired,
    isSizeEmptySelector: PropTypes.bool.isRequired,
    isPriceEmptySelector: PropTypes.bool.isRequired,
    isSexEmptySelector: PropTypes.bool.isRequired,
    isPriceIncorrectSelector: PropTypes.bool.isRequired,
    areImagesEmptySelector: PropTypes.bool.isRequired,
    saveItem: PropTypes.func.isRequired
};

AddItem.propTypes = propTypes;

export default enhance(AddItem);
