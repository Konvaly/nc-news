import { useState } from "react";

function CommentForm({ onSubmit, isSubmitting }) {
    const [commentBody, setCommentBody] = useState('');

    const handleInputChange = (event) => {
        setCommentBody(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedBody = commentBody.trim();
        if (!trimmedBody) {
            alert("Please enter a comment before posting!");
            return;
        }
        onSubmit(trimmedBody);
        setCommentBody('');
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <label htmlFor="new-comment-body" >
                Add a comment:
            </label>
            <fieldset disabled={isSubmitting}>
                <textarea
                    id="new-comment-body"
                    placeholder="Share your thoughts..."
                    rows="4"
                    required
                    value={commentBody}
                    onChange={handleInputChange}
                />
                <button type="submit">Post Comment</button>
            </fieldset>
        </form>
    );
}

export default CommentForm;