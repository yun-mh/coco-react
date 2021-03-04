import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../components/Post";
import Loader from "../../components/Loader";

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const Container = styled(InfiniteScroll)`
  ${tw`grid grid-cols-1 gap-4 lg:grid lg:grid-cols-2 lg:gap-8 relative`}
`;

const FeedPresenter = ({
  loading,
  data,
  myId,
  currentPosts,
  onEndReached,
  canFetchMore,
}) => {
  return (
    <>
      <LoaderContainer>{loading && <Loader />}</LoaderContainer>
      <Helmet>
        <title>ホーム ｜ ココ</title>
      </Helmet>
      {!loading && data && data.viewFeed && (
        <Container
          dataLength={data.viewFeed.length}
          next={onEndReached}
          hasMore={canFetchMore}
          loader={
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          }
        >
          {data.viewFeed.map((post) => (
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
              currentPosts={currentPosts}
              myId={myId}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export default FeedPresenter;
