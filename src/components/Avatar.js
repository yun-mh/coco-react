import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import PropTypes from "prop-types";

const Container = styled.div`
  ${tw`w-10 h-10 lg:w-16 lg:h-16 bg-primary-light rounded-full`};
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ url, className }) => (
  <Container className={className} url={url} />
);

// Avatar.propTypes = {
//   size: PropTypes.oneOf(["sm", "md", "lg"]),
//   url: PropTypes.string.isRequired,
// };

export default Avatar;
