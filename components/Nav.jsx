import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="app-nav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;