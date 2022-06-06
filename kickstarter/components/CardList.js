import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'

function CardList(props) {

    const [list, setList] = useState([]);

    useEffect(() => {
        if (Array.isArray(props.list)) {
            setList(props.list.map((item) => {
                <li>
                    <p>item.name</p>
                    <p>item.description</p>
                    <p>item.cAddress</p>
                </li>
            }));
        }
    }, [props?.list]);

    return (
        <div>
            <ul>
                {list}
            </ul>
        </div>
    );
}

export default CardList;