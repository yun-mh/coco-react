import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${tw`flex flex-col items-center rounded-lg border px-3 py-5`}
`;

const Username = styled.div`
  ${tw`text-gray-700 mt-2`}
`;

const UserCard = ({ id, username, isFollowing, url, isMyself }) => {
  return (
    <Card>
      <Avatar url={url} />
      <Username>{username}</Username>
      {!isMyself && <FollowButton id={id} isFollowing={isFollowing} />}
    </Card>
  );
};

export default UserCard;
