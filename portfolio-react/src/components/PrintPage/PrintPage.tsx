import "./PrintPage.css"
import { articles } from "../WhatIdoPage/articles";
import React, { useState, type ReactElement } from "react";
import ExperiancePage from "../ExperiencePage/ExperiancePage";
import EducationPage from "../EducationPage/EducationPage";

function PrintPage() {
    return (<div id="print-form"
        style={{ display: "none" }}>
        <header style={{ fontSize: "0.8em" }}>
            <h3>IHOR LAZARKOV</h3>
            <div>
                <span>Location: Hendersonville, TN, USA</span> |
                <span> email: ilazarkov@gmail.com</span> |
                <span> ph: (615) 506 - 9411</span>
            </div>
            <div>
                <span>in: https://www.linkedin.com/in/ihorlazarkov</span> |
                <span> web site: https://ihorlazarkov.github.io/IhorLazarkov</span> |
                <span> github: https://github.com/ihorLazarkov</span>
            </div>
        </header>
        <main>
            {PrintForm()}
        </main>
        <footer></footer>
    </div>);
}

function PrintForm() {
    const getSummaryContent = () => {
        const summary = ["About Me", "Skills"]
            .map(s => {
                const article = articles[s].element as ReactElement<React.ReactNode> | any;
                return article.props.children
                    .filter((e: ReactElement<React.ReactNode> | any) => !!e.props.className)
                    .filter((e: ReactElement<React.ReactNode> | any) => e.props.className === "for-print-form");
            })
        // console.log({ summary });
        return [...summary]
    }
    const [content] = useState<ReactElement[]>(getSummaryContent())

    return (<>
        {content}
        <h3><u>Professional Experience</u></h3>
        <ExperiancePage />
        <h3><u>Education</u></h3>
        <EducationPage />
    </>)
}

export default PrintPage;