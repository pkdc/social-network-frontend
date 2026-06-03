import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../UI/Form";
import FormInput from "../UI/FormInput";
import FormLabel from "../UI/FormLabel";
import LgButton from "../UI/LgButton";
import LoadingSpinner from "../UI/LoadingSpinner";
import { AuthContext } from "../store/auth-context";
import AuthLayout from "./AuthLayout";
import af from "./AuthForm.module.css";

const LoginForm = () => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPw, setEnteredPw] = useState("");
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoginErrMsg(ctx.errMsg);
        navigate("/login", { replace: true });
    }, [ctx.errMsg]);

    useEffect(() => {
        setIsLoading(ctx.loginIsLoading);
        setError(ctx.loginError);
    }, [ctx.loginIsLoading, ctx.loginError]);

    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);
        console.log(enteredEmail);
    };
    const pwChangeHandler = (e) => {
        setEnteredPw(e.target.value);
        console.log(enteredPw);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const loginPayloadObj = {
            email: enteredEmail,
            pw: enteredPw
        };
        console.log(loginPayloadObj);
        ctx.onLogin(loginPayloadObj);
        setEnteredEmail("");
        setEnteredPw("");

        ctx.setErrMsg("");

        navigate("/", { replace: true })
    };

    return (
        <AuthLayout
            heroTitle="Welcome back."
            heroSub="Sign in to pick up where you left off."
            centerMobile
        >
            <h1 className={af.h1}>Log in</h1>
            <p className={af.subhead}>Welcome back — let's get you in.</p>

            {loginErrMsg && <p className={af.error}>{loginErrMsg}</p>}
            {!isLoading && error && <p className={af.error}>{error}</p>}

            {!isLoading && (
                <Form onSubmit={submitHandler}>
                    <div className={af.field}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormInput type="email" name="email" id="email" placeholder="abc@mail.com" value={enteredEmail} onChange={emailChangeHandler} />
                    </div>
                    <div className={af.field}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormInput type="password" name="password" id="password" placeholder="Password" value={enteredPw} onChange={pwChangeHandler} />
                    </div>
                    <LgButton className={af.submit} type="submit">Log In</LgButton>
                    <p className={af.foot}>Don't have an account? <Link to={"/reg"}>Register</Link></p>
                </Form>
            )}

            {isLoading && (
                <div className={af.loadingWrap}>
                    <LoadingSpinner />
                    <h2 className={af.loading}>Logging in...</h2>
                </div>
            )}
        </AuthLayout>
    );
};

export default LoginForm;
