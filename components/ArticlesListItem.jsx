function ArticlesListItem({ article }) {
    if (!article) {
        return null;
    }

    const hasImage = Boolean(article.article_img_url);

    return (
        <li className="article-list-item">
            <article>
                {hasImage &&
                    <img
                        src={article.article_img_url}
                        alt={`Cover image for ${article.title}`} />}
                <h2>{article.title}</h2>
                <p>By: {article.author}</p>
                <p>Votes: {article.votes}</p>
            </article>
        </li>
    )
}

export default ArticlesListItem;