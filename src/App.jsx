import Header from '../components/Header';
import MainPage from '../components/MainPage';
import Nav from '../components/Nav';
import SingleArticlePage from '../components/SingleArticlePage';
import './App.css';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="articles/:article_id" element={<SingleArticlePage />} />
      </Routes>
    </div>
  )
}

export default App
