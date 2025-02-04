import React from "react";


const  NewsEvents = () => {
    const articles = [
        {
            img: "https://via.placeholder.com/400x250", 
            title: "Lorum Ipsum is Dumy text which you can see",
            date: "19 Aug, 2021",
            comments: "3 comments",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC."
        },
        {
            img: "https://via.placeholder.com/400x250",
            title: "Lorum Ipsum is Dumy text which you can see",
            date: "19 Aug, 2021",
            comments: "3 comments",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC."
        },
        {
            img: "https://via.placeholder.com/400x250",
            title: "Lorum Ipsum is Dumy text which you can see",
            date: "19 Aug, 2021",
            comments: "3 comments",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC."
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-4">News & Events</h2>
                <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={article.img} alt="Article" className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <div className="flex justify-between text-sm text-gray-500 mb-2">
                                    <span>🟢 {article.date}</span>
                                    <span>💬 {article.comments}</span>
                                </div>
                                <h3 className="text-lg font-semibold">{article.title}</h3>
                                <p className="text-gray-600 text-sm mt-2">{article.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default NewsEvents;