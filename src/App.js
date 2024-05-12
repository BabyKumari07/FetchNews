import React, { useEffect, useState } from "react";

function FetchNews() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Return parsed JSON data
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [apiKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <nav className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex space-x-4">
              <a href="/" className="text-white hover:text-gray-300 text-2xl">TOP HEADLINES - NEWS FEED</a>
            </div>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <div className="container mx-auto">
        {data && (
          <div className="flex justify-between">
            {data.articles
              .filter(article => article.urlToImage) // Filter out articles without an image
              .slice(0, 5)
              .map((article, index) => (
                <div key={index} className="card bg-blue-100 p-4" style={{ width: "18rem" }}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <p className="card-text text-left font-bold text-red-500">{article.source.name}: <span className="font-bold text-black">{new Date(article.publishedAt).toLocaleDateString()}</span></p>
                    <img className="card-img-top" src={article.urlToImage} alt={article.title} />
                    <div className="card-body">
                      <strong className="card-title">{article.title}</strong>
                      <p className="card-text">{article.description}</p>
                      
                    </div>
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchNews;
