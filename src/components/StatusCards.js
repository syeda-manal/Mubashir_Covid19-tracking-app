import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup';

const useStyles = makeStyles({
    infected: {
        borderBottom: "7px solid purple",
        width: 230,
        height: 170,
    },
    recovered: {
        borderBottom: "7px solid green",
        width: 230,
        height: 170,
    },
    deaths: {
        borderBottom: "7px solid red",
        width: 230,
        height: 170
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function StatusCards(props) {
    
    const classes = useStyles();

    let [infected, setInfected] = useState(0)
    let [recovered, setRecovered] = useState(0)
    let [deaths, setDeaths] = useState(0)
    let [formateDate, setFormateDate] = useState(null)

    useEffect(() => {  

        if(props.data !== null){ 
            
            // console.log(props.data)   

            setInfected(
                infected = props.data.confirmed.value
            )
            setRecovered(
                recovered = props.data.recovered.value
            )
            setDeaths(
                deaths = props.data.deaths.value
            )
            setFormateDate(
                formateDate = new Date(props.data.lastUpdate).toDateString()
            )
        }

    }, [props.data])

let showThisDate = null
if (formateDate == null) {
    showThisDate = "..."
}
else {
    showThisDate = formateDate
}


return (
    <div className={classes.root}>
        <Grid container spacing={3} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <Grid item s={4}>
                <Card className={classes.infected}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Infected
                            </Typography>
                        <Typography variant="h5" component="h2">
                            <CountUp
                                start={0}
                                end={infected}
                                duration={1.5}
                                separator=","
                            />
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {showThisDate}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Number of active cases of COVID-19
                            </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item s={4}>
                <Card className={classes.recovered}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Recovered
                            </Typography>
                        <Typography variant="h5" component="h2">
                            <CountUp
                                start={0}
                                end={recovered}
                                duration={1.5}
                                separator=","
                            />
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {showThisDate}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Number of active recoveries from COVID-19
                            </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item s={4}>
                <Card className={classes.deaths}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Deaths
                            </Typography>
                        <Typography variant="h5" component="h2">
                            <CountUp
                                start={0}
                                end={deaths}
                                duration={1.5}
                                separator=","
                            />
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {showThisDate}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Number of deaths caused by COVID-19
                            </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </div>
)
}

export default StatusCards
