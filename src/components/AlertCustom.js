import React from 'react';
import styled from 'styled-components/native';

import Colors from '../assets/Themes/Colors';

export default ({ 
    showAlert, 
    setShowAlert, 
    alertTitle, 
    alertMessage,
    displayNegativeButton,
    negativeText,  
    displayPositiveButton,
    positiveText,
    onPressPositiveButton,
    }) => {

    const handleNegativeClick = () => {
        setShowAlert(false);
    }

    const handlePositiveClick = () => {
        onPressPositiveButton();
        setShowAlert(false);
    }

    return(
        <Modal
            animationType = "fade"
            visible = { showAlert }
            transparent = { true }
        >
            <ModalViewArea>
                <ModalArea>
                    <ModalTitle>
                        <TitleAlertText>{ alertTitle }</TitleAlertText>
                    </ModalTitle>

                    <ModalMessage>
                        <MessageText>{ alertMessage }</MessageText>
                    </ModalMessage>

                    <ModalButton>
                        {
                            displayNegativeButton 
                            &&
                            <CustomButton onPress = { handleNegativeClick } >
                                <CustomButtonText>{ negativeText || "OK" }</CustomButtonText>
                            </CustomButton>
                        }
                        {
                            displayPositiveButton
                            &&
                            <CustomButton onPress = { () => handlePositiveClick() } >
                                <CustomButtonText>{ positiveText || "OK" }</CustomButtonText>
                            </CustomButton>
                        }
                    </ModalButton>
                </ModalArea>
            </ModalViewArea>            
        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalViewArea = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const ModalArea = styled.View`
    flex-direction: column;
    height: 25%;
    width: 80%;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 10px;
    padding: 4px;
`;

const ModalTitle = styled.View`
    flex: 0.5;
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 2px;
    padding-vertical: 4px;
`;

const TitleAlertText = styled.Text`
    flex: 1;
    text-align: center;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    padding: 2px;
    margin-horizontal: 2px;
`;

const ModalMessage = styled.View`
    flex: 1;
    width: 100%;
    padding: 4px;
    margin-vertical: 2px;
`;

const MessageText = styled.Text`
    color: #000;
    text-align: center;
    font-size: 16px;
    padding-horizontal: 6px;
    padding-vertical: 2px;
`;

const ModalButton = styled.View`
    flex: 0.5;
    width: 100%;
    flex-direction: row;
    padding: 4px;
    justify-content: space-evenly;
`;

const CustomButton = styled.TouchableOpacity`
    width: 100px;
    border-radius: 10px;
    background-color: ${ Colors.primary };
    justify-content: center;
    align-items: center;
`;

const CustomButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FFF;
`;