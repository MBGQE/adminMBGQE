import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import {
    Container,
    InputArea,
    CustomButton, 
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold

} from './styles';

import FootLogo from '../../assets/Images/football.svg';
import InputText from '../../components/InputText';
import EmailIcon from '../../assets/Images/email.svg';
import LockIcon from '../../assets/Images/lock.svg';

import Api from '../../Api';

export default () => {
    const navigation = useNavigation();    
    const { dispatch: userDispatch } = useContext(UserContext);

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignInClick = async () => {
        if(emailField != '' && passwordField != '')
        {
            let result = await Api.SignIn(emailField, passwordField);
            if(result)
            {
                userDispatch({
                    type: 'setIdAdm',
                    payload: {
                        idAdm: result.user.uid 
                    }
                });
                navigation.reset({
                   routes: [{name: 'MainTab'}]
                });
            }                          
        }
        else
        {
            Alert.alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.navigate('SignUp');
    }

    return(
        <Container>
            <FootLogo width = "100%" height = "160" />
            <InputArea>
                <InputText
                    IconSvg = { EmailIcon }
                    placeholder = "Digite seu e-mail"
                    value = { emailField }
                    onChangeText = {t => setEmailField(t)}
                />

                <InputText
                    IconSvg = { LockIcon }
                    placeholder = "Digite sua senha"
                    value = { passwordField }
                    onChangeText = { t => setPasswordField(t) }
                    password = { true }
                />

                <CustomButton onPress = { handleSignInClick }>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SignMessageButton onPress = { handleMessageButtonClick }>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}