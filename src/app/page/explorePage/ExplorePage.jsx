import React from "react";
import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import MainHeader from "../../component/mainHeader/MainHeader";
import Footer from "../../component/footer/Footer";

import "./ExplorePage.scss";

const propTypes = {
    classes: PropTypes.shape({
        input: PropTypes.string,
        textField: PropTypes.string,
        cssLabel: PropTypes.string,
        cssOutlinedInput: PropTypes.string,
        cssFocused: PropTypes.string,
        notchedOutline: PropTypes.string,
        loginFail: PropTypes.string
    }).isRequired,
};

const styles = {
    textField: {
        width: "20rem",
        marginTop: "0"
    },

    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px"
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: "#a5a58d !important",
        }
    },
    cssFocused: {
        fontFamily: "Open Sans, sans-serif"
    },

    notchedOutline: {
        borderWidth: "1px",
    },
    loginFail: {
        backgroundColor: "#eb0000cf",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        color: "black",
        borderRadius: ".3rem",
        marginBottom: "1rem",
        backgroundOpacity: 0.7,
        padding: "1rem 0",
        display: "flex",
        justifyContent: "center",
        width: "20rem",
    }
};

const enhance = compose(
    withHandlers(() => ({
        setPassword: ({ setPassword }) => (e) => setPassword(e.target.value),
        setEmail: ({ setEmail }) => (e) => setEmail(e.target.value),
    })),
    withStyles(styles)
);

// eslint-disable-next-line no-empty-pattern
const ExplorePage = ({
}) => (
    <div>
        <MainHeader />
        <Footer />
    </div>
);

ExplorePage.propTypes = propTypes;

export default enhance(ExplorePage);
