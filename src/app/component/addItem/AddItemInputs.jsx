import React from "react";
import PropTypes from "prop-types";
import "./AddItem.scss";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import { useTranslation } from "react-i18next";
import TextInput from "../input/TextInput";
import {
    setName as setNameActionCreator,
    setDescription as setDescriptionActionCreator,
    setType as setTypeActionCreator,
} from "./action/newItem";
import { getNewItemName, getType } from "./selectors/index";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setName: setNameActionCreator,
    setDescription: setDescriptionActionCreator,
    setType: setTypeActionCreator,
}, dispatch);

const mapStateToProps = (state) => ({
    newItemName: getNewItemName(state),
    type: getType(state),
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setName: ({ setName }) => (e) => setName(e.target.value),
        setDescription: ({ setDescription }) => (e) => setDescription(e.target.value),
        setType: ({ setType }) => (e) => setType(e.target.value),
    }))
);

const AddItemInputs = ({
    // eslint-disable-next-line no-unused-vars
    classes, setName, setDescription, newItemName,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>
                    {t("Name")}
                    {" "}
                    *
                </span>
                <TextInput label={null} onChange={setName} defaultValue={newItemName || ""} />
            </div>
            <div className="form-floating mb-3 step-content">
                <span className={classes.cssLabelName}>
                    {t("Description")}
                    {" "}
                </span>
                <TextInput label={null} onChange={setDescription} multiline />
            </div>
        </>
    );
};

const propTypes = {
    classes: PropTypes.shape({
        cssLabel: PropTypes.string.isRequired,
        cssLabelName: PropTypes.string.isRequired,
    }).isRequired,
    setName: PropTypes.func.isRequired,
    setDescription: PropTypes.func.isRequired,
    newItemName: PropTypes.string,
};

const defaultProps = {
    newItemName: null
};

AddItemInputs.defaultProps = defaultProps;

AddItemInputs.propTypes = propTypes;

export default enhance(AddItemInputs);
