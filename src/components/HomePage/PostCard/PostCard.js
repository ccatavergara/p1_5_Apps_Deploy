import React from "react";
import './PostCard.css';
import { Link } from "react-router-dom";
import {Button, Chip, Container} from "@mui/material";
import placeholder from "./placeholder.png";
import PostPage from "../../PostPage/PostPage";

function PostCard({post}) {
    const myImageStyle = { width: '75%',objectFit: 'contain' };
    let chipColor;
    let chipText;

  return (

    <Container sx = {{ pt:2}} >
                <div className="post-card" >

                    <div className="post-card__image">
                        <img style={myImageStyle} src={placeholder}  alt={'placeholder'}/>
                    </div>
                    <div className="post-card__content">
                        <h3 className="TitleStyle">{post?.title}</h3>
                        <p className="SubtitleStyle">
                            {post?.body}
                        </p>

                        <Chip className={"Chip"}     label={chipText} color={chipColor} right={0} />

                    </div>
                </div>
    </Container>
  );
}
export default PostCard;
