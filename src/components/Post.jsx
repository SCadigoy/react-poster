import { useState, useEffect } from 'react';

function Post(props) {
    const storedDeletedState = localStorage.getItem(`post-${props.author}`) === 'true';
    const [isDeleted, setIsDeleted] = useState(storedDeletedState);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBody, setEditedBody] = useState(localStorage.getItem(`post-${props.author}-body`) || props.body);
    const [editedAuthor, setEditedAuthor] = useState(localStorage.getItem(`post-${props.author}-author`) || props.author);

    useEffect(() => {
        localStorage.setItem(`post-${props.author}`, isDeleted);
    }, [isDeleted, props.author]);

    function handleDelete() {
        setIsDeleted(true);
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function handleSave() {
        setIsEditing(false);
        localStorage.setItem(`post-${props.author}-body`, editedBody);
        localStorage.setItem(`post-${props.author}-author`, editedAuthor);
    }

    function handleBodyChange(event) {
        setEditedBody(event.target.value);
    }

    function handleAuthorChange(event) {
        setEditedAuthor(event.target.value);
    }

    if (isDeleted) {
        return null;
    }

    return (
        <li className="post">
            {isEditing ? (
                <input
                    type="text"
                    value={editedAuthor}
                    onChange={handleAuthorChange}
                />
            ) : (
                <p className="author">{editedAuthor}</p>
            )}
            {isEditing ? (
                <textarea value={editedBody} onChange={handleBodyChange} />
            ) : (
                <p className="text">{editedBody}</p>
            )}
            {isEditing ? (
                <button className='button' onClick={handleSave}>Save</button>
            ) : (
                <button className='button' onClick={handleEdit}>Edit</button>
            )}
            <button className='button' onClick={handleDelete}>Delete</button>
        </li>
    );
}

export default Post;