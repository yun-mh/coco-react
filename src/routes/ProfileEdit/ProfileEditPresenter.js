import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`bg-white rounded-lg h-entire flex flex-col items-center`}
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const AvatarContainer = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: ${colors.grayShadow};
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

const Email = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.black};
  margin-top: 15px;
`;

const InputContainer = styled.View`
  margin-top: 30px;
`;

const ProfileEditPresenter = () => {
  return (
    <Container>
      <View
        style={{
          flex: 0.95,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AvatarContainer onPress={handlePickAvatar}>
          <Avatar source={{ uri: avatar }} />
          <Feather
            name="plus"
            size={40}
            color={colors.gray}
            style={{ marginTop: 5, marginLeft: 1 }}
          />
        </AvatarContainer>
        <Email>{email}</Email>
        <InputContainer>
          <Input
            value={username}
            placeholder="ユーザ名"
            autoCapitalize="none"
            stateFn={setUsername}
          />
        </InputContainer>
        <Button
          loading={loading}
          text={"修正"}
          accent={true}
          onPress={handleSubmit}
        />
      </View>
    </Container>
  );
};

export default ProfileEditPresenter;
