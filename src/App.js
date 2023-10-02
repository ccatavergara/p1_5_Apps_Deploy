import './App.css';
import { RequireAuth } from 'react-auth-kit';
import {
    HashRouter,
    Route,
    Routes,
} from "react-router-dom";
import React from "react";
import TripsPage from "./components/TripsPage";
import TripPage from "./components/TripPage/TripPage";
import BottomBar from "./components/BottomBar/BottomBar";
import TopNav from "./components/TopNav/TopNav";
import HomePage from "./components/HomePage/HomePage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import MapPage from "./components/MapPage/MapPage";
import SearchPage from "./components/SearchPage/SearchPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import PostPage from './components/PostPage/PostPage';

function App() {
    return (
        <div className="App">
            <HashRouter>

                <Routes>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/*" element={
                        <RequireAuth loginPath="/login">
                            <div className="App__content">
                                <TopNav />
                                <Routes>
                                    <Route path="/" element={<HomePage />}/>
                                    <Route path="/post/:id" element={<PostPage />} />
                                    <Route path="/friends" element={<FriendsPage />} />
                                    <Route path="/trips" element={<TripsPage />} />
                                    <Route path="/trip/:id" element={<TripPage />} />
                                    <Route path="/map" element={<MapPage />} />
                                    <Route path="/search" element={<SearchPage />} />
                                    <Route path="/profile" element={<ProfilePage />} />
                                </Routes>
                            </div>
                            <BottomBar />
                        </RequireAuth>
                        }
                    />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
