import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import Loader from "../../components/Loader";
import PostCard from "../../components/PostCard";
import DogCard from "../../components/DogCard";
import FollowButton from "../../components/FollowButton";
import { Settings } from "react-feather";
import { Tooltip } from "react-tippy";

const Container = styled.div`
  ${tw`bg-white rounded-lg h-entire`}
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const Header = styled.div`
  ${tw`flex justify-around items-center h-32 sm:h-quarter`}
`;

const HeaderColumn = styled.div`
  ${tw`w-full flex flex-col sm:flex-row bg-white justify-center items-center`}
`;

const ProfileAvatar = styled.img`
  ${tw`w-20 h-20 sm:w-32 sm:h-32 bg-primary-light rounded-full mr-5 sm:mr-10`}
`;

const UserInfo = styled.div`
  ${tw`flex flex-col`}
`;

const UsernameRow = styled.div`
  ${tw`flex flex-row items-center`}
`;

const Username = styled.span`
  ${tw`block text-base sm:text-2xl mr-5`}
`;

const Counts = styled.ul`
  ${tw`mt-3 hidden sm:flex`}
`;

const Count = styled.li`
  ${tw`flex flex-row items-center text-base sm:text-lg`}
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Content = styled.div`
  ${tw`flex flex-col md:flex-row`}
`;

const Dogs = styled.div`
  ${tw`p-5 w-full h-auto md:w-1/2 sm:h-half overflow-y-auto bg-primary-light flex justify-center`}
`;

const TitleContainer = styled.div`
  ${tw`flex flex-row w-full h-8 items-center bg-primary hidden md:flex`}
`;

const Title = styled.h3`
  ${tw`w-1/2 text-center text-white text-sm`}
`;

const Posts = styled.div`
  ${tw`p-5 w-full h-half md:w-1/2 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-primary-light`}
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
            <UserInfo>
              <UsernameRow>
                <Username>{username}</Username>
                {isMyself ? (
                  <Tooltip
                    useContext
                    interactive
                    // open={isPopoverOpen}
                    // onRequestClose={() => setIsPopoverOpen(false)}
                    position="right"
                    trigger="click"
                    arrow="true"
                    theme="light"
                    html={
                      <ul className="bg-white flex flex-col px-8 py-3">
                        <li className="text-gray-800 cursor-pointer">
                          <div
                          // onClick={() => {
                          //   setIsPopoverOpen(false);
                          //   setTimeout(() => {
                          //     history.push({
                          //       pathname: `/${data?.viewMyself?.username}`,
                          //       state: { id: data?.viewMyself?.id },
                          //     });
                          //   }, 300);
                          // }}
                          >
                            会員情報変更
                          </div>
                        </li>
                      </ul>
                    }
                  >
                    <Settings className="text-gray-600 cursor-pointer" />
                  </Tooltip>
                ) : (
                  <div>
                    <FollowButton id={id} isFollowing={isFollowing} />
                  </div>
                )}
              </UsernameRow>
              <Counts>
                <Count>
                  <span className="text-gray-600 text-xs sm:text-sm mr-2">
                    ポスト
                  </span>
                  <span>{postsCount}</span>
                </Count>
                <Count>
                  <span className="text-gray-600 text-xs sm:text-sm mr-2">
                    フォロワー
                  </span>
                  <span>{followersCount}</span>
                </Count>
                <Count>
                  <span className="text-gray-600 text-xs sm:text-sm mr-2">
                    フォロー中
                  </span>
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