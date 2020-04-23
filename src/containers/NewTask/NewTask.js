import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../libs/errorLib";
import { API } from "aws-amplify";
import config from "../../config";
import "./NewTask.css";
import { s3Upload } from "../../libs/awsLib";

export default function NewTask() {
    const file = useRef(null);
    const history = useHistory();
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return content.length > 0;
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
            );
            return;
        }
        setIsLoading(true);
        try {
            const attachment = file.current ? await s3Upload(file.current) : null;
            await createTask({ content, attachment });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createTask(task) {
        return API.post("tasks", "/tasks", {
            body: task
        });
    }

    return (
        <div className="NewTask">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="content">
                    <FormControl
                        placeholder="Enter task"
                        value={content}
                        componentClass="textarea"
                        onChange={e => setContent(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="file">
                    <FormLabel>Attachment</FormLabel>
                    <FormControl
                        onChange={handleFileChange}
                        type="file"
                    />
                </FormGroup>
                <LoaderButton
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
                </LoaderButton>
            </form>
        </div>
    );
}