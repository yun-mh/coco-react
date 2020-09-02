import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useMutation } from "@apollo/client";
import { FOLLOW, UNFOLLOW } from "../queries/Main/MainQueries";

const Container = styled.div`
  ${tw`flex flex-col w-full mt-3`}
`;

const Btn = styled.button`
  ${tw`px-2 h-8 text-xs lg:px-5 lg:h-12 lg:text-base rounded-full focus:outline-none active:bg-primary-light`}
`;

const FollowButton = ({ id, isFollowing }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);

  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

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
    <Container>
      <Btn
        onClick={onClick}
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
