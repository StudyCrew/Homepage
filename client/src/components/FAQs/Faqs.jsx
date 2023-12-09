import React from "react";
import "./Faqs.css";
import faqsData from "../../data/faqsData";

function Faqs() {
    return(
        <div className="faqs">
            <div className="blue-neon-mist faq-mist-1"></div>
            <h2 className="faqs-heading"><span>FAQ</span>s</h2>
            <p className="faqs-des">We are here to help you with any question you have</p>
            <div className="questions-list">
                {faqsData.map((faq, index) => (
                    <details className="question" key={index}>
                        <summary className="question-head">{faq.question}</summary>
                        <div className="question-des">{faq.answer}</div>
                    </details>
                ))}
            </div>
        </div>
    );
}

export default Faqs;
