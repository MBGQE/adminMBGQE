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

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 33px;
    margin-bottom: 30px;
    margin-left: 50px;
`;

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const ListArea = styled.View``;

export const DateArea = styled.View`
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 15px;
    margin-left: 20px;
    margin-right: 20px;
    padding: 10px;
`;

export const DateInfo = styled.View`
    flex-direction: row;
`;

export const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const DataNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
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

export const RenderListItem = styled.View`
    flex: 1;
`;

export const TimeArea = styled.FlatList`
    flex: 1;
`;

export const TimeItem = styled.View`
    margin-top: 10px;
    margin-left: 50px;
    margin-right: 50px;
    background-color: #FFF;
    border-radius: 30px;
    height: 50px;
    width: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const TimeText = styled.Text`
    font-size: 17px;
`;

export const CheckItem = styled.View`
    margin-left: 5px;
`;

export const ButtonArea = styled.View`
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
    justify-content: space-between;
    flex-direction: row;
`;

export const FinishButton = styled.TouchableOpacity`
    background-color: ${ Colors.secundary };
    height: 50px;
    width: 170px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
`;

export const FinishButtonText = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;
