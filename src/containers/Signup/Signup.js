import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    FormGroup,
    FormControl,
    FormLabel,
    FormText
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";

export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: ""
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationCode() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);
        try {
            const newUser = await Auth.signup({
                username: fields.email,
                password: fields.password
            });
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();

        setIsLoading(true);
        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);

            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                    <FormText>Please check your email for the code.</FormText>
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateConfirmationCode()}
                >
                    Verify
                </LoaderButton>
            </form>
        );
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
                </LoaderButton>
            </form>
        );
    }

    return (
        <div className="Signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}