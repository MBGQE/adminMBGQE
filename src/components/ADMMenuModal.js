import React, { useState } from 'react';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import BackIcon from '../assets/Images/back.svg';
import PasswordModal from './PasswordModal';

import Colors from '../assets/Themes/Colors';

export default ({ show, setShow }) => {
    const navigation = useNavigation();

    const [showModalPassword, setShowModalPassword] = useState(false);

    const handleCloseButtonCLick = () => {
        setShow(false);
    }

    const handleAddressUpdateClick = () => {
        setShow(false);
        navigation.navigate('ADMAddressUpdate');
    }

    const handlePhoneUpdateClick = () => {
        setShow(false);
        navigation.navigate('ADMPhoneUpdate');
    }

    const handlePasswordChangeClick = () => {
        setShowModalPassword(true);
    }

    return (
        <Modal 
            transparent = { true } 
            visible = { show } 
            animationType = "fade" 
        >
            <ModalArea>
                <CloseButton onPress = { handleCloseButtonCLick } >
                    <BackIcon width = "44" height = "44" fill = "#FFF" />
                </CloseButton>

                <CustomButton onPress = { handleAddressUpdateClick } >
                    <CustomButtonText>Atualizar Endereço</CustomButtonText>
                </CustomButton>

                <CustomButton onPress = { handlePhoneUpdateClick } >
                    <CustomButtonText>Atualizar Telefone</CustomButtonText>
                </CustomButton>

                <CustomButton onPress = { handlePasswordChangeClick } >
                    <CustomButtonText>Alterar Senha</CustomButtonText>
                </CustomButton>
            </ModalArea>

            <PasswordModal
                show = { showModalPassword }
                setShow = { setShowModalPassword }
            />
        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: #000;
    align-items: center;
    justify-content: center;
    padding: 40px;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 50px;
    width: 100%;
    background-color: ${Colors.secundary};
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
