import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
    margin-bottom: 30px
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`;

export const UpServiceHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 33px;
    margin-bottom: 30px;
    margin-left: 50px;
`;

export const UpServiceTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const ServiceArea = styled.View`
    margin-top: 30px;
`;

export const ServiceItem = styled.View`
    flex-direction: row;
    margin-bottom: 20px;
    margin-left: 20px;
`;

export const ServiceInfo = styled.View`
    flex: 1;
`;

export const ServiceName = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #FFF;
`;

export const ServicePrice = styled.Text`
    font-size: 16px;
    color: #FFF;
`;

export const ButtonArea = styled.View`
    width: 70px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const EditButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

export const DeleteButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;
