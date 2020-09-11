import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Heart, MessageSquare, UserCheck, UserPlus } from "react-feather";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { FOLLOW } from "../queries/Main/MainQueries";

const Container = styled.div`
  ${tw`bg-white rounded-lg flex font-thin p-5 mb-5 justify-between items-center`}
`;

const Avatar = styled.img`
  ${tw`w-16 h-16 rounded-full mr-5`}
`;

const DataContainer = styled.div`
  ${tw`font-thin`}
`;

const Message = styled.p`
  ${tw`font-thin`}
`;

const Example = styled.p`
  ${tw`text-gray-500`}
`;

const IconContainer = styled.div`
  ${tw`w-16 h-16 border border-gray-300 flex items-center justify-center bg-gray-200 rounded-full`};
`;

const TouchableIconContainer = styled.div`
  ${tw`w-16 h-16 rounded-full bg-primary hover:bg-primary-light flex items-center justify-center cursor-pointer`};
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
  }, [post, from]);

  return (
    <Container>
      <Avatar src={from.avatar} />
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
          <MessageSquare className="text-gray-600" size={28} />
        </IconContainer>
      )}
      {type === "LIKE" && (
        <IconContainer>
          <Heart className="text-gray-600" size={28} />
        </IconContainer>
      )}
      {type === "FOLLOW" && followDone === true && (
        <IconContainer>
          <UserCheck className="text-gray-600" size={28} />
        </IconContainer>
      )}
      {type === "FOLLOW" && followDone === false && (
        <TouchableIconContainer>
          <UserPlus className="text-white" size={28} onClick={handleFollow} />
        </TouchableIconContainer>
      )}
    </Container>
  );
};
