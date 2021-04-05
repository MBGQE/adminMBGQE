import React from 'react';
import styled from 'styled-components/native';

import Colors from '../assets/Themes/Colors';

const InputArea = styled.View`
    width: 35%;
    height: 60px;
    background-color: #FFF;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 10px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: ${ Colors.primary };
    margin-left: 10px;
`;

const TextRequesited = styled.Text`
    padding-right: 25px;
    font-size: 20px;
`;

export default ({ placeholder, value, onChangeText, requesited }) => {
    return (
        <InputArea>

            <Input
                placeholder = { placeholder }
                placeholderTextColor = { Colors.primary }
                value = { value }
                onChangeText = { onChangeText }
            />

            {
                requesited 
                && 
                <TextRequesited>*</TextRequesited>
            }
        </InputArea>
    );
}
