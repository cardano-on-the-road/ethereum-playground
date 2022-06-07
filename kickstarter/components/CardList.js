import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function CardList(props) {

    const [list, setList] = useState([]);

    const createList = async () => {
        if (Array.isArray(props.list)) {
            console.log(props.list)
            const l = props.list.map((item) =>
                <>
                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined">
                            <React.Fragment>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">{item.cAddress}</Button>
                                </CardActions>
                            </React.Fragment>
                        </Card>
                    </Box>
                </>
            );
            setList(l);
        }
    }

    useEffect(() => {
        createList();

    }, [props?.list]);

    return (
        <div className="card">
            <ul>
                {list}
            </ul>
        </div>
    );
}

export default CardList;