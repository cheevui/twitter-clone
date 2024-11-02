// import axios from "axios";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import useLocalStorage from "use-local-storage";
import { AuthContext } from "../components/AuthProvider";


export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1";
    // const url = "https://wnshw2-3000.csb.app"
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp")
    const handleShowLogin = () => setModalShow("Login")
    // const handleClose = () => setModalShow(false);
    // const handleShow = () => setModalShow(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            navigate("/profile");
        }
    }, [currentUser, navigate])

    // useEffect(() => {
    //     if (authToken) {
    //         navigate("/profile")
    //     }
    // }, [authToken, navigate]);

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     if (!username || !password) {
    //         console.error("Username or password is missing.");
    //         return;
    //     }
    //     try {
    //         const res = await axios.post(`${url}/login`, { username, password });
    //         if (res.data && res.data.auth === true && res.data.token) {
    //             setAuthToken(res.data.token);
    //             console.log("Login was successful, token saved");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    //Firebase

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    }

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => setModalShow(null);

    // const handleSignUp = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post(`${url}/signup`, { username, password });
    //         console.log(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6}>
                <i className="bi bi-twitter" style={{ fontSize: 50, color: "doudgerblue" }}></i>

                <p className="mt-5" style={{ fontSize: 64 }}>Happening Now</p>
                <h2 className="my-5" style={{ fontSize: 31 }}>Join Twitter Today.</h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                        <i className="bi bi-google"></i> Sign Up With Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{ fontSize: "12px" }}>
                        By signing up, you agree to the Terms of Service and Privacy Policy including Cookies Use
                    </p>

                    <p className="mt-5" style={{ fontWeight: "bold" }}>
                        Already have an account?
                    </p>
                    <Button
                        className="rounded-pill"
                        variant="outline-primary"
                        onClick={handleShowLogin}
                    >
                        Sign In
                    </Button>
                </Col>
            </Col>
            <Modal
                show={modalShow !== null}
                onHide={handleClose}
                animation={false}
                centered
            >
                <Modal.Body>
                    <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                        {modalShow === "SignUp"
                            ? "Create your account"
                            : "Log in to your account"
                        }
                    </h2>
                    <Form
                        className="d-grid gap-2 px-5"
                        onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                    >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <p style={{ fontSize: "12px" }}>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cooki Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalising our services, including ads. Learn mmore. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                        </p>

                        <Button className="rounded-pill" type="submit">
                            {modalShow === "SignUp" ? "Sign Up" : "Login"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Row>
    );
}