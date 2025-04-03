import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const API_URL = 'https://nc-news-app-wyry.onrender.com/api/articles';

function ArticlesPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setError(null);
        setLoading(true);

        axios.get(API_URL)
            .then(response => {
                if (response.data && Array.isArray(response.data.articles)) {
                    setArticles(response.data.articles)
                } else {
                    setError("Unexpected data format from server.");
                    setArticles([]);
                }
                setLoading(false);
            })
            .catch(error => {
                const errorMsg = error.message || 'Failed to fetch articles. Please try again.';
                setError(errorMsg)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>Loading articles...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h2>Articles</h2>
            <pre>{JSON.stringify(articles, null, 2)}</pre>
        </div>
    )
}

export default ArticlesPage;