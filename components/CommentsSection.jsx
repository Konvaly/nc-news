import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = 'https://nc-news-app-wyry.onrender.com/api';

function CommentsSection({ article_id }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!article_id) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        setComments([]);

        const commentsApiUrl = `${API_BASE_URL}/articles/${article_id}/comments`;

        axios.get(commentsApiUrl)
            .then(response => {
                if (response.data && Array.isArray(response.data.comments)) {
                    setComments(response.data.comments)
                } else {
                    setComments([])
                }
                setLoading(false)
            })
            .catch(error => {
                let errorMsg = '';

                if (error.response && error.response.data && error.response.data.msg) {
                    errorMsg = error.response.data.msg;
                } else if (error.message) {
                    errorMsg = error.message;
                } else {
                    errorMsg = "Failed to fetch comments."
                }
                setError(errorMsg);
                setComments([]);
                setLoading(false);
            })

    }, [article_id])


    if (!article_id) {
        return <section className="comments-section-error">Cannot load comments without article ID.</section>;
    }

    let commentsContent = '';
    if (loading) {
        commentsContent = <p>Loading comments...</p>;
    } else if (error) {
        commentsContent = <p className="error-message">Error loading comments: {error}</p>
    } else if (comments.length === 0) {
        commentsContent = <p>No comments yet.</p>;
    }
    else {
        commentsContent = (
            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment.comment_id} className="comment-card-placeholder">
                        <p>{comment.body}</p>
                        <small>By: {comment.author} | Votes: {comment.votes}</small>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <section className="comments-section">
            <h2>Comments ({loading || error ? '...' : comments.length})</h2>
            {commentsContent}
        </section>
    );
}

export default CommentsSection;