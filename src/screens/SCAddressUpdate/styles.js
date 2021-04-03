import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`;

export const UpAddressHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 33px;
    margin-left: 50px;
`;

export const UpAddressTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const InputAreaAddress = styled.View``;

export const InputAreaInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: ${ Colors.secundary };
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
