import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TripCard from "./TripCard/TripCard";
import './TripsPage.css';
import { Fab, Paper, Stack, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from "@mui/material/CircularProgress";
import { generatePath, useNavigate } from "react-router-dom";
import { useScrollDirection } from 'react-use-scroll-direction';
import {useAuthUser} from 'react-auth-kit';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,

}));


function TripsPage(props) {
    const auth = useAuthUser();
    let email = auth().email;
    const GET_DATA = gql`
    query {
    user(email: "${email}") {
        firstName
        email
        trips {
        id
        name
        description
        startDate
        endDate
        }
        }
    }

    `;
    const { loading, error, data } = useQuery(GET_DATA);
    const [extended, setExtended] = useState(true);
    const [newtrip, setNewTrip] = useState(true);

    const { isScrollingUp, isScrollingDown } = useScrollDirection()

    let ext = extended ? "extended" : "circular";
    let nt = newtrip ? 'New Trip' : "";



    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingUp) {
                setExtended(true);
                setNewTrip(true);
            }
            if (isScrollingDown) {
                setExtended(false);
                setNewTrip(false);

            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrollingUp, isScrollingDown])

    const navigate = useNavigate();

    if (loading) return <CircularProgress />;
    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <>
            <div className={"GroupStack"} >
                <Fab color="primary" aria-label="add" className={"NewTripFab"} id={"NewTrip"} variant={ext}>
                    <AddIcon /> <div id={"NewTripText"} >{nt}</div>
                </Fab>

                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    overflow={"scroll"}
                    sx={{ mx: 2, mt: '90px' }}
                >

                    <React.Fragment>

                        {data?.user?.trips?.map((trip) => (

                            <Item key={trip.id} trip={trip} >
                                <div
                                onClick={() => {
                                    navigate(`/trip/${trip.id}`)
                                }}
                                >
                                <TripCard trip={trip} />
                                </div>
                            </Item>

                        ))}

                    </React.Fragment>
                </Stack>
            </div>

        </>
    );
}


export default TripsPage;
