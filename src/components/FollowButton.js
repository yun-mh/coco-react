import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useMutation } from "@apollo/client";
import { FOLLOW, UNFOLLOW, VIEW_USER } from "../queries/Main/MainQueries";

const Container = styled.div`
  ${tw`flex flex-col`}
  ${({ isBig }) => (isBig === true ? tw`w-full mt-3` : "w-16")}
`;

const Btn = styled.button`
  ${tw`rounded-full focus:outline-none active:bg-primary-light`}
  ${({ isBig }) =>
    isBig === true
      ? tw`px-2 h-8 text-xs lg:px-5 lg:h-12 lg:text-base`
      : tw`px-2 h-6 text-xs`}
`;

const FollowButton = ({
  currentUser,
  id,
  isFollowing,
  token,
  isBig = true,
}) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);

  const [followMutation] = useMutation(FOLLOW, {
    variables: {
      id,
      token,
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: currentUser } },
    ],
  });
  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: {
      id,
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: currentUser } },
    ],
  });

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      unfollowMutation();
    } else {
      setIsFollowing(true);
      followMutation();
    }
  };

  return (
    <Container isBig={isBig}>
      <Btn
        onClick={onClick}
        isBig={isBig}
        className={isFollowingS ? "border border-gray-600" : "bg-primary"}
      >
        <span className={isFollowingS ? "text-gray-600" : "text-white"}>
          {isFollowingS ? "アンフォロー" : "フォロー"}
        </span>
      </Btn>
    </Container>
  );
};
export default FollowButton;
