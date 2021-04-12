import React, { useState, useContext } from 'react';

import InputText from '../../components/InputText';
import InputInfo from '../../components/InputInfo';
import InputNumber from '../../components/InputNumber';
import InputCep from '../../components/InputCep';
import InputNumberStreet from '../../components/InputNumberStreet';
import InputUF from '../../components/InputUF';

import {useNavigation} from '@react-navigation/native';
import cep from 'cep-promise';

import {
    Container,

    HeaderArea,
    HeaderTitle,

    Scroller,

    InputAreaAddress,
    InputArea,
    InputAreaInfo,

    TextRequesited,

    CustomButton,
    CustomButtonText,
} from './styles';

import PhoneIcon from '../../assets/Images/phone.svg';

import { UserContext } from '../../context/UserContext';

import Api from '../../Api';

import { phoneSCMask, cepMask } from '../../Mask';
import AlertCustom from '../../components/AlertCustom';

export default () => {
    const navigation = useNavigation();
    const { state: user } = useContext(UserContext);
    const { dispatch: userDispatch } = useContext(UserContext);

    const [nameField, setNameField] = useState('');
    const [phoneField, setphoneField] = useState('');
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

    const fetchCep = async () => {
        await cep(cepField)
            .then((result) => {
                setStateField(result.state)
                setCityField(result.city)
                setNeighborhoodField(result.neighborhood)
                setStreetField(result.street)
            })
            .catch(() => {
                setAlert(true, 'Atenção', 'O CEP informado é inválido!');
            });
    }

    const handleSignUpClick = async () => {
        if (nameField != '' &&
            phoneField != '' &&
            cepField != '' &&
            streetField != '' &&
            numberField != '' &&
            neighborhoodField != '' &&
            cityField != '' &&
            stateField != ''
        )
        {
            if (phoneField.length === 13 &&(cepField.length === 9 || cepField === 8)) 
            {
                let result = await Api.createSportCourts(
                    user.idAdm,
                    nameField,
                    phoneField,
                    cepField,
                    streetField,
                    numberField,
                    neighborhoodField,
                    cityField,
                    stateField
                );
                if (result) 
                {
                    userDispatch({
                        type: 'setIdCourt',
                        payload: {
                            idCourt: result.id,
                        },
                    });
                    navigation.reset({
                        routes: [{name: 'MainTab'}],
                    });
                }
            } 
            else 
            {
                setAlert(true, 'Erro:', 'Os números do telefone ou do CEP estão no formato errado!');
            }
        } 
        else 
        {
            setAlert(true, 'Erro:', 'Preencha todos os campos!');
        }
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Cadastro do Complexo Esportivo</HeaderTitle>
            </HeaderArea>

            <Scroller>
                <InputArea>
                    <InputText
                        placeholder = "Nome do Complexo Esportivo"
                        value = { nameField }
                        onChangeText = { (t) => setNameField(t) }
                        requesited = { true }
                    />

                    <InputNumber
                        IconSvg = { PhoneIcon }
                        placeholder = "Número do telefone"
                        value = { phoneSCMask(phoneField) }
                        onChangeText = { (t) => setphoneField(t) }
                        maxLength = { 13 }
                        minLength = { 13 }
                        requesited = { true }
                    />

                    <InputCep
                        placeholder = "Cep"
                        value = { cepMask(cepField) }
                        onChangeText = { (t) => setCepField(t) }
                        onEndEditing = { () => fetchCep() }
                        maxLength = { 9 }
                        minLength = { 9 }
                        requesited = { true }
                    />
                    <InputAreaAddress>
                        <InputText
                            placeholder = { streetField != '' ? streetField : 'Rua' }
                            value = { streetField }
                            onChangeText = { (t) => setStreetField(t) }
                            requesited = { true }
                        />

                        <InputAreaInfo>
                            <InputInfo
                                placeholder = { neighborhoodField != '' ? neighborhoodField : 'Bairro' }
                                value = { neighborhoodField }
                                onChangeText = { (t) => setNeighborhoodField(t) }
                                requesited = { true }
                            />

                            <InputNumberStreet
                                placeholder = "Nº"
                                value = { numberField }
                                onChangeText = { (t) => setNumberField(t) }
                                requesited = { true }
                            />
                        </InputAreaInfo>

                        <InputAreaInfo>
                            <InputInfo
                                placeholder = { cityField != '' ? cityField : 'Cidade' }
                                value = { cityField }
                                onChangeText = { (t) => setCityField(t) }
                                requesited = { true }
                            />

                            <InputUF
                                placeholder = { stateField != '' ? stateField : 'Estado' }
                                value = { stateField }
                                onChangeText = { (t) => setStateField(t) }
                                requesited = { true }
                            />
                        </InputAreaInfo>

                        <TextRequesited>* Estes campos são obrigatórios!</TextRequesited>

                        <CustomButton onPress = { handleSignUpClick }>
                            <CustomButtonText>Cadastrar Complexo Esportivo</CustomButtonText>
                        </CustomButton>
                    </InputAreaAddress>
                </InputArea>

                <AlertCustom
                    showAlert = { alertVisible }
                    setShowAlert = { setAlertVisible }
                    alertTitle = { alertTitle }
                    alertMessage = { alertMessage }
                    displayNegativeButton = { true }
                    negativeText = { 'OK' }
                />
            </Scroller>
        </Container>
    )
}
