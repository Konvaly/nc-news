function ArticlesList({ articles }) {
    console.log("STEP 2 (List): Destructured articles ->", articles);


    return (
        <div className="articles-list">
            <p>Articles List</p>
            <ul>
                {articles.map((article) => {
                    console.log("STEP 4 (List): Mapping article ->", article);
                    return (
                        <li key={article.article_id}>
                            Article ID: {article.article_id} - {article.title}

                        </li>
                    )
                })}

            </ul>
        </div>
    )
}

export default ArticlesList;