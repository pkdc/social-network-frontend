import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import Form from "../UI/Form";
import LgButton from "../UI/LgButton";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./Landingpage.module.css";
import { AuthContext } from "../store/auth-context";

const Homepage = () => {
    const [loginIsLoading, setLoginIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        setLoginIsLoading(authCtx.loginIsLoading);
        setError(authCtx.loginError);
    }, [authCtx.loginIsLoading, authCtx.loginError]);

    return (
        <>
        <div className={styles.wrapper}>
        {!loginIsLoading &&
            <div className={styles["container"]}>
                <h1 className={styles["title"]}>Welcome</h1>
                {error && <h2 className={styles["error-msg"]}>{error}</h2>}
                <Link className={styles["nav-link"]} to="/login"><LgButton className={`${styles["nav-link-btn"]} ${styles["login-btn"]}`}>Login</LgButton></Link>
                <Link className={styles["nav-link"]} to="/reg"><LgButton className={`${styles["nav-link-btn"]} ${styles["reg-btn"]}`}>Register</LgButton></Link>
            </div>}
        {loginIsLoading && <div>
            <LoadingSpinner/>
            <h2 className={styles["loading"]}>Logging In...</h2>
            </div>}
        </div>
        </>
    );
};

export default Homepage;