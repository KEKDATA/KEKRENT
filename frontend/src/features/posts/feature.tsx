import React from "react";
import { useStore } from "effector-react";

import { $posts } from "../../models/posts/model";
import { Submit } from "./components/submit/component";
import { NumberOfPosts } from "./components/number_of_posts/component";
import { Dates } from "./components/dates/component";
import { Col, Row } from "antd";
import { Price } from "./components/price/component";

export const Posts = () => {
  const posts = useStore($posts);

  return (
    <>
      <Row justify="center">
        <Col>
          <NumberOfPosts />
          <Dates />
          <Price />
        </Col>
        <Col span={24}>
          <Submit />
        </Col>
      </Row>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h1>{post.title}</h1>
            <span>{post.publishDate}</span>
            <a
              href={`https://www.google.ru/maps/place/${post.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.address}
            </a>
            <p>{post.price}</p>
            <p>{post.description}</p>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              OPEN
            </a>
            <ul>
              {post.photos.map((photo) => (
                <li key={photo}>
                  <img loading="lazy" src={photo} alt="some photo" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};
