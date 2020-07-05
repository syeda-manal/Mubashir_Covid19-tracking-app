import React, { useState, useEffect } from 'react'
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Nav from './Nav'
import StatusCards from './StatusCards'
import SelectCountry from './SelectCountry';
import Graphs from './Graphs';
import logo from '../logo.png'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function Main() {
    const mainClass = useStyles();
    let [globalData, setGlobalData] = useState(null)
    let fetchResponse = null
    let [timer, setTimer] = useState(0)
    let [country, getCountry] = useState();
    let api = `https://covid19.mathdro.id/api`

    setInterval(() => {
        setTimer(timer = timer + 1)
    }, 60000)

    if (!country || country === "global") {
        api = `https://covid19.mathdro.id/api`
    }
    else {
        api = `https://covid19.mathdro.id/api/countries/${country}`
    }

    useEffect(() => {

        const getGlobalData = async () => {
            try {
                fetchResponse = await fetch(api)
                setGlobalData(
                    globalData = await fetchResponse.json()
                )
                // console.log(globalData)
            }
            catch (error) {
                // console.log(error)
            }
        }
        getGlobalData()
    }, [timer, country])

    return (
        <div className={mainClass.root}>
            <Grid container spacing={3} className={mainClass.rootGrid}>
                {/* <Grid item xs={12}>
                    <Nav />
                </Grid> */}
                <img src={logo} alt="covid-19 logo" style={{
                    width: 446,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    minWidth: '30%',
                    marginTop: 30,
                    marginBottom: 30

                }}/>
                <Grid item xs={12} className={mainClass.selectStatus}>
                    <StatusCards data={globalData} />
                </Grid>
                <Grid item xs={12} className={mainClass.selectCountry}>
                    <SelectCountry onChange={(value) => getCountry(country = value)} />
                </Grid>
                <Grid item xs={12} className={mainClass.selectGraph}>
                    <Graphs countryName={country} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Main
