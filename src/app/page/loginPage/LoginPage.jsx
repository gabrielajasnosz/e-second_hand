import React from "react";
import TextField from "@material-ui/core/TextField";
import MainHeader from "../../component/mainHeader/MainHeader";
import Footer from "../../component/footer/Footer";
import BasicButton from "../../component/button/BasicButton";

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
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">Sign in to your account</h3>
                                    <div className="form-floating mb-3">
                                        <TextField variant="outlined" label="Email" required />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <TextField variant="outlined" label="Password" required />
                                    </div>
                                    <div className="d-grid">
                                        <BasicButton onButtonClick={() => {}} label="Sign in">
                                            <span> Sign in </span>
                                        </BasicButton>
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
