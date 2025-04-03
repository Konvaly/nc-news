function SingleArticleDetails({ article }) {
    if (!article) {
        return <p>Article details are not available.</p>;

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
                <p>Votes: {article.votes}</p>
            </div>
        </article>
    )
}

export default SingleArticleDetails;