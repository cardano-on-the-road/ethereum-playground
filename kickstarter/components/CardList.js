import React, { useEffect, useState } from "react";
import styles from './'


function CardList(props) {

    const [list, setList] = useState([]);

    const createList = async () => {
        if (Array.isArray(props.list)) {
            console.log(props.list)
            const l = props.list.map((item) => 
                <>
                    <div className={styles.card-item} key={item.cAddress}>
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-subtitle">{item.description}</h6>
                        <p className="card-text">{item.cAddress}</p>
                    </div>
                </>
            );
            setList(l);
        }
    }

    useEffect(() => {
        createList();

    },[props?.list]);

    return (
        <div className="card">
            <ul>
                {list}
            </ul>
        </div>
    );
}

export default CardList;