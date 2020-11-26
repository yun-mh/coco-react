import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import utils from "../utils";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${tw`flex flex-col items-center rounded-lg border px-3 py-5`}
`;

const Username = styled.div`
  ${tw`text-gray-700 mt-2`}
`;

const UserCard = ({ currentUser, id, username, isFollowing, url, isMyself }) => {
  return (
    <Card>
      <Link
        className="flex flex-col items-center"
        to={{
          pathname: `/user/${username}`,
          state: { id },
        }}
      >
        <Avatar url={url} />
        <Username>{utils.truncateText(username, 14)}</Username>
      </Link>
      {!isMyself && <FollowButton currentUser={currentUser} id={id} isFollowing={isFollowing} />}
    </Card>
  );
};

export default UserCard;
