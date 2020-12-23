import React, { Fragment } from "react";
import './Pagination.css';

const Pagination = (props) => {
    let pageArr = [];
    for(let i=1;i<=Math.ceil(props.dataSize/10);i++) {
        pageArr.push(i);
    }

    const handleClick = (index) => {
        for(let i=1;i<=Math.ceil(props.dataSize/10);i++) {
            if(i !== index) {
                const elementRef = document.getElementById("page-no-"+i);
                elementRef.style.borderBottom = "1px solid black";
            }
        }
        props.getIndex(index);
    }

    return (
        <Fragment>
            <div className="pagination">
                {
                    pageArr.map(index => {
                        return (
                            <span id={"page-no-"+index} className="page-no" onClick={() => handleClick(index)} key={index}>
                                {index}
                            </span>
                        );
                    })
                }
            </div>
        </Fragment>
    );
}

export default Pagination;