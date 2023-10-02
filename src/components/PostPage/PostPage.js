import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PostCard from "../HomePage/PostCard/PostCard";
import './PostPage.css';
import { Fab, Paper, Stack, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from "@mui/material/CircularProgress";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useScrollDirection } from 'react-use-scroll-direction';
import {useAuthUser} from 'react-auth-kit';
import Button from "@mui/material/Button";
import ImageUploadComponent from './ImageUploadComponent';
import ImageGalleryComponent from './ImageGalleryComponent';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,

}));


function PostPage(props) {
    const {id} = useParams();
    const auth = useAuthUser();
    let email = auth().email;

    const GET_DATA = gql`
    query {
    user(email: "${email}") {
        firstName
        email
        posts {
        id
        title
        body
        }
        }
    }

    `;
    const { loading, error, data } = useQuery(GET_DATA);
    const [extended, setExtended] = useState(true);
    const [newtrip, setNewTrip] = useState(true);

    const { isScrollingUp, isScrollingDown } = useScrollDirection()

    let ext = extended ? "extended" : "circular";
    // let nt = newpost ? 'New Post' : "";

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

    const saveImagesToLocalStorage = async (images, postId) => {
        const existingImagesKey = `uploadedImages${postId}`;
        const existingImages = JSON.parse(localStorage.getItem(existingImagesKey)) || [];

        const imagePromises = images.map(async (file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        });

        const dataUrls = await Promise.all(imagePromises);
        const updatedImages = [...existingImages, ...dataUrls];
        localStorage.setItem(existingImagesKey, JSON.stringify(updatedImages));
    };

    const clearImagesFromLocalStorage = (postId) => {
        const imagesKey = `uploadedImages${postId}`;
        localStorage.removeItem(imagesKey);
      };

    return (
        <div>
            <div className={"GroupStack"} >

                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    overflow={"scroll"}
                    sx={{ mx: 2, mt: '90px' }}
                >

                    <React.Fragment>
                    {data?.user?.posts
                        ?.filter((post) => post.id === id)
                        .map((post) => (
                        <Item key={post.id} post={post}>
                            <PostCard post={post} />
                        </Item>
                        ))}
                    </React.Fragment>
                </Stack>
                <ImageUploadComponent onUpload={(images) => saveImagesToLocalStorage(images, id)} postId={id}/>
                <ImageGalleryComponent postId={id} />
                <Button
                variant="contained"
                sx={{ ml: 2, mt: 1, mb: 2, alignSelf: 'flex-start' }}
                onClick={() => {
                    clearImagesFromLocalStorage(id);
                }}
                >
                Delete Images
                </Button>
                <Button
                variant="contained"
                sx={{ ml: 2, mt: 1, mb: 2, alignSelf: 'flex-start' }}
                onClick={() => {
                    navigate(`/`);
                }}
                >
                return
                </Button>

            </div>

        </div>
    );
}

export default PostPage;

