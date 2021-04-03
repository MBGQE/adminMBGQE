import React, { useState, useContext, useEffect } from 'react'

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

import { phoneMask } from '../../Mask';
import { Alert } from 'react-native';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    
    const { state: user } = useContext(UserContext);

    const [userInfo, setUserInfo] = useState('');
    const [phoneField1, setPhoneField1] = useState('');
    const [phoneField2, setPhoneField2] = useState('');

    useEffect(() => {
        const UserInfoData = async () => {
            let result = await Api.LoadUserAdmin(user.idAdm);
            if(result.exists)
            {
                setUserInfo(result.data());
            }
        }
        UserInfoData();
    }, []);

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const handlePhoneUpdateClick = async () => {
        if(phoneField1 != '')
        {
            let result = await Api.updatePhoneADM(user.idAdm, phoneField1, phoneField2);
            
            if(result)
            {
                Alert.alert("Telefone alterado com sucesso!");
                navigation.goBack();
            }
        }
        else if(phoneField2 != '')
        {
            let result = await Api.updatePhoneADM(user.idAdm, userInfo.celular1, phoneField2);
            
            if(result)
            {
                Alert.alert("Telefone alterado com sucesso!");
                navigation.goBack();
            }            
        }
        else if(phoneField1 != '' && phoneField2 != '')
        {
            let result = await Api.updatePhoneADM(user.idAdm, phoneField1, phoneField2);
            
            if(result)
            {
                Alert.alert("Telefone alterado com sucesso!");
                navigation.goBack();
            }              
        }
        else
        {
            Alert.alert("Preencha o/os campo(s)!");
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
                    placeholder = "Número do celular (1)"
                    value = { phoneMask(phoneField1) }
                    onChangeText = { t => setPhoneField1(t) }
                    maxLength = { 14 }    
                    minLength = { 14 }
                />

                <InputNumber
                    IconSvg = { PhoneIcon }
                    placeholder = "Número do celular (2)"
                    value = { phoneMask(phoneField2) }
                    onChangeText = { t => setPhoneField2(t) }
                    maxLength = { 14 }    
                    minLength = { 14 }
                />

                <CustomButton onPress = { handlePhoneUpdateClick } >
                    <CustomButtonText>Atualizar Telefone</CustomButtonText>
                </CustomButton>
            </InputArea>

            <BackButton onPress = { handleBackButtonClick } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>
        </Container>
    );
}