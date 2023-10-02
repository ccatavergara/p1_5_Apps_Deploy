//Search Page

import React from "react";
import {Box} from "@mui/material";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import {useQuery} from "@apollo/client";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";

export default function SearchPage(props) {
    return <SpinnerOfDoom />
}