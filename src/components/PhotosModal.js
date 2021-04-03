import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ImagePicker from 'react-native-image-crop-picker';

import ExpandIcon from '../assets/Images/expand.svg';
import PhotoIcon from '../assets/Images/photo.svg';

import Api from '../Api';
import { Alert } from 'react-native';

export default ({ show, setShow, sportCourt }) => {

    const [photoField1, setPhotoField1] = useState('');
    const [photoField2, setPhotoField2] = useState('');
    const [photoField3, setPhotoField3] = useState('');

    const [photoUrl1, setPhotoUrl1] = useState(null);
    const [photoUrl2, setPhotoUrl2] = useState(null);
    const [photoUrl3, setPhotoUrl3] = useState(null);

    useEffect(() => {
        const awaitImage = async () => {
            if(photoField1 != '')
            {
                let result = await Api.uploadPhotosCourt(sportCourt.idQuadra, photoField1);
                if(result != '')
                {
                    setPhotoUrl1(result);
                }
            }
        }
        awaitImage();
    }, [photoField1]);

    useEffect(() => {
        const awaitImage = async () => {
            if(photoField2 != '')
            {
                let result = await Api.uploadPhotosCourt(sportCourt.idQuadra, photoField2);
                if(result != '')
                {
                    setPhotoUrl2(result);
                }
            }
        }
        awaitImage();
    }, [photoField2]);

    useEffect(() => {
        const awaitImage = async () => {
            if(photoField3 != '')
            {
                let result = await Api.uploadPhotosCourt(sportCourt.idQuadra, photoField3);
                if(result != '')
                {
                    setPhotoUrl3(result);
                }
            }
        }
        awaitImage();
    }, [photoField3]);

    const handleCloseButtonClick = () => {
        setShow(false);
    }

    const handleImage1Click = async () => {
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(image => {
            setPhotoField1(image.path);
        })
        .catch(error => {
            console.log("Error: ", error.message);
        });
    }

    const handleImage2Click = async () => {
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(image => {
            setPhotoField2(image.path);
        })
        .catch(error => {
            console.log("Error: ", error.message);
        });
    }

    const handleImage3Click = async () => {
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(image => {
            setPhotoField3(image.path);
        })
        .catch(error => {
            console.log("Error: ", error.message);
        });
    }

    const handleFinishClick = async () => {
        let result = await Api.updatePhotosCourt(sportCourt.idQuadra, photoUrl1, photoUrl2, photoUrl3);
        if(result)
        {
            Alert.alert("Fotos do local atualizados com sucesso.");
            setShow(false);
        }
    }

    return(
        <Modal
            transparent = { true }
            visible = { show }
            animationType = 'slide'
        >
            <ModalArea>
                <CloseButton onPress = { handleCloseButtonClick } >
                    <ExpandIcon width = "40" height = "40" fill = "#FFF" />
                </CloseButton>

                <PhotosArea>
                        <PhotoItem onPress = { handleImage1Click } >
                        {
                            photoField1 != '' ?
                            <Photo source = {{ uri: photoField1 }} />
                            :
                            <PhotoIcon width = "125" height = "125" fill = "#FFF" />
                        } 
                    </PhotoItem>

                    <PhotoItem onPress = { handleImage2Click } >
                        {
                            photoField2 != '' ?
                            <Photo source = {{ uri: photoField2 }} />
                            :
                            <PhotoIcon width = "125" height = "125" fill = "#FFF" />
                        }                 
                    </PhotoItem>

                    <PhotoItem onPress = { handleImage3Click } >
                        {
                            photoField3 != '' ?
                            <Photo source = {{ uri: photoField3 }} />
                            :
                            <PhotoIcon width = "125" height = "125" fill = "#FFF" />
                        }                 
                    </PhotoItem>
                </PhotosArea>                               

                <CustomButton onPress = { handleFinishClick } >
                    <CustomButtonText>Finalizar</CustomButtonText>
                </CustomButton>
            </ModalArea>
        </Modal>
    );
}

const Modal = styled.Modal``;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: #000;
`;

const PhotosArea = styled.View`
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
    flex: 1;
    border-width: 5px;
    border-color: #FFF;    
    border-radius: 20px;
`;

const PhotoItem = styled.TouchableOpacity`
    width: 125px;
    height: 125px
    border-width: 5px;
    border-color: #FFF;    
    border-radius: 20px;
    margin-left: 20px;
    margin-top: 30px;
    justify-content: center;
    align-items: center;
`;

const Photo = styled.Image`
    width: 115px;
    height: 115px;
    border-radius: 20px;
`;

const CustomButton = styled.TouchableOpacity`
    height: 50px;
    border-width: 5px;
    border-color: #FFF;    
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;