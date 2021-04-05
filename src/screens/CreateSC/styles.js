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
    width: 200px;
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

export const InputAreaAddress = styled.View``;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const InputAreaInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TextRequesited = styled.Text`
    font-size: 18px;
    color: ${ Colors.textError };
    margin-bottom: 10px;
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
