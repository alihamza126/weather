import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { AcUnitOutlined, Cloud, WbSunny } from '@mui/icons-material';

const Weather = () => {
    const api_key = "1279d656051445a68c6c742598131c36";
    const winter='https://hips.hearstapps.com/hmg-prod/images/cold-quotes-1575930075.jpg?crop=1.00xw:0.750xh;0,0.250xh&resize=1200:*';
    const summer='https://www.wfxrtv.com/wp-content/uploads/sites/20/2022/05/GettyImages-491701259.jpg?w=876&h=493&crop=1';
    const haze='https://cdn.pixabay.com/photo/2016/11/22/19/10/clouds-1850093_960_720.jpg'
    const [city, setCity] = useState('bahawalpur');
    const [data, setData] = useState();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    const getWeather = async () => {
        console.log(city)
        axios.get(url).then((e) => {
            setData(e.data)
            console.log(e.data)
        })
    }
    useEffect((e)=>{
        getWeather();
    },[])
    return (
        <div>
            <form action="">
                <TextField id="outlined-basic" value={city} onChange={(e) => setCity(e.target.value)} label="Search City" variant="outlined" />
                <br />
                <br />
                <Button variant="contained" color="success" onClick={getWeather}>
                    Success
                </Button>
                <br />
                <br />
                <Card sx={{ width: 445 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={data?.main.humidity<30?winter:(data?.main.humidity<50?haze:summer)}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <p>Tempreture : {data?.main.temp} &deg;C {data?.main.humidity<20?<AcUnitOutlined/>:(data?.main.humidity>0?<Cloud/>:<WbSunny/>)}</p>
                            <p>Humidity-Level: {data?.main.humidity}</p>
                            <p>Air Pressure : {data?.main.pressure} pascal</p>
                        </Typography>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default Weather