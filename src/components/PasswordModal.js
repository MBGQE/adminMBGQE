import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

import { UserContext } from '../context/UserContext';

import InputText from './InputText';

import Api from '../Api';

import ExpandIcon from '../assets/Images/expand.svg';
import LockIcon from '../assets/Images/lock.svg';

import Colors from '../assets/Themes/Colors';

export default ({ show, setShow }) => {

    const { state: user } = useContext(UserContext);

    const [newPasswordField, setNewPasswordField] = useState('');
    const [currentPasswordField, setCurrentPasswordField] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/; 

    const handleCloseButton = () => {
        setShow(false);
    }

    const handlePasswordUpdate = async () => {
        if(newPasswordField != '' && currentPasswordField)
        {
            if(newPasswordField.length < 6 && confirmNewPassword.length < 6)
            {
                Alert.alert("A senha precisa ter no mínimo 6 caracteres");
            }
            else if(!regex.exec(newPasswordField))
            {
                Alert.alert("A senha deve conter no mínimo 1 caratere em maiúsculo, 2 números e 1 catectere especial!");
            }
            else if(!regex.exec(confirmNewPassword))
            {
                Alert.alert("A senha deve conter no mínimo 1 caratere em maiúsculo, 2 números e 1 catectere especial!");
            }
            else if(confirmNewPassword != newPasswordField)
            {
                Alert.alert("As senhas não são iguais!");
            }
            else
            {
                let result = await Api.updatePassword(user.idAdm, newPasswordField, currentPasswordField);
                if(result)
                {
                    setShow(false);
                }
            }
        }
        else
        {
            Alert.alert("Preencha a senha");
        }
    }

    return(
        <Modal
            transparent = { true }
            visible = { show }
            animationType = 'slide'
        >
            <ModalArea>

                    <CloseButton onPress = { handleCloseButton } >
                        <ExpandIcon width = "40" height = "40" fill = "#FFF" />
                    </CloseButton>

                    <ModalItem>
                        <InputArea >
                            <LockIcon width = "24" height = "24" fill = "#000" />
                            <InputText
                                placeholder = "Digite sua senha atual"
                                placeholderTextColor = "#000"
                                value = { currentPasswordField }
                                onChangeText = { t => setCurrentPasswordField(t) }
                                secureTextEntry = { true }
                            />

                        </InputArea>
                    </ModalItem>

                    <ModalItem>                        
                        <InputArea >
                            <LockIcon width = "24" height = "24" fill = "#000" />
                             <InputText
                                placeholder = "Digite sua nova senha"
                                placeholderTextColor = "#000"
                                value = { newPasswordField }
                                onChangeText = { t => setNewPasswordField(t) }
                                secureTextEntry = { true }
                            />

                        </InputArea>
                    </ModalItem>

                    <ModalItem>                        
                        <InputArea >
                            <LockIcon width = "24" height = "24" fill = "#000" />
                             <InputText
                                placeholder = "Confirmar nova senha"
                                placeholderTextColor = "#000"
                                value = { confirmNewPassword }
                                onChangeText = { t => setConfirmNewPassword(t) }
                                secureTextEntry = { true }
                            />
                            
                        </InputArea>
                    </ModalItem>
                    
                <ButtonNewPassword onPress = { handlePasswordUpdate } >
                    <ButtonNewPasswordText>Alterar Senha</ButtonNewPasswordText>
                </ButtonNewPassword>
            </ModalArea> 

        </Modal>
    );
}

const Modal = styled.Modal``;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
    height: 44px;
    width: 44px;
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: #000;
    align-items: center;
    justify-content: center;
`;

const ModalItem = styled.View`
    background-color: #FFF;    
    height: 60px;
    border-radius: 30px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
`;

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 15px;
`;

const ButtonNewPassword = styled.TouchableOpacity`
    background-color: ${ Colors.secundary };
    height: 60px;
    width: 90%;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
`;

const ButtonNewPasswordText = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;