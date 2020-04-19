import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";
import { onError } from "../../libs/errorLib";
import "./Login.css";
import LoaderButton from "../../components/LoaderButton";

export default function Login() {

    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            setIsLoading(false);
            onError(e);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl 
                        autoFocus 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        type="password" 
                    />
                </FormGroup>
                <LoaderButton 
                    block 
                    bsSize="large" 
                    disabled={!validateForm()} 
                    isLoading={isLoading} 
                    type="submit"
                >
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}