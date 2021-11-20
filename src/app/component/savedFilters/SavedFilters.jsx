import React, { useState } from "react";
import "./SavedFilters.scss";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { MenuItem } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import TextButton from "../button/TextButton";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import Progress from "../progress/Progress";

const styles = {
    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        textTransform: "capitalize",
        width: "100%",
        backgroundColor: "#F0EFEB"
    },
};
// eslint-disable-next-line no-unused-vars
const SavedFilters = ({
    // eslint-disable-next-line no-unused-vars
    saveFilters, savedFilters, classes, canSaveFilter, filtersLoading, fetchFiltersById
}) => {
    const loadFilter = (e) => {
        fetchFiltersById(e.target.value);
    };
    const [name, setName] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setNameValue = (e) => {
        setName(e.target.value);
    };

    const save = () => {
        handleClose();
        saveFilters(name);
    };

    return (
        <div className="saved-filters">
            {canSaveFilter && (
            <div style={{ width: "11rem", display: "flex" }}>
                <TextButton onClick={handleClickOpen}>
                    <SaveIcon />
                    <span className="save-span"> Save filters </span>
                </TextButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#F0EFEB",
                            width: "25rem",
                            height: "15rem",
                            padding: "0 1rem",
                        }
                    }}
                >
                    <DialogTitle sx={{ fontFamily: "Open Sans, sans-serif !important" }}>Add name to your custom filters: </DialogTitle>
                    <DialogContent sx={{ display: "flex", alignItems: "center" }}>
                        <TextInput label={null} onChange={setNameValue} defaultValue={name || ""} />
                    </DialogContent>
                    <DialogActions>
                        <TextButton
                            onClick={handleClose}
                            sx={{ mr: 1 }}
                        >
                            <span>Close</span>
                        </TextButton>
                        <TextButton
                            onClick={save}
                            disabled={name === null || name === ""}
                            sx={{ mr: 1 }}
                        >
                            <span>Save filters</span>
                        </TextButton>
                    </DialogActions>
                </Dialog>
            </div>
            )}
            {filtersLoading && (
                <div style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    marginTop: "4rem"
                }}
                >
                    <Progress />
                </div>
            )}
            {savedFilters && savedFilters.length > 0 && !filtersLoading && (
                <div className="saved-filters-select">
                    <SelectInput label={null} onChange={(e) => loadFilter(e)} defaultValue="" size="small">
                        { savedFilters.map((e) => (
                            <MenuItem value={e.id} className={classes.cssLabel} key={e.id}>
                                <span style={{
                                    width: "100%",
                                    textTransform: "capitalize",
                                }}
                                >
                                    {e.name}
                                </span>
                            </MenuItem>
                        ))}
                    </SelectInput>
                </div>
            )}
        </div>
    );
};

SavedFilters.propTypes = {
    classes: PropTypes.shape({
        cssLabel: PropTypes.string.isRequired
    }).isRequired,
    saveFilters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    savedFilters: PropTypes.array,
    canSaveFilter: PropTypes.bool.isRequired,
    filtersLoading: PropTypes.bool.isRequired,
    fetchFiltersById: PropTypes.func.isRequired
};

SavedFilters.defaultProps = {
    savedFilters: []
};

export default withStyles(styles)(SavedFilters);
