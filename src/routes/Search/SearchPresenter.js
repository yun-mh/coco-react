import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Wrapper = styled.div`
  ${tw`bg-white rounded-b-lg`}
`;

const ActionTabContainer = styled.div`
  ${tw`flex flex-row h-12`}
`;

const ActionTab = styled.div`
  ${tw`flex flex-1 justify-center items-center cursor-pointer`}
`;

const Section = styled.div`
  ${tw`p-3 grid grid-cols-4 lg:grid-cols-2 lg:gap-8`}
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({ searchTerm, loading, data, tab, setTab }) => {
  if (searchTerm === undefined) {
    return <Wrapper></Wrapper>;
  } else if (loading === true) {
    return (
      <Wrapper>
        <div>Loading...</div>
      </Wrapper>
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
        {tab === "user" && (
          <Section>
            {data.searchUser.length === 0 ? (
              <div>No user</div>
            ) : (
              <div>test</div>
              // data.searchUser.map((user) => (
              //   <UserCard
              //     key={user.id}
              //     id={user.id}
              //     username={user.username}
              //     isFollowing={user.isFollowing}
              //     url={user.avatar}
              //     isSelf={user.isSelf}
              //   />
              // ))
            )}
          </Section>
        )}
        {tab === "post" && (
          <Section>
            {data.searchPost.length === 0 ? (
              <div>No post</div>
            ) : (
              <div>test</div>
              //   <SquarePost
              //     key={post.id}
              //     likeCount={post.likeCount}
              //     commentCount={post.commentCount}
              //     file={post.files[0]}
              //   />
            )}
          </Section>
        )}
      </Wrapper>
    );
  }
};

export default SearchPresenter;
