import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import Loader from "../../components/Loader";
import PostCard from "../../components/PostCard";
import DogCard from "../../components/DogCard";
import FollowButton from "../../components/FollowButton";
import { Settings } from "react-feather";

const Container = styled.div`
  ${tw`bg-white rounded-lg p-5`}
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const Header = styled.header`
  ${tw`flex justify-around items-center mb-20`}
`;

const HeaderColumn = styled.div`
  ${tw`w-full flex flex-col bg-white md:w-1/2 md:h-40 md:justify-center md:items-center`}
`;

const ProfileAvatar = styled.img`
  ${tw`w-32 h-32 bg-primary-light rounded-full`}
`;

const UserInfo = styled.div`
  ${tw`w-full flex flex-col`}
`;

const UsernameRow = styled.div`
  ${tw`w-full flex flex-row items-center`}
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
  margin-right: 16px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0;
`;

const Count = styled.li`
  ${tw`flex flex-row items-center`}
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Content = styled.div`
  ${tw`flex flex-row`}
`;

const Dogs = styled.div`
  ${tw`p-5 w-1/2 h-half overflow-y-auto bg-gray-200 flex justify-center`}
`;

const TitleContainer = styled.div`
  ${tw`flex flex-row h-8`}
`;

const Title = styled.h3`
  ${tw`w-1/2 text-center`}
`;

const Posts = styled.div`
  ${tw`p-5 w-1/2 h-half overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200`}
  grid-template-rows: 120px;
  grid-auto-rows: 120px;
`;

const ProfilePresenter = ({ loading, data }) => {
  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  } else {
    console.log(data);
    const {
      viewUser: {
        id,
        email,
        avatar,
        username,
        isFollowing,
        isMyself,
        followingCount,
        followersCount,
        postsCount,
        posts,
        dogs,
      },
    } = data;
    return (
      <Container>
        <Helmet>
          <title>{username} | ココ</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <ProfileAvatar src={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UserInfo>
              <UsernameRow>
                <Username>{username}</Username>
                {isMyself ? (
                  <div>
                    <Settings className="text-gray-800 cursor-pointer" />
                  </div>
                ) : (
                  <div>
                    <FollowButton id={id} isFollowing={isFollowing} />
                  </div>
                )}
              </UsernameRow>
              <Counts>
                <Count>
                  <span className="text-xs mr-2">ポスト</span>
                  <span>{postsCount}</span>
                </Count>
                <Count>
                  <span className="text-xs mr-2">フォロワー</span>
                  <span>{followersCount}</span>
                </Count>
                <Count>
                  <span className="text-xs mr-2">フォロー中</span>
                  <span>{followingCount}</span>
                </Count>
              </Counts>
            </UserInfo>
          </HeaderColumn>
        </Header>
        <TitleContainer>
          <Title>マイドッグ</Title>
          <Title>マイポスト</Title>
        </TitleContainer>
        <Content>
          <Dogs>
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                id={dog.id}
                name={dog.name}
                image={dog.image}
                gender={dog.gender}
                breed={dog.breed}
                birthdate={dog.birthdate}
              />
            ))}
          </Dogs>
          <Posts>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                user={post.user}
                location={post.location}
                caption={post.caption}
                files={post.files}
                isLiked={post.isLiked}
                likeCount={post.likeCount}
                comments={post.comments}
                commentCount={post.commentCount}
                createdAt={post.createdAt}
                file={post.files[0]}
              />
            ))}
          </Posts>
        </Content>
      </Container>
    );
  }
};

export default ProfilePresenter;
