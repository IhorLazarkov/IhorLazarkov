import "./WhatIDo.css"

import { articles } from "./articles";

function WhatIDoPage() {

    return (
        <section className="article">
            <div className="what-i-do-container">
                <div className="left-side">
                    <ul>
                        {Object.entries(articles).map(([k, v], index) => {
                            const { ref } = v;
                            console.log({ k, ref, index });
                            return <li key={k}><a href={`#${ref}`}>{k}</a></li>
                        })}
                    </ul>
                </div>
                <div className="right-side">
                    {Object.values(articles).map(({ element }, index) => {
                        return <div key={index}>{element}</div>
                    })}
                </div>
            </div>
        </section>);
}

export default WhatIDoPage;