import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../../libs/errorLib";
import config from "../../config";
import { FormGroup, FormControl, FormLabel, FormFile, Button } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./Tasks.css";

export default function Tasks() {
    const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();
    const [task, setTask] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadTask() {
            return API.get("tasks", `/tasks/${id}`);
        }

        async function onLoad() {
            try {
                const task = await loadTask();
                const { content, attachment } = task;
                if (attachment) {
                    task.attachmentUrl = await Storage.vault.get(attachment);
                }
                setContent(content);
                setTask(task);
            } catch (e) {
                onError(e);
            }
        }
        onLoad();
    }, [id]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let attachment;
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
            );
            return;
        }
        setIsLoading(true);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }
        setIsDeleting(true);
    }

    return (
        <div className="Tasks">
            {
                task && (
                    <form onSubmit={handleSubmit}>
                        <FormGroup controlId="content">
                        <span>
                            <FormControl
                                value={content}
                                componentclass="textarea"
                                onChange={e => setContent(e.target.value)}
                            />
                            <Button
                                variant="outline-secondary"
                            >
                                <b>{"\uFF0B"}</b>
                            </Button>
                            </span>
                        </FormGroup>
                        {
                            task.attachment && (
                                <FormGroup>
                                    <FormLabel>Attachment</FormLabel>
                                    <div>
                                        <FormFile.Label>
                                            <a 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={task.attachmentUrl}
                                            >
                                                {formatFilename(task.attachment)}
                                            </a>
                                        </FormFile.Label>
                                    </div>
                                </FormGroup>
                            )
                        }
                        <FormGroup controlId="file">
                            {!task.attachment && <FormLabel>Attachment</FormLabel>}
                            <FormControl
                                onChange={handleFileChange}
                                type="file"
                            />
                        </FormGroup>
                        <LoaderButton
                            type="submit"
                            size="lg"
                            variant="primary"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                            >
                                Save
                            </LoaderButton>
                            <LoaderButton
                                size="lg"
                                variant="danger"
                                onClick={handleDelete}
                                isLoading={isDeleteting}
                            >
                                Delete
                            </LoaderButton>
                    </form>
                )
            }
        </div>
    );
}