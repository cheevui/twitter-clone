import { useContext, useState } from "react";
// import { jwtDecode } from "jwt-decode"
// import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function NewPostModal({ show, handleClose }) {
    // const [postContent, setPostContent] = useState("")
    // const dispatch = useDispatch();

    //Firestore
    const [postContent, setPostContent] = useState("")
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);

    const handleSave = () => {
        // // Get stored JWT Token
        // const token = localStorage.getItem("authToken");

        // const decodedToken = jwtDecode(token); //Decode the token to get user id
        // const userId = decodedToken.id; //May Change depending on how the server encode the token

        // const data = {
        //     title: "Post Title",
        //     content: postContent,
        //     user_id: userId
        // };

        // axios
        //     .post("https://wnshw2-3000.csb.app/posts", data)
        //     .then((response) => {
        //         console.log("Success: ", response.data);
        //         handleClose();
        //     })
        //     .catch((error) => console.error("Error: ", error));

        // dispatch(savePost(postContent));
        // handleClose();
        // setPostContent("")

        //Firestore
        if (currentUser) {
            const userId = currentUser.uid;
            dispatch(savePost({ userId, postContent, file }));
            handleClose();
            setPostContent("")
            setFile(null);
        };
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control
                                placeholder="What is happening?!"
                                as="textarea"
                                rows={3}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                            <br />
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={handleSave}
                    >
                        Tweet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}