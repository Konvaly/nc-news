import axios from "axios";
import { useState } from "react";

const API_BASE_URL = 'https://nc-news-app-wyry.onrender.com/api';

function SingleArticleDetails({ article }) {
    const [voteChange, setVoteChange] = useState(0);
    const [isVoting, setIsVoting] = useState(false);
    const [voteError, setVoteError] = useState(null);

    if (!article) {
        return <p>Article details are not available.</p>;

    }

    const handleVote = (voteIncrement) => {

        let newVoteChange = voteChange + voteIncrement;
        if (newVoteChange > 1) {
            newVoteChange = 1
        };
        if (newVoteChange < -1) {
            newVoteChange = -1
        };
        if (newVoteChange === voteChange) {
            return
        }
        // Store previous state for potential rollback on API error
        const previousVoteChange = voteChange;

        setVoteChange(newVoteChange);
        setIsVoting(true);
        setVoteError(null);

        const patchUrl = `${API_BASE_URL}/articles/${article.article_id}`;
        const patchBody = { inc_votes: voteIncrement }

        axios.patch(patchUrl, patchBody)
            .then(response => {
                setIsVoting(false)
            })
            .catch(error => {
                setVoteChange(previousVoteChange);

                let errorMsg = '';
                if (error.response && error.response.data && error.response.data.msg) {
                    errorMsg = error.response.data.msg;
                } else if (error.message) {
                    errorMsg = error.message;
                } else {
                    errorMsg = "Failed to save vote.";
                }

                setIsVoting(false);
            })
    }

    let formattedDate = 'Date unknown';
    if (article.created_at) {
        try {
            formattedDate = new Date(article.created_at).toLocaleString('en-GB', {
                dateStyle: 'long',
                timeStyle: 'short'
            });

        } catch (dateError) {
            console.error("Error formatting date:", dateError);
        }
    } else {
        console.log("created_at field missing.");
    }

    const hasImage = Boolean(article.article_img_url);

    const displayedVotes = article.votes + voteChange;

    return (
        <article className="single-article-details">
            <h1>{article.title}</h1>

            {hasImage && (
                <img
                    className="single-article-image"
                    src={article.article_img_url}
                    alt={`Main visual content for article titled: ${article.title}`}
                />
            )}

            <div className="article-body">
                <p>{article.body}</p>
            </div>
            <div className="article-meta">
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Posted: {formattedDate}</p>

                <div className="article-voting-controls">
                    <p><strong>Votes:</strong> {displayedVotes}</p>
                    <button
                        onClick={() => handleVote(1)}
                        disabled={isVoting || voteChange === 1} // Disable if voting or already upvoted (+1)
                        aria-label="Upvote article"
                    >
                        Vote Up {voteChange === 1 ? '(Voted)' : ''}
                    </button>
                    <button
                        onClick={() => handleVote(-1)}
                        disabled={isVoting || voteChange === -1} // Disable if voting or already downvoted (-1)
                        aria-label="Downvote article"
                    >
                        Vote Down {voteChange === -1 ? '(Voted)' : ''}
                    </button>
                    {isVoting && <p className="voting-status">Voting...</p>}
                    {voteError && <p className="error-message-vote-error">Error: {voteError}</p>}
                </div>
            </div>
        </article>
    )
}

export default SingleArticleDetails;