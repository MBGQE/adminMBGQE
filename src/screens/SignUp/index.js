import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import {
    Container,
    BackButton,

    HeaderArea,
    HeaderTitle,

    Scroller,

    InputArea,

    TextRequesited,

    CustomButton,
    CustomButtonText,

    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './styles';

import InputText from '../../components/InputText';
import InputNumber from '../../components/InputNumber';
import EmailIcon from '../../assets/Images/email.svg';
import LockIcon from '../../assets/Images/lock.svg';
import PhoneIcon from '../../assets/Images/phone.svg';
import PersonIcon from '../../assets/Images/person.svg';
import BackIcon from '../../assets/Images/back.svg';

import { phoneMask } from '../../Mask';
import Api from '../../Api';
import AlertCustom from '../../components/AlertCustom';

export default () => {
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneField1, setPhoneField1] = useState('');
    const [phoneField2, setPhoneField2] = useState('');

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const setAlert = (visible = false, title = '', message = '') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/

    const handleNextClick = async () => {
        if (nameField != '' && emailField != '' && passwordField != '' && phoneField1 != '') 
        {
            if (passwordField.length < 6 && passwordConfirm.length < 6) 
            {
                setAlert(true, 'Erro no cadastro:', 'A senha precisa ter no m??nimo 6 caracteres!');
            }
            else if (!regex.exec(passwordField) && !regex.exec(passwordConfirm)) 
            {
                setAlert(true, 'Erro no cadastro:', 'A senha deve conter 1 caratere em mai??sculo e 1 catectere especial!');
            } 
            else if (passwordConfirm != passwordField)
            {
                setAlert(true, 'Erro no cadastro:', 'As senhas n??o s??o iguais!');
            } 
            else
            {
                if (phoneField1.length === 14 || phoneField2.length === 14)
                {
                    let result = await Api.SignUp(nameField, emailField, passwordField, phoneField1, phoneField2);
                    if (result.code == 'auth/email-already-in-use') 
                    {
                        setAlert(true, 'Erro no cadastro:', 'E-mail j?? est?? em uso!');
                    } 
                    else if  (result.code == 'auth/invalid-email') 
                    {
                        setAlert(true, 'Erro no cadastro:', 'E-mail inv??lido!');
                    }
                    else 
                    {
                        userDispatch ({
                            type: 'setIdAdm',
                            payload: {
                                idAdm: result,
                            },
                        });
                        await Api.setTokenMessage(result);
                        navigation.navigate('SignUp2');
                    }
                } 
                else 
                {
                    setAlert(true, 'Aten????o:', 'O n??mero do telefone informado est?? incorreto!');
                }
            }
        } else {
            setAlert(true, 'Aten????o:', 'Preencha os campos!');
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}],
        })
    }

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <BackButton onPress = { handleBackButtonClick } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>

            <HeaderArea>
                <HeaderTitle>Cadastro</HeaderTitle>
            </HeaderArea>

            <Scroller>
                <InputArea>
                    <InputText
                        IconSvg = { PersonIcon }
                        placeholder = "Digite seu nome"
                        value = { nameField }
                        onChangeText = { (t) => setNameField(t) }
                        requesited = { true }
                    />

                    <InputText
                        IconSvg = { EmailIcon }
                        placeholder = "Digite seu e-mail"
                        value = { emailField }
                        onChangeText = { (t) => setEmailField(t) }
                        requesited = { true }
                    />

                    <InputText
                        IconSvg = { LockIcon }
                        placeholder = "Digite sua senha"
                        value = { passwordField }
                        onChangeText = { (t) => setPasswordField(t) }
                        password = { true }
                        requesited = { true }
                    />

                    <InputText
                        IconSvg = { LockIcon }
                        placeholder = "Confirmar senha"
                        value = { passwordConfirm }
                        onChangeText = { (t) => setPasswordConfirm(t) }
                        password = { true }
                        requesited = { true }
                    />

                    <InputNumber
                        IconSvg = { PhoneIcon }
                        placeholder = "N??mero do celular (1)"
                        value = { phoneMask(phoneField1) }
                        onChangeText = { (t) => setPhoneField1(t) }
                        maxLength = { 14 }
                        minLength = { 14 }
                        requesited = { true }
                    />

                    <InputNumber
                        IconSvg = { PhoneIcon }
                        placeholder = "N??mero do celular (2)"
                        value = { phoneMask(phoneField2) }
                        onChangeText = { (t) => setPhoneField2(t) }
                        maxLength = { 14 }
                        minLength = { 14 }
                    />

                    <TextRequesited>* Estes campos s??o obrigat??rios!</TextRequesited>

                    <CustomButton onPress = { handleNextClick } >
                        <CustomButtonText>Prosseguir</CustomButtonText>
                    </CustomButton>
                </InputArea>

                <SignMessageButton onPress = { handleMessageButtonClick } >
                    <SignMessageButtonText>J?? possui uma conta?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Fa??a Login</SignMessageButtonTextBold>
                </SignMessageButton>
            </Scroller>

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
