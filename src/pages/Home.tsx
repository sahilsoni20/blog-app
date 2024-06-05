import { useState, useEffect } from "react";
import { IoMdTrash, IoIosHeart } from "react-icons/io";
import {
  collection,
  CollectionReference,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc, // Import the 'doc' function
} from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../lib/FireBase";

type Post = {
  heart: number;
  author: { id: number; name: string };
  id: string;
  postText: string;
  title: string;
};

export function Home() {
  const [post, setPost] = useState<Post[]>([]);
  const postCollectionRef = collection(
    firebaseDb,
    "posts"
  ) as CollectionReference<Post>;

  useEffect(() => {
    const getPost = () => {
      onSnapshot(postCollectionRef, (snapshot) =>
        setPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    };
    getPost();
  }, []);

  const deletePost = (id: string) => {
    const postDoc = doc(firebaseDb, `posts/${id}`); // Correct the path to 'posts'
    deleteDoc(postDoc);
  };

  const likePost = (id: string, heart: number) => {
    const postDoc = doc(firebaseDb, `posts/${id}`); // Correct the path to 'posts'
    const updatedHeart = { heart: heart + 1 };
    updateDoc(postDoc, updatedHeart); // Pass the updated fields as the second argument
  };

  return (
    <div>
      {post.map(({ title, id, postText, author, heart }) => {
        return (
          <div key={id}>
            <header>
              <h1>{title}</h1>
              {author.id === Number(firebaseAuth.currentUser?.uid) && ( 
                <button
                  onClick={() => {
                    deletePost(id);
                  }}
                >
                  <IoMdTrash />
                </button>
              )}
            </header>
            <div></div>
            <div>
              <p>{postText}</p>
            </div>
            <div>
              <span>Author: {author.name}</span>
              <div>
                {author.id === firebaseAuth.currentUser?.uid ? (
                  ""
                ) : (
                  <button
                    onClick={() => {
                      likePost(id, heart);
                    }}
                  >
                    <IoIosHeart />
                  </button>
                )}
                <p>
                  {heart}
                  {author.id === firebaseAuth.currentUser?.uid ? (
                    <IoIosHeart />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
