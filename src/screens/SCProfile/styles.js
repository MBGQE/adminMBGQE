import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    background-color: ${ Colors.primary };
    flex: 1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ProfileArea = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const MenuButton = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    top: 30px;
`;

export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
`;

export const AvatarArea = styled.View`
    border-width: 5px;
    border-color: #FFF;
    border-radius: 20px;
`;

export const UserAvatarUpdate = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 20px;
`;

export const UserInfo = styled.View`
    flex: 1;
    margin-top: 25px;
    justify-content: flex-start;
`;

export const UserInfoName = styled.Text`
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
    margin-left: 30px;
    align-items: center;
    margin-top: 15px;
`;

export const PhotosArea = styled.View`
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    flex: 1;
`;

export const PhotosItemArea = styled.View`
    flex: 1;
    margin-top: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const PhotoItem = styled.TouchableOpacity`
    width: 115px;
    height: 115px;
    border-width: 5px;
    border-color: #FFF;
    border-radius: 20px;
    margin-top: 10px;
    margin-right: 5px;
    margin-left: 5px;
    justify-content: center;
    align-items: center;
`;

export const Photo = styled.Image`
    width: 106px;
    height: 106px;
    border-radius: 20px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 50px;
    background-color: ${ Colors.secundary };
    margin-top: 35px;
    margin-left: 35px;
    margin-right: 35px;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
