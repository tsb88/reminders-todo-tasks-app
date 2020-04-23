import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./LoaderButton.css";

export default function LoaderButton({
    isLoading,
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <Button
        className = "LoaderButton"
        disabled={disabled || isLoading}
        {...props}>
            {isLoading && <FontAwesomeIcon icon="sync" className="fontawesome" spin />}
            {props.children}
        </Button>
    );
}