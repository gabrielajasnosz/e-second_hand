import React from "react";
import "./NotFoundPage.scss";

const NotFoundPage = () => (
    <div className="not-found-page">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src="/assets/images/not-found.png" className="not-found-page" />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <span className="message"> This page doesn't exist </span>
    </div>
);

export default NotFoundPage;
