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

export const UpPeriodHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 33px;
    margin-bottom: 30px;
    margin-left: 50px;
`;

export const UpPeriodTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const DateArea = styled.View`
    background-color: #FFF;
    border-radius: 10px;
    margin-bottom: 15px;
    margin-left: 20px;
    margin-right: 20px;
    padding: 10px;
`;

export const DateInfo = styled.View`
    flex-direction: row;
`;

export const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`;
export const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

export const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000;
`;

export const DateList = styled.ScrollView``;

export const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`;

export const DateItemWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const TimeList = styled.ScrollView``;

export const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const TimeItemText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const DeleteButton = styled.TouchableOpacity`
    height: 60px;
    background-color: ${ Colors.secundary };
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
`;

export const DeleteButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
