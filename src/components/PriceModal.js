import React, { useState } from 'react';
import styled from 'styled-components/native';

import BackIcon from '../assets/Images/back.svg';

import InputNumber from './InputNumber';

import Api from '../Api';
import { Alert } from 'react-native';

import Colors from '../assets/Themes/Colors';

export default ({ show, setShow, quadraInfo, service }) => {

    const [newPriceField, setNewPriceField] = useState('');

    const handleCloseButtonClick = () => {
        setShow(false);
    }

    const handleNewPriceClick = async () => {
        const newPriceNumber = Number(newPriceField);
        const tipo = quadraInfo.servico[service].tipo;
        const preco = quadraInfo.servico[service].preco;
        if(newPriceNumber > 0)
        {
            let result = await Api.updatePrice(quadraInfo.idQuadra, tipo, preco, newPriceNumber);
            if(result)
            {
                Alert.alert(`Serviço ${tipo} R$${preco.toFixed(2)} foi alterado para ${tipo} R$${newPriceNumber.toFixed(2)}.`);
                setShow(false);
            }
        }
        else
        {
            Alert.alert("Preencha o campo corretamente!")
        }
    }

    return (
        <Modal
            transparent = { true }
            visible = { show }
            animationType = "fade"
        >
            <ModalArea>
                <CloseButton onPress = { handleCloseButtonClick } >
                    <BackIcon width = "44" height = "44" fill = "#FFF" />
                </CloseButton>

                {
                    service != null &&
                    <InputArea>
                        <InputNumber
                            placeholder = "Novo preço"
                            value = { newPriceField }
                            onChangeText = { t => setNewPriceField(t) }
                        />

                        <CustomButton onPress = { handleNewPriceClick } >
                            <CustomButtonText>Registrar Novo Preço</CustomButtonText>
                        </CustomButton>
                    </InputArea>
                }
            </ModalArea>
        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: ${ Colors.primary };
    align-items: center;
    justify-content: center;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`;

const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: ${ Colors.secundary };
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
`;

const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
