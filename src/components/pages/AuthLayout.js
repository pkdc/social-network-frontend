import Logo from "../UI/Logo";
import NetCanvas from "../UI/NetCanvas";
import styles from "./AuthLayout.module.css";

// Shared split shell for the Login and Register pages.
// Desktop: violet brand panel (left) + form column (right).
// Mobile (<=640px): the brand panel collapses into a violet "hero" card and
// the form moves into a white card beneath it, both floating on the network bg.
const AuthLayout = ({ heroTitle, heroSub, centerMobile = false, children }) => {
	return (
		<div className={styles.page}>
			{/* full-screen network — only visible on mobile */}
			<div className={styles.pageBg}>
				<NetCanvas color="#52489c" density={46} />
			</div>

			<div
				className={`${styles.shell} ${centerMobile ? styles.center : ""}`}
			>
				<aside className={styles.brand}>
					<NetCanvas color="#b9b1e8" density={58} />
					<div className={styles.brandContent}>
						<Logo className={styles.brandLogo} />

						<div className={styles.brandMiddle}>
							{/* desktop brand copy */}
							<div className={styles.brandHeadline}>
								Welcome to the
								<br />
								network.
							</div>
							<div className={styles.brandSub}>
								Connect with the people and ideas that matter to you.
							</div>
							{/* mobile hero copy (page-specific) */}
							<div className={styles.heroTitle}>{heroTitle}</div>
							<div className={styles.heroSub}>{heroSub}</div>
						</div>

						<div className={styles.brandFoot}>© notfacebook</div>
					</div>
				</aside>

				<main className={styles.formCol}>
					<div className={styles.formInner}>{children}</div>
				</main>
			</div>
		</div>
	);
};

export default AuthLayout;
