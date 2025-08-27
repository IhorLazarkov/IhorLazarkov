import "./WhatIDo.css"

import { useState, type ReactElement } from "react";

function WhatIDoPage() {

    const articles: Record<string, ReactElement> = {
        "Full Stack Developer": <div>Story about Full Stack goes here</div>,
        "Software Engineer": <div>Story about SE goes here</div>,
        "Software Engineer in Test": <div>Story about SE in Testgoes here</div>,
        "Automation Test Engineer": <div>Story about ATE goes here</div>,
        "DevOps": <div>Story about DevOps goes here</div>
    }

    const [activeArticle, setActiveArticle] = useState(Object.keys(articles)[0])

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