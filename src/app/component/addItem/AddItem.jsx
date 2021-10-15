import React from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";

const propTypes = {
    classes: PropTypes.shape({
        modal: PropTypes.string.isRequired,
        stepper: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        iconActive: PropTypes.string.isRequired,
        iconCompleted: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        input: PropTypes.string.isRequired,
        textField: PropTypes.string.isRequired,
        cssLabel: PropTypes.string.isRequired,
        cssOutlinedInput: PropTypes.string.isRequired,
        cssFocused: PropTypes.string.isRequired,
        notchedOutline: PropTypes.string.isRequired,
        loginFail: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        descriptionInput: PropTypes.string.isRequired
    }).isRequired
};
const steps = ["Add name and description", "Select category, brand and color", "Add picture"];
// eslint-disable-next-line no-unused-vars
const AddItem = ({ classes }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };
    return (
        <div className="add-item-container">
            <span>Add item</span>
            <Box sx={{ width: "100%", backgroundColor: "#F0EFEB", padding: 0 }}>
                <Stepper classes={{ root: classes.stepper }} activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            <Step key={label} {...stepProps}>
                                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
                        );
                    })}
                </Stepper>
                {activeStep === 0 ? (
                    <>
                        <div className="form-floating mb-3 step-content">
                            <FormControl variant="outlined" className={classes.textField} required>
                                <span className={classes.cssLabel}>Name</span>
                                <OutlinedInput
                                    required
                                    classes={{
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline
                                    }}
                                    onChange={() => {}}
                                />
                            </FormControl>
                        </div>
                        <div className="form-floating mb-3 step-content">
                            <FormControl variant="outlined" className={classes.description} required>
                                <span className={classes.cssLabel}>Description</span>
                                <OutlinedInput
                                    classes={{
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                        input: classes.descriptionInput
                                    }}
                                    required
                                    multiline
                                    onChange={() => {}}
                                />
                            </FormControl>
                        </div>
                    </>
                ) : (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Step
                            {activeStep + 1}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </div>
    );
};

AddItem.propTypes = propTypes;

export default AddItem;
