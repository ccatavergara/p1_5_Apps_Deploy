//Create starter component
import React from 'react';
import { Box } from "@mui/material";

import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";

function FriendsPage(props) {
    return (
        <Box>
            < SpinnerOfDoom color={'secondary.main'} />
        </Box>
    );
}

export default FriendsPage;