import { Button, Col } from "react-bootstrap";
import IconButton from "./IconButton";
import { useState } from "react";
import NewPostModal from "./NewPostModal";
// import ChatbotModal from "./ChatbotModal";


export default function ProfileSideBar({ handleLogout }) {
    const [show, setShow] = useState(false);
    // const [showChatbot, setShowChatbot] = useState(false);

    // const handleCloseChatbot = () => setShowChatbot(false);
    // const handleShowChatbot = () => setShowChatbot(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Col
            sm={2}
            className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
            style={{ position: "sticky", top: 0 }}
        >
            <IconButton className="bi bi-twitter" isTop />
            <IconButton className="bi bi-house" text="Home" />
            <IconButton className="bi bi-search" text="Explore" />
            <IconButton className="bi bi-bell" text="Notification" />
            <IconButton className="bi bi-envelope" text="Message" />
            <IconButton className="bi bi-journal-text" text="Lists" />
            <IconButton className="bi bi-bookmark" text="Bookmarks" />
            <IconButton className="bi bi-patch-check" text="Verified" />
            <IconButton className="bi bi-person" text="Profile" />
            <IconButton className="bi bi-filter-circle" text="More" />
            {/* <IconButton className="bi bi-chat-square-text" text="Chatbot" onClick={handleShowChatbot} /> */}
            <IconButton
                className="bi bi-door-closed"
                text="Logout"
                onClick={handleLogout}
            />
            <Button className="rounded-pill w-100 mb-3" onClick={handleShow}>
                Tweet
            </Button>

            <NewPostModal show={show} handleClose={handleClose} />
            {/* <ChatbotModal show={showChatbot} handleClose={handleCloseChatbot} /> */}
        </Col>
    );
}