import React from "react";
import './BottomBar.css';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from "react-router-dom";

function BottomBar(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);

    };
    const navigate = useNavigate();

    return (
        <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }} value={value} onChange={handleChange}
        >
            <BottomNavigationAction
                label="Home"
                value="home"
                onClick={() => navigate('/')}
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                label="Trips"
                value="trips"
                onClick={() => navigate('/trips')}
                icon={<ConnectingAirportsIcon />}
            />
            <BottomNavigationAction
                label="Map"
                value="map"
                onClick={() => navigate('/map')}
                icon={<LocationOnIcon />}
            />
            <BottomNavigationAction
                label="Search"
                value="search"
                onClick={() => navigate('/search')}
                icon={<TravelExploreIcon />} />

            <BottomNavigationAction
                label="Friends"
                value="friends"
                onClick={() => navigate('/friends')}
                icon={<GroupsIcon />} />
        </BottomNavigation>
    );
}

export default BottomBar;
