import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../../libs/errorLib";
import config from "../../config";
import { FormGroup, FormControl, FormLabel, FormFile, Button, InputGroup, Col } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import "./Tasks.css";
import { s3Upload, s3Delete } from "../../libs/awsLib";

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

    // TODO
    // Implement functionality to create a subtask within main task
    // function addSubTask() {

    //     console.log("adding tasks " + subTasks);
    //     return subTasks.map((subTask) =>
    //     (
    //         <ListGroupItem key={subTask}>
    //             <FormGroup>
    //                 <FormControl
    //                     value={subTask}
    //                     componentclass="textarea"
    //                     // onChange={e => setContent(e.target.value)}
    //                 />
    //             </FormGroup>
    //         </ListGroupItem>
    //     )
    //     );
    // }

    function saveTask(task) {
        return API.put("tasks", `/tasks/${id}`, {
            body: task
        });
    }

    function deleteTask() {
        return API.del("tasks", `/tasks/${id}`);
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

        try {
            if (file.current) {
                attachment = await s3Upload(file.current);
            }

            if (attachment) {
                await s3Delete(task.attachment);
            }

            await saveTask({
                content,
                attachment: attachment || task.attachment
            });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this task? The task and it's attachment will be deleted."
        );

        if (!confirmed) {
            return;
        }
        setIsDeleting(true);

        try {
            await s3Delete(task.attachment);
            await deleteTask();
            history.push("/");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }

    return (
        <div className="Tasks">
            {
                task && (
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <InputGroup controlid="content" as={Col}>
                                <FormControl
                                    value={content}
                                    componentclass="textarea"
                                    onChange={e => setContent(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-secondary"
                                        // onClick={addSubTask}
                                    >
                                        <b>{"\uFF0B"}</b>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </FormGroup>
                        {/* <ListGroup>{addSubTask}</ListGroup> */}
                        {
                            task.attachment && (
                                <FormGroup>
                                    <b><FormLabel>Attachment</FormLabel></b>
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
                                variant="success"
                                onClick={handleDelete}
                                isLoading={isDeleteting}
                            >
                                Complete
                            </LoaderButton>
                    </form>
                )
            }
        </div>
    );
}