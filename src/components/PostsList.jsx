import { useEffect, useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

function PostsList({ isPosting, onStopPosting }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const response = await fetch('https://react-sample-backend.vercel.app/posts');
            const resData = await response.json();
            setPosts(resData.posts);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    function addPostHandler(postData) {
        async function addPost() {
            setLoading(true);
            const response = await fetch('https://react-sample-backend.vercel.app/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const newPost = await response.json();
            setLoading(false);
            setPosts((existingData) => [newPost, ...existingData]);
        }

        addPost();
    }

    const handleEditPost = (id, newAuthor, newBody) => {
        async function editPost() {
            setLoading(true);
            await fetch(`https://react-sample-backend.vercel.app/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ author: newAuthor, body: newBody })
            });
            setLoading(false);
            setPosts(posts.map(post => 
                post.id === id ? { ...post, author: newAuthor, body: newBody } : post
            ));
        }

        editPost();
    };

    const handleDeletePost = (id) => {
        async function deletePost() {
            setLoading(true);
            await fetch(`https://react-sample-backend.vercel.app/posts/${id}`, {
                method: 'DELETE'
            });
            setLoading(false);
            setPosts(posts.filter(post => post.id !== id));
        }

        deletePost();
    };

    return (
        <>
            {isPosting && (
                <Modal onCloseModal={onStopPosting}>
                    <NewPost
                        onCancel={onStopPosting}
                        onAddPost={addPostHandler}
                    />
                </Modal>
            )}

            {loading && <LoadingSpinner />}

            {!loading && posts.length > 0 && (
                <ul className='posts'>
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            author={post.author}
                            body={post.body}
                            onEdit={(newAuthor, newBody) => handleEditPost(post.id, newAuthor, newBody)}
                            onDelete={() => handleDeletePost(post.id)}
                        />
                    ))}
                </ul>
            )}

            {!loading && posts.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>There is no post yet.</h2>
                    <p>Try to add some!</p>
                </div>
            )}
        </>
    );
}

export default PostsList;