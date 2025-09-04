import "./Awards.css"

function AwardsPage() {
    return (<section className="article">
        <div className="award-tile">
            <div>
                <img src="star-award.svg" alt="award icon" />
            </div>
            <span>
                <h3>Cisco Meraki Award</h3>
                <h4>Internal tallent</h4>
                <span>2022</span>
            </span>
        </div>
        <div className="award-tile">
            <div>
                <img src="star-award.svg" alt="award icon" />
            </div>
            <span>
                <h3>Cisco Meraki Award</h3>
                <h4>Internal tallent</h4>
                <span>2023</span>
            </span>
        </div>
        <div className="award-tile column-layout">
            <p><q>
                Ihor is a very sincere and dedicated SDET Engineer. His clarity
                and concepts of test automation to cover the quality of the
                product was impressive. He preached the test automation pyramid
                while we worked together at Meraki and was also instrumental in
                right execution for the product quality. Ihor is a quick and
                ambitious learner and always wanted to explore more and more of
                knowledge and skill set.</q>
            </p>
            <span>
                <h4>Sonum Matur</h4>
                <h5>Software Engineering Manager</h5>
            </span>
        </div>
    </section>);
}

export default AwardsPage;