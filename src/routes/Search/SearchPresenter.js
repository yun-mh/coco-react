import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import UserCard from "../../components/UserCard";
import PostCard from "../../components/PostCard";
import Loader from "../../components/Loader";
import { Frown } from "react-feather";

const Wrapper = styled.div`
  ${tw`bg-white rounded-lg shadow overflow-hidden`}
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const ActionTabContainer = styled.div`
  ${tw`flex flex-row h-12`}
`;

const ActionTab = styled.div`
  ${tw`flex flex-1 justify-center items-center cursor-pointer`}
`;

const UserSection = styled.div`
  ${tw`p-5 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8`}
`;

const PostSection = styled.div`
  ${tw`p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({ currentUser, searchTerm, loading, data, tab, setTab }) => {
  if (searchTerm === undefined) {
    return <Wrapper></Wrapper>;
  } else if (loading === true) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <ActionTabContainer>
          <ActionTab
            className={
              tab === "user"
                ? "bg-primary-light text-gray-600 font-bold"
                : "bg-gray-100 text-gray-400"
            }
            onClick={() => setTab("user")}
          >
            <div>ユーザ</div>
          </ActionTab>
          <ActionTab
            className={
              tab === "post"
                ? "bg-primary-light text-gray-600 font-bold"
                : "bg-gray-100 text-gray-400"
            }
            onClick={() => setTab("post")}
          >
            <div>ポスト</div>
          </ActionTab>
        </ActionTabContainer>
        {searchTerm === undefined && <div>Search for something</div>}
        {tab === "user" &&
          (data.searchUser.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-700 text-lg">
              <Frown size={36} className="text-red-300 mr-3" /> 一致する検索結果がありません。
            </div>
          ) : (
            <UserSection>
              {data.searchUser.map((user) => (
                <UserCard
                  currentUser={currentUser}
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  isFollowing={user.isFollowing}
                  url={user.avatar}
                  isMyself={user.isMyself}
                />
              ))}
            </UserSection>
          ))}
        {tab === "post" &&
          (data.searchPost.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-700 text-lg">
              <Frown size={36} className="text-red-300 mr-3" /> 一致する検索結果がありません。
            </div>
          ) : (
            <PostSection>
              {data.searchPost.map((post) => (
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
            </PostSection>
          ))}
      </Wrapper>
    );
  }
};

export default SearchPresenter;
