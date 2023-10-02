// MapPage

import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Box, Container, CssBaseline, Paper, Stack, styled} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import MapModule  from './MapModule';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

function MapPage(props) {
    return (
        <div className="App">
            <MapModule />
        </div>
    );
}

export default MapPage;