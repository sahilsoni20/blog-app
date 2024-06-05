import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addDoc, collection } from "firebase/firestore"
import { firebaseAuth, firebaseDb } from "../lib/FireBase";


export function CreatePost() {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postCollectionRef = collection(firebaseDb, "posts");

    const navigate = useNavigate();

    const createPost = async () => {
        await addDoc(postCollectionRef, {
            title: title,
            postText: postText,
            heart: 0,
            author: {
                name: firebaseAuth.currentUser?.displayName,
                id: firebaseAuth.currentUser?.uid,
            },
        });
        navigate("/");
    }

    return (
        <div>
            <div>
                <h1>Create a Post</h1>
                <div></div>
                <div>
                    <input type="text" name="title" placeholder="Title" onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div>
                    <textarea placeholder="Post..." onChange={(event) => setPostText(event.target.value)}/>
                </div>
                <button onClick={createPost}>Share Post</button>
            </div>
        </div>
    )
}
