import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import Post from "../../components/Post";

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const Container = styled.div`
  ${tw`grid grid-cols-1 gap-8 lg:grid lg:grid-cols-2 lg:gap-8`}
`;

const FeedPresenter = ({ loading, data }) => {
  console.log(data);
  return (
    <>
      <LoaderContainer>
        {loading && <div className="bg-red-600">loading</div>}
      </LoaderContainer>
      <Container>
        <Helmet>
          <title>ホーム ｜ ココ</title>
        </Helmet>
        {!loading &&
          data &&
          data.viewFeed &&
          data.viewFeed.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              location={post.location}
              caption={post.caption}
              user={post.user}
              files={post.files}
              commentCount={post.commentCount}
              likeCount={post.likeCount}
              isLiked={post.isLiked}
              comments={post.comments}
              createdAt={post.createdAt}
            />
          ))}
      </Container>
    </>
  );
};

export default FeedPresenter;
