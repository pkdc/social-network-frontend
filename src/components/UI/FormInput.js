import { useState } from "react";
import styles from "./FormInput.module.css";

const EyeIcon = ({ off }) => (
	<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
		<path d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z" />
		<circle cx="10" cy="10" r="2.5" />
		{off && <line x1="3" y1="3" x2="17" y2="17" strokeLinecap="round" />}
	</svg>
);

const FormInput = (props) => {
	const [show, setShow] = useState(false);
	const isPassword = props.type === "password";
	const required = props.required === undefined ? true : props.required;

	const classes = `${styles["input"]} ${isPassword ? styles["input--pw"] : ""} ${props.className || ""}`;

	const input = (
		<input
			required={required}
			className={classes}
			onChange={props.onChange}
			id={props.id}
			type={isPassword ? (show ? "text" : "password") : props.type}
			name={props.name}
			value={props.value}
			placeholder={props.placeholder}
			accept={props.accept}
		/>
	);

	return (
		<div className={styles["input-container"]}>
			{isPassword ? (
				<span className={styles["pw-wrap"]}>
					{input}
					<button
						type="button"
						className={styles["pw-eye"]}
						onClick={() => setShow((s) => !s)}
						aria-label={show ? "Hide password" : "Show password"}
					>
						<EyeIcon off={show} />
					</button>
				</span>
			) : (
				input
			)}
		</div>
	);
};

export default FormInput;
