import React from "react";
import MainHeader from "../../component/mainHeader/MainHeader";
import Footer from "../../component/footer/Footer";
import BasicButton from "../../component/button/BasicButton";
import FormInput from "../../component/formInput/FormInput";

import "./LoginPage.scss";

const LoginPage = () => (
    <div>
        <MainHeader />
        <div className="container-fluid ps-md-0">
            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image carousel" />
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8">
                                    <h3 className="login-heading mb-4">Welcome back!</h3>
                                    <FormInput type="email" />
                                    <FormInput type="password" />
                                    <div className="d-grid">
                                        <BasicButton onButtonClick={() => {}} label="Sign in">
                                            <span> Sign in </span>
                                        </BasicButton>
                                        <hr />
                                        <div className="createNewAccount">
                                            <BasicButton onButtonClick={() => {}} label="Sign up" buttonClassName="reverse-button">
                                                <span> Sign up </span>
                                            </BasicButton>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);

export default LoginPage;
