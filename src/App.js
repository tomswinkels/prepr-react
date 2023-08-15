// ./src/App.js

import React from "react";
import {GetArticles} from "./queries/get-articles";
import {useQuery} from "@apollo/client";

// Import Link to enable links in the HTML
import {Link} from "react-router-dom";

function App() {
    const {loading, error, data} = useQuery(GetArticles);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const articles = data.Articles.items;

    return (
        <div>
            <h1>My blog site</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article._id}>

                        {/* Add links to the article title */}
                        <Link to={article._slug}>{article.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
