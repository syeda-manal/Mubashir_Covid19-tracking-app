import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));


function Graphs(props) {

    const classes = useStyles();

    let [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Infected',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(128, 0, 128,0.4)',
                borderColor: 'rgba(128, 0, 128,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(128, 0, 128,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(128, 0, 128,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            },
            {
                label: 'Recovered',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,128,0,0.4)',
                borderColor: 'rgba(0,128,0,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(0,128,0,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(0,128,0,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            },
            {
                label: 'Deaths',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255, 0, 0,0.4)',
                borderColor: 'rgba(255, 0, 0,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255, 0, 0,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255, 0, 0,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }
        ]
    })

    let [country, setCountry] = useState()
    let [timer, setTimer] = useState(0)
    let [useThisAPI, setThisAPI] = useState()
    let [graphData, setGraphData] = useState([])
    let [fetchResponse, setFetchResponse] = useState()
    let initialState = {
        confirmed: "",
        recovered: "",
        deaths: "",
        date: ""
    }
    let [globalGraph, setGlobalGraph] = useState(initialState)
    let [countryGraph, setCountryGraph] = useState(initialState)
    let [makeGraph, setMakeGraph] = useState(false)

    setInterval(() => {
        setTimer(timer = timer + 1)
    }, 60000)

    useEffect(() => {

        if (!props.countryName || props.countryName === "global") {
            setCountry(country = "global")
            setThisAPI(useThisAPI = `https://covid19.mathdro.id/api/daily`)
        }
        else {
            setCountry(country = props.countryName)
            setThisAPI(useThisAPI = `https://api.covid19api.com/total/country/${country}`)
        }

        const getGraphData = async () => {

            setFetchResponse(fetchResponse = await fetch(useThisAPI))
            setGraphData(graphData = await fetchResponse.json())

            if (country === 'global') {
                setGlobalGraph(
                    globalGraph.confirmed = graphData.map(obj => obj.confirmed.total),
                    globalGraph.recovered = graphData.map(obj => obj.recovered.total),
                    globalGraph.deaths = graphData.map(obj => obj.deaths.total),
                    globalGraph.date = graphData.map(obj => obj.reportDate)
                )
                console.log(data.datasets[0].data)
                setData(
                    data.labels = globalGraph.date.map(val => val),
                    data.datasets[0].data = globalGraph.confirmed.map(val => val),
                    data.datasets[1].data = globalGraph.recovered.map(val => val),
                    data.datasets[2].data = globalGraph.deaths.map(val => val)
                )
            }
            if (country !== 'global') {
                setCountryGraph(
                    countryGraph.confirmed = graphData.map(obj => obj.Confirmed),
                    countryGraph.recovered = graphData.map(obj => obj.Recovered),
                    countryGraph.deaths = graphData.map(obj => obj.Deaths),
                    countryGraph.date = graphData.map(obj => new Date(obj.Date).toDateString())
                )
                
                // setData(
                //     data.labels = countryGraph.date.map(val => val),
                //     data.datasets[0].data = countryGraph.confirmed.map(val => val),
                //     data.datasets[1].data = countryGraph.recovered.map(val => val),
                //     data.datasets[2].data = countryGraph.deaths.map(val => val)
                // )
            }
            setMakeGraph(makeGraph = true)

            // console.log(country, useThisAPI, graphData, globalGraph, countryGraph, data)

            //reset the state
            setGraphData(graphData = [])
            setGlobalGraph(globalGraph = {})
            setCountryGraph(countryGraph = {})
            data.labels = []
            data.datasets[0].data = []
            data.datasets[1].data = []
            data.datasets[2].data = []
        }
        getGraphData()
    }, [props.countryName, timer])

    return (
        <div>
            {/* {makeGraph ?
                (<Line data={Data}
                    width={500}
                    height={300}
                    options={{ maintainAspectRatio: true }}
                />) : (
                    <div className={classes.root}>
                        <CircularProgress />
                    </div>)} */}
        </div>
    )
}

export default Graphs
