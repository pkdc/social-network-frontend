import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import Logo from "../UI/Logo";
import styles from "./Landingpage.module.css";
import { AuthContext } from "../store/auth-context";
import NET from "vanta/dist/vanta.net.min";

const Landingpage = () => {
	const [loginIsLoading, setLoginIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const authCtx = useContext(AuthContext);

	const [vantaEffect, setVantaEffect] = useState(null);
	const vantaRef = useRef(null);

	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				NET({
					el: vantaRef.current,
					color: 0x52489c,
					backgroundColor: 0xebebeb,
					points: 15.0, // amount of dots
					maxDistance: 25.0, // line-boldness
					spacing: 15.0, // crowdness or area
				})
			);

			return () => {
				if (vantaEffect) vantaEffect.destroy();
			};
		}
	}, [vantaEffect]);

	useEffect(() => {
		setLoginIsLoading(authCtx.loginIsLoading);
		setError(authCtx.loginError);
	}, [authCtx.loginIsLoading, authCtx.loginError]);

	return (
		<>
			<div className={styles.background} ref={vantaRef}></div>
			<div className={styles.stage}>
				{!loginIsLoading && (
					<div className={styles.card}>
						<Logo className={styles.logo} />

						<h1 className={styles.heading}>Welcome back.</h1>
						<p className={styles.subheading}>
							Connect with the people and ideas that matter to you.
						</p>

						{error && <p className={styles["error-msg"]}>{error}</p>}

						<div className={styles["btn-group"]}>
							<Link
								to="/login"
								className={`${styles.btn} ${styles["btn-primary"]}`}
							>
								Sign In
							</Link>

							<div className={styles.divider}>
								<span className={styles["divider-line"]}></span>
								<span className={styles["divider-label"]}>or</span>
								<span className={styles["divider-line"]}></span>
							</div>

							<Link
								to="/reg"
								className={`${styles.btn} ${styles["btn-ghost"]}`}
							>
								Create an Account
							</Link>
						</div>

						<div className={styles["card-footer"]}>
							<p className={styles["footer-text"]}>
								By continuing you agree to our{" "}
								<a href="#terms">Terms</a> &amp;{" "}
								<a href="#privacy">Privacy Policy</a>.
							</p>
						</div>
					</div>
				)}
				{loginIsLoading && (
					<div className={styles.card}>
						<LoadingSpinner />
						<h2 className={styles.loading}>Logging In...</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default Landingpage;
