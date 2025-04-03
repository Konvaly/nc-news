import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleArticleDetails from "./SingleArticleDetails";

const API_BASE_URL = 'https://nc-news-app-wyry.onrender.com/api';

function SingleArticlePage() {
    const { article_id } = useParams();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setArticle(null);

        const articleApiUrl = `${API_BASE_URL}/articles/${article_id}`;

        axios.get(articleApiUrl)
            .then(response => {
                setLoading(false);

                if (response.data && response.data.article) {
                    setArticle(response.data.article)
                } else {
                    setError("Article data not found in expected format.");
                    setArticle(null);
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
                    errorMsg = "Failed to fetch article.";
                }

                setError(errorMsg);
                setArticle(null);
                setLoading(false);
            })


    }, [article_id])

    let content = '';
    if (loading) {
        content = <p>Loading article (ID: {article_id})...</p>
    } else if (error) {
        content = <p className="error-message">Error: {error}</p>
    } else if (article) {
        content = <SingleArticleDetails article={article} />
    }
    else {
        content = <p>Article data could not be loaded or was not in the expected format.</p>;
    }

    return (
        <div className="single-article-page-container">
            <main className="main-content">
                {content}
            </main>
        </div>
    )
}

export default SingleArticlePage;