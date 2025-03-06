import React, { useState } from 'react';

function Post({ author, body, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedAuthor, setEditedAuthor] = useState(author);
    const [editedBody, setEditedBody] = useState(body);

    function handleEdit() {
        setIsEditing(true);
    }

    function handleSave() {
        setIsEditing(false);
        onEdit(editedAuthor, editedBody);
    }

	
    return (
        <li className='post'>
            {isEditing ? (
                <input
                    className='author'
                    value={editedAuthor}
                    onChange={(e) => setEditedAuthor(e.target.value)}
                />
            ) : (
                <p className='author'>{author}</p>
            )}
            {isEditing ? (
                <input style={{ maxWidth: '210px'}}
                    className='text'
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                />
            ) : (
                <p className='text'>{body}</p>
            )}
            {isEditing ? (
                <button className='button' onClick={handleSave}>Save</button>
            ) : (
                <button className='button' onClick={handleEdit}>Edit</button>
            )}
            <button className='button' onClick={onDelete}>Delete</button>
        </li>
    );
}

export default Post;