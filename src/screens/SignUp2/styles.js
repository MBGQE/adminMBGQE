import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    background-color: ${ Colors.primary };
    flex: 1;
`;

export const HeaderArea = styled.View`
    margin-top: 33px;
    margin-left: 50px;
    width: 150px;
`;

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const Scroller = styled.ScrollView`
    background-color: ${ Colors.primary };
    flex: 1;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const DateArea = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    background: #FFF;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 10px;
`;

export const DateText = styled.Text`
    flex: 1;
    font-size: 16px;
    color: ${ Colors.primary };
    margin-left: 10px;
`;

export const Requesited = styled.Text`
    padding-right: 25px;
    font-size: 20px;
`;

export const InputAreaInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TextRequesited = styled.Text`
    font-size: 18px;
    color: ${ Colors.textError };
    margin-bottom: 10px
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: ${ Colors.secundary };
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;