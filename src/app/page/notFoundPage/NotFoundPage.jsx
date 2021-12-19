import React from "react";
import "./NotFoundPage.scss";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <div className="not-found-page">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src="/assets/images/not-found.png" className="not-found-page" />
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className="message">
                {t("This page doesn't exist")}
                {" "}
            </span>
        </div>
    );
};

export default NotFoundPage;
