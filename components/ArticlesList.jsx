import ArticlesListItem from "./ArticlesListItem";

function ArticlesList({ articles }) {
    if (!articles || articles.length === 0) {
        return <p>No articles available at the moment.</p>
    }

    return (
        <ul className="articles-list">
            {articles.map((article) => {
                return (
                    <ArticlesListItem
                        key={article.article_id}
                        article={article}
                    />
                )
            })}
        </ul>
    )
}

export default ArticlesList;