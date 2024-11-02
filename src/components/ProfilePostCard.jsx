// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
// import { useEffect } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { deletePost, likePost, removeLikeFromPost } from "../features/posts/postsSlice";
import UpdatePostModal from "./UpdatePostModal";


// export default function ProfilePostCard({ content, postId }) {
//     // const [likes, setLikes] = useState(0);
//     const [likes, setLikes] = useState([]);
//     // const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

//     // useEffect(() => {
//     //     fetch(`https://wnshw2-3000.csb.app/likes/post/${postId}`)
//     //         .then((response) => response.json())
//     //         .then((data) => setLikes(data.length))
//     //         .catch((error) => console.error("Error: ", error))
//     // }, [postId]);

//     const token = localStorage.getItem("authToken");
//     const decode = jwtDecode(token);
//     const userId = decode.id;

//     const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
//     const BASE_URL = "https://wnshw2-3000.csb.app"

//     useEffect(() => {
//         fetch(`${BASE_URL}/likes/post/${postId}`)
//             .then((response) => response.json())
//             .then((data) => setLikes(data))
//             .catch((error) => console.error("Error:", error));
//     }, [postId]);

//     const isLiked = likes.some((like) => like.user_id === userId);

//     const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

//     const addToLikes = () => {
//         axios.post(`${BASE_URL}/likes`, {
//             user_id: userId,
//             post_id: postId,
//         })
//             .then((response) => {
//                 setLikes([...likes, { ...response.data, likes_id: response.data.id }]);
//             })
//             .catch((err) => console.error("Error:", err));
//     }

//     const removeFromLikes = () => {
//         const like = likes.find((like) => like.user_id === userId);
//         if (like) {
//             axios
//                 .put(`${BASE_URL}/likes/${userId}/${postId}`)
//                 .then(() => {
//                     //Update the state to reflect the removal of the like
//                     setLikes(likes.filter((likeItem) => likeItem.user_id !== userId));
//                 })
//                 .catch((err) => console.error("Error:", err));
//         }
//     };

//     return (
//         <Row
//             className="p-3"
//             style={{
//                 borderTop: "1px solid #D3D3D3",
//                 borderBottom: "1px solid #D3D3D3"
//             }}
//         >
//             <Col sm={1}>
//                 <Image src={pic} fluid roundedCircle />
//             </Col>

//             <Col>
//                 <strong>Haris</strong>
//                 <span>@haris.samingan · Apr 16</span>
//                 <p>{content}</p>
//                 <div className="d-flex justify-content-between">
//                     <Button variant="light">
//                         <i className="bi bi-chat"></i>
//                     </Button>
//                     <Button variant="light">
//                         <i className="bi bi-repeat"></i>
//                     </Button>
//                     <Button variant="light" onClick={handleLike}>
//                         {isLiked ? (
//                             <i className="bi bi-heart-fill text-danger">{likes.length}</i>
//                         ) : (
//                             <i className="bi bi-heart">{likes.length}</i>
//                         )}
//                     </Button>
//                     <Button variant="light">
//                         <i className="bi bi-graph-up"></i>
//                     </Button>
//                     <Button variant="light">
//                         <i className="bi bi-upload"></i>
//                     </Button>
//                 </div>
//             </Col>
//         </Row>
//     )
// }


//Firestore
export default function ProfilePostCard({ post }) {
    const { content, id: postId, imageUrl } = post;
    const [likes, setLikes] = useState(post.likes || []);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    //user has liked the post if their id is in the likes array
    const isLiked = likes.includes(userId);
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

    const addToLikes = () => {
        setLikes([...likes, userId]);
        dispatch(likePost({ userId, postId }));
    };

    const removeFromLikes = () => {
        setLikes(likes.filter((id) => id !== userId));
        dispatch(removeLikeFromPost({ userId, postId }));
    };

    const handleDelete = () => {
        dispatch(deletePost({ userId, postId }))
    };

    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3"
            }}
        >
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Haris</strong>
                <span>@haris.samingan · Apr 16</span>
                <p>{content}</p>
                <Image src={imageUrl} style={{ width: 150 }} />
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light" onClick={handleLike}>
                        {isLiked ? (
                            <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                        {likes.length}
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                    <Button variant="light">
                        <i
                            className="bi bi-pencil-square"
                            onClick={handleShowUpdateModal}
                        ></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-trash" onClick={handleDelete}></i>
                    </Button>
                    <UpdatePostModal
                        show={showUpdateModal}
                        handleClose={handleCloseUpdateModal}
                        postId={postId}
                        originalPostContent={content}
                    />
                </div>
            </Col>
        </Row>
    )
}