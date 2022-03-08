import React, {useEffect, useState} from "react";
import {getWebsiteRank} from "./rankService";
import "./Gigasheet.css";

const Gigasheet = () => {
    const [textAreaValue, settTextAreaValue]=useState("");
    const [answer, setAnswer] = useState([]);

    const getRanks = () => {
        setAnswer([]);
        let ranksOfDomains = [];
        let array = textAreaValue.split("\n");
        for(const domain of array) {
            getWebsiteRank(domain).then((ans) => {

                if(ans["domain"] != undefined) {
                    const domainAndRank = {"name": ans["domain"], "rank": ans["rank"]}
                    ranksOfDomains.push(domainAndRank);
                    setAnswer(answer => [...answer, domainAndRank]);
                } else {
                    const domainAndRank = {"name": domain, "rank": "-1"}
                    ranksOfDomains.push(domainAndRank);
                    setAnswer(answer => [...answer, domainAndRank]);
                }
            }).catch((error) => {
                // console.log("error");
            });
        }
    }

    useEffect(() => {
        console.log("answer", answer);
    },[answer])

    return(
        <div>
            <h1>WEBSITE RANK FILTERING</h1>
            <div className="form-group">
                <label className="form-label mt-4">Up to 10 input domain names one per line</label>
                <textarea
                    className="form-control"
                    id="exampleTextarea"
                    rows="10"
                    spellCheck="false"
                    value={textAreaValue}
                    onChange={(e) => settTextAreaValue(e.target.value)}></textarea>
            </div>
            <div className="pt-2"></div>
            <button type="submit" className="btn btn-primary" onClick={getRanks}>Filter to top rank</button>
            <br></br><br></br>

            <h3>Answer: </h3>
                <div>
                    {answer.map(({ name, rank }) => (
                        <div>
                            <span key={rank}><span className={rank < 100 && rank > 0 ? "highlight": rank < 0 ? "wavy" : null}>{name}</span></span>
                        </div>
                    ))}
                </div>
        </div>
    )
};

export default Gigasheet;