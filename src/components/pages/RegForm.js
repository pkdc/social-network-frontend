import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../UI/Form";
import FormInput from "../UI/FormInput";
import FormLabel from "../UI/FormLabel";
import FormTextarea from "../UI/FormTextarea";
import LgButton from "../UI/LgButton";
import ImgUpload from "../UI/ImgUpload";
import LoadingSpinner from "../UI/LoadingSpinner";
import { AuthContext } from "../store/auth-context";
import AuthLayout from "./AuthLayout";
import af from "./AuthForm.module.css";

const CameraIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H6l1.2-1.8A1 1 0 0 1 8 4.7h8a1 1 0 0 1 .8.5L18 7h1.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5Z" />
        <circle cx="12" cy="12.5" r="3.2" />
    </svg>
);

const RegForm = () => {
    const ctx = useContext(AuthContext);

    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPw, setEnteredPw] = useState("");
    const [enteredFName, setEnteredFName] = useState("");
    const [enteredLName, setEnteredLName] = useState("");
    const [enteredDob, setEnteredDob] = useState("");
    const [uploadedImg, setUploadedImg] = useState("");
    const [enteredNickname, setEnteredNickname] = useState("");
    const [enteredAbout, setEnteredAbout] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        ctx.regSuccess && navigate("/login", { replace: true })
    }, [ctx.regSuccess]);

    useEffect(() => {
        setIsLoading(ctx.regIsLoading);
        setError(ctx.regError);
    }, [ctx.regIsLoading, ctx.regError]);

    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);
        console.log(enteredEmail);
    };
    const pwChangeHandler = (e) => {
        setEnteredPw(e.target.value);
        console.log(enteredPw);
    };
    const fNameChangeHandler = (e) => {
        setEnteredFName(e.target.value);
        console.log(enteredFName);
    };
    const lNameChangeHandler = (e) => {
        setEnteredLName(e.target.value);
        console.log(enteredLName);
    };
    const dobChangeHandler = (e) => {
        setEnteredDob(e.target.value);
        console.log(enteredDob);
    };
    const avatarHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            console.log(reader.result);
            setUploadedImg(reader.result);
        })

        setUploadedImg(e.target.value);
        console.log(uploadedImg);
    };
    const nicknameChangeHandler = (e) => {
        setEnteredNickname(e.target.value);
        console.log(enteredNickname);
    };
    const aboutChangeHandler = (e) => {
        setEnteredAbout(e.target.value);
        console.log(enteredAbout);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const regPayloadObj = {
            email: enteredEmail,
            pw: enteredPw,
            fname: enteredFName,
            lname: enteredLName,
            Dob: enteredDob,
            avatar: uploadedImg,
            nname: enteredNickname,
            about: enteredAbout,
        };
        console.log(regPayloadObj);

        ctx.onReg(regPayloadObj);

        setEnteredEmail("");
        setEnteredPw("");
        setEnteredFName("");
        setEnteredLName("");
        setEnteredDob("");
        setUploadedImg("");
        setEnteredNickname("");
        setEnteredAbout("");

        ctx.setErrMsg("");
    };

    const resetHandler = () => {
        setError(false);
    };

    return (
        <AuthLayout
            heroTitle="Join the network."
            heroSub="Create your account in under a minute."
        >
            <h1 className={af.h1}>Create your account</h1>
            <p className={af.subhead}>Join the network in under a minute.</p>

            {!isLoading && error && (
                <>
                    <p className={af.error}>{error}</p>
                    <div className={af.tryAgain}><LgButton onClick={resetHandler}>Try Again</LgButton></div>
                </>
            )}

            {!isLoading && !error && (
                <Form onSubmit={submitHandler}>
                    <div className={af.field}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormInput type="email" name="email" id="email" placeholder="abc@mail.com" value={enteredEmail} onChange={emailChangeHandler} />
                    </div>
                    <div className={af.field}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormInput type="password" name="password" id="password" placeholder="Choose a password" value={enteredPw} onChange={pwChangeHandler} />
                    </div>
                    <div className={af.row2}>
                        <div className={af.field}>
                            <FormLabel htmlFor="fname">First Name</FormLabel>
                            <FormInput type="text" name="fname" id="fname" placeholder="Homer" value={enteredFName} onChange={fNameChangeHandler} />
                        </div>
                        <div className={af.field}>
                            <FormLabel htmlFor="lname">Last Name</FormLabel>
                            <FormInput type="text" name="lname" id="lname" placeholder="Simpson" value={enteredLName} onChange={lNameChangeHandler} />
                        </div>
                    </div>
                    <div className={af.field}>
                        <FormLabel htmlFor="Dob">Date of Birth</FormLabel>
                        <FormInput type="date" name="Dob" id="Dob" value={enteredDob} onChange={dobChangeHandler} />
                    </div>
                    <div className={af.field}>
                        <FormLabel optional>Avatar</FormLabel>
                        <div className={af.avatarUpload}>
                            <div className={af.avatarDrop}>
                                {uploadedImg ? <img src={uploadedImg} alt="Avatar preview" /> : <CameraIcon />}
                            </div>
                            <ImgUpload name="avatar" id="avatar" accept=".jpg, .jpeg, .png, .gif" text="Upload photo" onChange={avatarHandler} />
                        </div>
                    </div>
                    <div className={af.field}>
                        <FormLabel htmlFor="nname" optional>Nickname</FormLabel>
                        <FormInput type="text" name="nname" id="nname" placeholder="Pikachu" required={false} value={enteredNickname} onChange={nicknameChangeHandler} />
                    </div>
                    <div className={af.field}>
                        <FormLabel htmlFor="about" optional>About Me</FormLabel>
                        <FormTextarea name="about" id="about" placeholder="About me…" rows={4} value={enteredAbout} onChange={aboutChangeHandler} />
                    </div>
                    <LgButton className={af.submit} type="submit">Create Account</LgButton>
                    <p className={af.foot}>Already have an account? <Link to="/login">Log in</Link></p>
                </Form>
            )}

            {isLoading && (
                <div className={af.loadingWrap}>
                    <LoadingSpinner />
                    <h2 className={af.loading}>Registering New User...</h2>
                </div>
            )}
        </AuthLayout>
    )
};

export default RegForm;
