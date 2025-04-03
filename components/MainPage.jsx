import ArticlesPage from "./ArticlesPage";
import Header from "./Header";
import Nav from "./Nav";

function MainPage() {
    return (
        <div className="main-page-container">
            <Header />
            <Nav />
            <main className="main-content">
                <ArticlesPage />
            </main>
        </div>
    )
}

export default MainPage;
