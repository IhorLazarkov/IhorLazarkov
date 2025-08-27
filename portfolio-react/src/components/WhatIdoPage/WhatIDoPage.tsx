import "./WhatIDo.css"

import { useState } from "react";
import { articles } from "./articles";

function WhatIDoPage() {

    const [activeArticle, setActiveArticle] = useState(Object.keys(articles)[2])

    return (
        <section className="article">
            <div className="what-i-do-container">
                <div className="left-side">
                    <ul>
                        {Object.keys(articles).map((title) => {
                            const isActive = title === activeArticle
                            return <li
                                key={title}
                                className={isActive ? 'active' : ''}
                                onClick={() => setActiveArticle(title)}
                            >{title}</li>
                        })}
                    </ul>
                </div>
                <div className="right-side">
                    {articles[activeArticle]}
                </div>
            </div>
        </section>);
}

export default WhatIDoPage;