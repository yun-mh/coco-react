import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Heart, MessageSquare, UserCheck, UserPlus } from "react-feather";
import { useMutation } from "@apollo/client";
import { FOLLOW } from "../queries/Main/MainQueries";

const Container = styled.div`
  ${tw`bg-white rounded-lg flex font-thin p-5 mb-3 sm:mb-5 justify-between items-center shadow`}
`;

const Avatar = styled.img`
  ${tw`w-10 h-10 lg:w-16 lg:h-16 rounded-full mr-2 lg:mr-5 object-cover`}
`;

const DataContainer = styled.div`
  ${tw`w-3/5 font-thin text-xs md:text-base`}
`;

const Message = styled.p`
  ${tw`font-thin`}
`;

const Example = styled.p`
  ${tw`text-gray-500`}
`;

const IconContainer = styled.div`
  ${tw`w-10 h-10 lg:w-16 lg:h-16 border border-gray-300 flex items-center justify-center bg-gray-200 rounded-full`};
`;

const TouchableIconContainer = styled.div`
  ${tw`w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-primary hover:bg-primary-light flex items-center justify-center cursor-pointer`};
`;

export default ({ id, from, type, post, cmt, currentUser }) => {
  const [comment, setComment] = useState([]);
  const [followDone, setFollowDone] = useState(false);

  const [followMutation] = useMutation(FOLLOW, {
    variables: {
      id: from.id,
    },
  });

  const handleFollow = async () => {
    if (!followDone) {
      try {
        setFollowDone(true);
        await followMutation();
      } catch (error) {
        console.warn(error);
      }
    }
  };

  useEffect(() => {
    if (type === "COMMENT") {
      setComment(cmt);
      return;
    } else if (type === "FOLLOW") {
      const followExists = from.followers.find(
        (item) => item.id === currentUser
      );
      if (followExists !== undefined) {
        setFollowDone(true);
      }
    }
  }, [type, cmt, post, from, currentUser]);

  return (
    <Container>
      <Link
        to={{
          pathname: `/${from.username}`,
          state: { id: from.id },
        }}
      >
        <Avatar src={from.avatar} />
      </Link>
      <DataContainer>
        <Message>
          {type === "COMMENT" && `${from.username}さんがコメントしました。`}
          {type === "LIKE" &&
            `${from.username}さんがあなたのポストに共感しました。`}
          {type === "FOLLOW" &&
            `${from.username}さんがあなたをフォローしました。`}
        </Message>
        <Example>{type === "COMMENT" && `"${comment?.text}"`}</Example>
      </DataContainer>
      {type === "COMMENT" && (
        <IconContainer>
          <MessageSquare className="text-gray-600" />
        </IconContainer>
      )}
      {type === "LIKE" && (
        <IconContainer>
          <Heart className="text-gray-600" />
        </IconContainer>
      )}
      {type === "FOLLOW" && followDone === true && (
        <IconContainer>
          <UserCheck className="text-gray-600" />
        </IconContainer>
      )}
      {type === "FOLLOW" && followDone === false && (
        <TouchableIconContainer>
          <UserPlus className="text-white" onClick={handleFollow} />
        </TouchableIconContainer>
      )}
    </Container>
  );
};
