import styles from "./Logo.module.css";

// The 3-node network glyph + "notfacebook" wordmark used on all public pages.
// Colors are driven by CSS custom properties so a parent (e.g. the violet brand
// panel or the mobile hero card) can recolor it without a new variant:
//   --logo-mark-bg  square background   (default: --nf-violet)
//   --logo-glyph    glyph stroke/fill   (default: #fff)
//   --logo-text     wordmark color      (default: --nf-violet)
const Logo = (props) => {
	const classes = `${styles.logo} ${props.className || ""}`;
	return (
		<span className={classes}>
			<span className={styles.mark}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<circle cx="10" cy="4.5" r="2" fill="currentColor" />
					<circle cx="3.5" cy="15.5" r="2" fill="currentColor" />
					<circle cx="16.5" cy="15.5" r="2" fill="currentColor" />
					<line x1="10" y1="4.5" x2="3.5" y2="15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
					<line x1="10" y1="4.5" x2="16.5" y2="15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
					<line x1="3.5" y1="15.5" x2="16.5" y2="15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
				</svg>
			</span>
			<span className={styles.text}>notfacebook</span>
		</span>
	);
};

export default Logo;
