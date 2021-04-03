import React, { useState, useContext } from 'react'

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

import {
    Container,
    BackButton,
    UpPhoneHeader, 
    UpPhoneTitle,

    InputArea, 
    CustomButton, 
    CustomButtonText
} from './styles'

import BackIcon from '../../assets/Images/back.svg';
import PhoneIcon from '../../assets/Images/phone.svg';

import InputNumber from '../../components/InputNumber';

import { phoneSCMask } from '../../Mask';
import { Alert } from 'react-native';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    
    const { state: user } = useContext(UserContext); 

    const [phoneField, setphoneField] = useState('');

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const handlePhoneUpdate = async () => {
        if(phoneField != '')
        {
            let result = await Api.updatePhoneSC(user.idCourt, phoneField);
            if(result)
            {
                Alert.alert("Telefone alterado com sucesso!");
                navigation.goBack();
            }
        }
        else
        {
            Alert.alert("Preencha o campo!");
        }
    }

    return (
        <Container>
            <UpPhoneHeader>
                <UpPhoneTitle>Atualizar Telefone</UpPhoneTitle>
            </UpPhoneHeader>

            <InputArea>
                <InputNumber
                    IconSvg = { PhoneIcon }
                    placeholder = "Número do telefone"
                    value = { phoneSCMask(phoneField) }
                    onChangeText = { t => setphoneField(t) }
                    maxLength = { 13 }    
                    minLength = { 13 }
                />

                <CustomButton onPress = { handlePhoneUpdate } >
                    <CustomButtonText>Atualizar Telefone</CustomButtonText>
                </CustomButton>
            </InputArea>

            <BackButton onPress = { handleBackButtonClick } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>
        </Container>
    );
}