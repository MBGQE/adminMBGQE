import React, { useState, useContext } from 'react';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

import AlertCustom from '../../components/AlertCustom';

import {
    Container,
    BackButton,

    UpAddressHeader,
    UpAddressTitle,

    InputArea,
    InputAreaAddress,
    InputAreaInfo,

    CustomButton,
    CustomButtonText,
} from './styles';

import BackIcon from '../../assets/Images/back.svg';

import InputCep from '../../components/InputCep';
import InputInfo from '../../components/InputInfo';
import InputNumberStreet from '../../components/InputNumberStreet';
import InputUF from '../../components/InputUF';
import InputText from '../../components/InputText';

import { cepMask } from '../../Mask';
import cep from 'cep-promise';

import Api from '../../Api';

export default () => {
    const navigation = useNavigation();

    const { state: user } = useContext(UserContext);

    const [cepField, setCepField] = useState('');
    const [streetField, setStreetField] = useState('');
    const [neighborhoodField, setNeighborhoodField] = useState('');
    const [numberField, setNumberField] = useState('');
    const [stateField, setStateField] = useState('');
    const [cityField, setCityField] = useState('');

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const setAlert = (visible = false, title = '', message = '') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const fetchCep = async () => {
        await cep(cepField)
            .then((result) => {
                setStateField(result.state);
                setCityField(result.city);
                setNeighborhoodField(result.neighborhood);
                setStreetField(result.street);
            })
            .catch(() => {
                setAlert(true, 'Erro ao atualizar o endere??o:', 'O CEP informado ?? inv??lido!');
            });
    }

    const handleAddressButtonClick = async () => {
        if (cepField != '' &&
            streetField != '' &&
            numberField != '' &&
            neighborhoodField != '' &&
            cityField != '' &&
            stateField != ''
        )
        {
            let result = await Api.updateAddressADM(
                user.idAdm,
                cepField,
                streetField,
                numberField,
                neighborhoodField,
                cityField,
                stateField
            );
            if (result) 
            {
                setAlert(true, 'Aviso:', 'O endere??o foi atualizado com sucesso!');
            }
        } 
        else
        {
            setAlert(true, 'Erro ao atualizar o endere??o', 'Preencha todos os campos!');
        }
    }

    return (
        <Container>
            <UpAddressHeader>
                <UpAddressTitle>Atualizar Endere??o</UpAddressTitle>
            </UpAddressHeader>

            <InputArea>
                <InputCep
                    placeholder = "Cep"
                    value = { cepMask(cepField) }
                    onChangeText = { (t) => setCepField(t) }
                    onEndEditing = { () => fetchCep() }
                    maxLength = { 9 }
                    minLength = { 9 }
                />
                <InputAreaAddress>
                    <InputText
                        placeholder = { streetField != '' ? streetField : 'Rua' }
                        value = { streetField }
                        onChangeText = { (t) => setStreetField(t) }
                    />
                    <InputAreaInfo>
                        <InputInfo
                            placeholder = { neighborhoodField != '' ? neighborhoodField : 'Bairro' }
                            value = { neighborhoodField }
                            onChangeText = { (t) => setNeighborhoodField(t) }
                        />
                        <InputNumberStreet
                            placeholder = "N??"
                            value = { numberField }
                            onChangeText = { (t) => setNumberField(t) }
                        />
                    </InputAreaInfo>

                    <InputAreaInfo>
                        <InputInfo
                            placeholder = { cityField != '' ? cityField : 'Cidade' }
                            value = { cityField }
                            onChangeText = { (t) => setCityField(t) }
                        />
                        <InputUF
                            placeholder = { stateField != '' ? stateField : 'Estado' }
                            value = { stateField }
                            onChangeText = { (t) => setStateField(t) }
                        />
                    </InputAreaInfo>
                </InputAreaAddress>

                <CustomButton onPress = { handleAddressButtonClick }>
                    <CustomButtonText>Atualizar Endere??o</CustomButtonText>
                </CustomButton>
            </InputArea>

            <BackButton onPress = { handleBackButtonClick }>
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
