import React from "react";
import './TripCard.css';
import { Link } from "react-router-dom";
import {Button, Chip, Container} from "@mui/material";
import placeholder from "./placeholder.png";
import TripPage from "../../TripPage";

function TripCard({trip}) {
    const myImageStyle = { width: '75%',objectFit: 'contain' };
    let chipColor;
    let chipText;
    let today = new Date();
    let start = new Date(trip.startDate);
    let end = new Date(trip.endDate);

    if (end > today && end < today) {
        chipColor = "info";
        chipText = "Ongoing";
    }
    else if (end > today) {
        chipColor = "warning";
        chipText = "Upcoming";
    }
    else {
        chipColor = "error";
        chipText = "Ended";
    }

  return (

    <Container sx = {{ pt:2}} >
                <div className="trip-card" >

                    <div className="trip-card__image">
                        <img style={myImageStyle} src={placeholder}  alt={'placeholder'}/>
                    </div>
                    <div className="trip-card__content">
                        <h3 className="TitleStyle">{trip?.name}</h3>
                        <p className="SubtitleStyle">
                            {trip?.description}
                        </p>

                        <Chip className={"Chip"}     label={chipText} color={chipColor} right={0} />

                    </div>
                </div>
    </Container>
  );
}
export default TripCard;
