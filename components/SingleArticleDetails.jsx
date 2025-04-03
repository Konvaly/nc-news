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
            console.log("Original Date:", article.created_at, "-> Formatted:", formattedDate);
        } catch (dateError) {
            console.error("Error formatting date:", dateError);
        }
    } else {
        console.log("created_at field missing.");
    }

    return (
        <article className="single-article-details">
            <h1>{article.title}</h1>
            <div className="article-meta">
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes}</p>
            </div>

            <p>Article body placeholder...</p>
        </article>
    )
}

export default SingleArticleDetails;