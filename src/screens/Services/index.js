import React, { useState, useContext, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import InputText from '../../components/InputText';
import InputNumber from '../../components/InputNumber';

import {
    Container,
    BackButton,

    HeaderArea,
    HeaderTitle,

    InputArea,

    CustomButton,
    CustomButtonText,
} from './styles';

import { UserContext } from '../../context/UserContext';

import Api from '../../Api';

import BackIcon from '../../assets/Images/back.svg';
import AlertCustom from '../../components/AlertCustom';

export default () => {
    
    const navigation = useNavigation();
    const { state: user } = useContext(UserContext);

    const [typeField, setTypeField] = useState('');
    const [priceField, setPriceField] = useState('');
    const [infoQuadra, setInfoQuadra] = useState('');

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const setAlert = (visible = false, title = '', message = '') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    useEffect(() => {
        const getInfoQuadra = async () => {
            let result = await Api.LoadSportCourt(user.idCourt);
            if (result.exists)
             {
                setInfoQuadra(result.data());
            }
        }
        getInfoQuadra();
    }, []);

    const handleBackClick = () => {
        navigation.goBack();
    }

    const handleRegisterClick = async () => {
        const priceNumber = Number(priceField);

        if (typeField != '' && priceNumber > 0) 
        {
            let result = await Api.setService(user.idCourt,typeField,priceNumber);
            if (result) 
            {
                setAlert(true, 'Aviso:', 'Nova quadra registrada com sucesso!');
            } 
            else 
            {
                setAlert(true, 'Atenção:', 'Esse serviço já está registrado!');
            }
        } 
        else 
        {
            setAlert(true, 'Atenção:', 'Os dados estão preenchidos incorretamente!');
        }
    }

    const handleUpdateServicesClick = () => {
        navigation.navigate('ServiceUpdate');
    }

    return (
        <Container>
            <BackButton onPress = { handleBackClick } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>

            <HeaderArea>
                <HeaderTitle>Registrar Quadra</HeaderTitle>
            </HeaderArea>

            <InputArea>
                <InputText
                    placeholder = "Tipo da Quadra"
                    value = { typeField }
                    onChangeText = { (t) => setTypeField(t) }
                />

                <InputNumber
                    placeholder = "R$ 00.00"
                    value = { priceField }
                    onChangeText = { (t) => setPriceField(t) }
                />

                <CustomButton onPress = { handleRegisterClick } >
                    <CustomButtonText>Registrar Quadra</CustomButtonText>
                </CustomButton>

                {
                    infoQuadra.servico && 
                    (
                        <CustomButton
                            onPress = { infoQuadra.servico.length > 0 ? handleUpdateServicesClick : null }
                        >
                            <CustomButtonText>Atualizar Quadra</CustomButtonText>
                        </CustomButton>
                    )
                }
            </InputArea>

            <AlertCustom
                showAlert = { alertVisible }
                setShowAlert = { setAlertVisible }
                alertTitle = { alertTitle }
                alertMessage = { alertMessage }
                displayNegativeButton = { true }
                negativeText = { 'OK' }
            />
        </Container>
    )
}
