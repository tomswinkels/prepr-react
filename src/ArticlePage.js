// ./src/ArticlePage.js

import React from "react";
import {useQuery} from "@apollo/client";

// Import the query and the apollo client
import {GetArticleBySlug} from "./queries/get-article-by-slug";
import {useParams} from "react-router-dom";

export default function ArticlePage() {

    // Get the slug from the URL
    const {slug} = useParams();

    // Execute the query
    const {loading, error, data} = useQuery(GetArticleBySlug, {
        variables: {slug}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const article = data.Article;

    return (
        <>
            <h1>
                { article.title }
            </h1>

            {/* Loop through content types in article content */}

            {article.content.map((contentType) => {

                // Display image if it exists
                if (contentType.__typename === 'Assets' && contentType.items.length) {
                    return (
                        <div className="my-10">
                            <img
                                src={contentType.items[0]?.url}
                                width="300"
                                height="250"
                                alt={`Image for ${article.title}`}
                            />
                        </div>
                    )
                }

                // Display text as HTML

                if (contentType.__typename === 'Text') {
                    return (
                        <div dangerouslySetInnerHTML={{ __html: contentType.body }}></div>
                    )
                }
            })}
        </>
    )
}
