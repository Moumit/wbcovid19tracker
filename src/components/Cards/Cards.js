import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Counting from 'react-countup';

import './Cards.css';
import Delta from '../Delta/Delta';

const Cards = ({ data, value, index }) => {
    if (value !== index) return null;

    const { confirmed, active, recovered, deaths, lastUpdate, deltaconfirmed, deltadeaths, deltarecovered }
        = (data && index === 1 && data.totData) ? data.totData[0] : data;

    if (!confirmed) {
        return (<Typography variant="button" display="block" align='center'>
            Loading data...
        </Typography>);
    }

    const lastUpdated = index === 1 ? (<Typography variant="caption" display="block" align='center'>
        Last Updated at {new Date(lastUpdate).toLocaleString()}
    </Typography>) : null;
    return (
        <div className="card-container">
            {lastUpdated}
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={2} md={2} className="card-card card-infected">
                    <CardContent align='center' className="card-content">
                        <Typography color="textSecondary" gutterBottom className="card-heading">Confirmed</Typography>
                        <Typography variant="h5" className="card-curdata">
                            <Counting start={0} end={confirmed.value} duration={2.5} separator="," />
                        </Typography>
                        {deltaconfirmed > 0 ? <Delta inpCnt={deltaconfirmed} color='red' size='med' /> : null}
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={2} md={2} className="card-card card-active">
                    <CardContent align='center' className="card-content">
                        <Typography color="textSecondary" gutterBottom className="card-heading">Active</Typography>
                        <Typography variant="h5" className="card-curdata">
                            <Counting start={0} end={active.value} duration={2.5} separator="," />
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={2} md={2} className="card-card card-recovered">
                    <CardContent align='center'>
                        <Typography color="textSecondary" gutterBottom className="card-heading">Recovered</Typography>
                        <Typography variant="h5" className="card-curdata">
                            <Counting start={0} end={recovered.value} duration={2.5} separator="," />
                        </Typography>
                        {deltarecovered > 0 ? <Delta inpCnt={deltarecovered} color='green' size='med' /> : null}
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={2} md={2} className="card-card card-deaths">
                    <CardContent align='center'>
                        <Typography color="textSecondary" gutterBottom className="card-heading">Deaths</Typography>
                        <Typography variant="h5" className="card-curdata">
                            <Counting start={0} end={deaths.value} duration={2.5} separator="," />
                        </Typography>
                        {deltadeaths > 0 ? <Delta inpCnt={deltadeaths} color='grey' size='med' /> : null}
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;