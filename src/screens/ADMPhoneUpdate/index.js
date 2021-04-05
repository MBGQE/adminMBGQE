import React, { useState, useContext, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

import AlertCustom from '../../components/AlertCustom';

import {
    Container,
    BackButton,

    UpPhoneHeader,
    UpPhoneTitle,

    InputArea,

    CustomButton,
    CustomButtonText,
} from './styles';

import BackIcon from '../../assets/Images/back.svg';
import PhoneIcon from '../../assets/Images/phone.svg';

import InputNumber from '../../components/InputNumber';

import { phoneMask } from '../../Mask';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();

    const { state: user } = useContext(UserContext);

    const [userInfo, setUserInfo] = useState('');
    const [phoneField1, setPhoneField1] = useState('');
    const [phoneField2, setPhoneField2] = useState('');

    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    const setAlert = (visible = false, title = "", message = "") => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    useEffect(() => {
        const UserInfoData = async () => {
            let result = await Api.LoadUserAdmin(user.idAdm);
            if (result.exists) 
            {
                setUserInfo(result.data());
            }
        }
        UserInfoData();
    }, [])

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const handlePhoneUpdateClick = async () => {
        if(phoneField1 != '' && phoneField1.length === 14)
        {
            let result = await Api.updatePhoneADM(user.idAdm, phoneField1, phoneField2);
            if(result)
            {
                setAlert(true, "Aviso:", "Telefone alterado com sucesso!");
            }
        }
        else if(phoneField2 != '' && phoneField2.length === 14)
        {
            let result = await Api.updatePhoneADM(user, userInfo.celular1, phoneField2);
            if(result)
            {
                setAlert(true, "Aviso:", "Telefone alterado com sucesso!");
            }            
        }
        else if((phoneField1 != '' && phoneField1.length === 14) && (phoneField2 != '' && phoneField1.length === 14))
        {
            let result = await Api.updatePhoneADM(user.idAdm, phoneField1, phoneField2);
            if(result)
            {
                setAlert(true, "Aviso:", "Telefone alterado com sucesso!");
            }              
        }
        else
        {
            setAlert(true, "Erro ao alterar o telefone:", "Preencha o/os campo(s) corretamente!");
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
                    onChangeText = { (t) => setPhoneField1(t) }
                    maxLength = { 14 }
                    minLength = { 14 }
                />

                <InputNumber
                    IconSvg = { PhoneIcon }
                    placeholder = "Número do celular (2)"
                    value = { phoneMask(phoneField2) }
                    onChangeText = { (t) => setPhoneField2(t) }
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

            <AlertCustom
                showAlert = { alertVisible }
                setShowAlert = { setAlertVisible }
                alertTitle = { alertTitle }
                alertMessage = { alertMessage }
                displayNegativeButton = { true }
                negativeText = { 'OK' }
            />
        </Container>
    );
}
