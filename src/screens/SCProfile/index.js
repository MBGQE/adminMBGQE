import React, { useState, useEffect, useContext } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import {
    Container,
    Scroller,
    LoadingIcon,
    ProfileArea,
    MenuButton,

    UserInfoArea,
    AvatarArea,
    UserAvatarUpdate,
    UserAvatar,
    UserInfo,
    UserInfoName,

    PhotosArea,
    PhotosItemArea,
    PhotoItem,
    Photo,

    CustomButton,
    CustomButtonText
} from './styles';

import { UserContext } from '../../context/UserContext';

import MenuIcon from '../../assets/Images/menu.svg';
import PhotoIcon from '../../assets/Images/photo.svg';
import AccountIcon from '../../assets/Images/account.svg';
import SCMenuModal from '../../components/SCMenuModal';

import Api from '../../Api';
import { Alert } from 'react-native';

export default () => {

    const { state: user } = useContext(UserContext);

    const [quadraInfo, setQuadraInfo] = useState('');
    const [showModalMenu, setShowModalMenu] = useState(false);
    const [loading, setLoading] = useState(false);

    const [photoField1, setPhotoField1] = useState('');
    const [photoField2, setPhotoField2] = useState('');
    const [photoField3, setPhotoField3] = useState('');

    const [photoUrl1, setPhotoUrl1] = useState(null);
    const [photoUrl2, setPhotoUrl2] = useState(null);
    const [photoUrl3, setPhotoUrl3] = useState(null);

    const getQuadraInfo = async () => {
        setLoading(true);
        let result = await Api.LoadSportCourt(user.idCourt);
        if(result.exists)
        {
            setQuadraInfo(result.data());
        }
        setLoading(false);
    }

    useEffect(() => {
        getQuadraInfo();
    }, []);

    useEffect(() => {
        const awaitImage = async () => {
            if(photoField1 != '')
            {
                let result = await Api.uploadPhotosCourt(user.idCourt, photoField1);
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
                let result = await Api.uploadPhotosCourt(user.idCourt, photoField2);
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
                let result = await Api.uploadPhotosCourt(user.idCourt, photoField3);
                if(result != '')
                {
                    setPhotoUrl3(result);
                }
            }
        }
        awaitImage();
    }, [photoField3]);

    const handleUpdateAvatar = async () => {
        let imagePath = '';
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(image => {
            console.log(image);
            imagePath = image.path;
        })
        .catch(error => {
            console.log("Error: ", error.message);
        });
        if(imagePath != '')
        {
            let result = await Api.uploadImageCourt(user.idCourt, imagePath);
            let upAvatar = await Api.updateAvatarCourt(user.idCourt, result);
            if(upAvatar)
            {
                Alert.alert("Avatar atualizado com sucesso!");
                getQuadraInfo();
            }
        }        
    }

    const handleMenuButtonClick = () => {
        setShowModalMenu(true);
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
        if(photoUrl1 != null && photoUrl2 != null && photoUrl3 != null)
        {
            let result = await Api.updatePhotosCourt(user.idCourt, photoUrl1, photoUrl2, photoUrl3);
            if(result)
            {
                Alert.alert("As fotos do local foram atualizadas com sucesso!");
            }
        }
        else
        {
            Alert.alert("Não foram adicionadas todas as fotos!");
        }
    }

    return(
        <Container>
            <Scroller>
                {
                    loading
                    &&
                    <LoadingIcon size = "large" color = "#FFF" />
                }
                <ProfileArea>
                    <UserInfoArea>
                        <AvatarArea>
                            <UserAvatarUpdate onPress = { handleUpdateAvatar } >
                                {
                                    quadraInfo.avatar != '' ?
                                        <UserAvatar source = {{ uri: quadraInfo.avatar }} />
                                        :
                                        <AccountIcon width = "150" height = "150" fill = "#FFF" />
                                }
                            </UserAvatarUpdate>
                        </AvatarArea>

                        <UserInfo >
                            <UserInfoName>{ quadraInfo.name }</UserInfoName>
                        </UserInfo>
                    </UserInfoArea>
                </ProfileArea>

                <PhotosArea>
                    <PhotosItemArea>
                        <PhotoItem onPress = { handleImage1Click } >
                            {
                                photoField1 != '' ?
                                <Photo source = {{ uri: photoField1 }} />
                                :
                                <PhotoIcon width = "100" height = "100" fill = "#FFF" />
                            } 
                        </PhotoItem>

                        <PhotoItem onPress = { handleImage2Click } >
                            {
                                photoField2 != '' ?
                                <Photo source = {{ uri: photoField2 }} />
                                :
                                <PhotoIcon width = "100" height = "100" fill = "#FFF" />
                            }                 
                        </PhotoItem>

                        <PhotoItem onPress = { handleImage3Click } >
                            {
                                photoField3 != '' ?
                                <Photo source = {{ uri: photoField3 }} />
                                :
                                <PhotoIcon width = "100" height = "100" fill = "#FFF" />
                            }                 
                        </PhotoItem>
                    </PhotosItemArea>
                </PhotosArea>

                <CustomButton onPress = { handleFinishClick } >
                    <CustomButtonText>Finalizar Escolha das Fotos</CustomButtonText>
                </CustomButton>                            
            </Scroller>

            <MenuButton onPress = { handleMenuButtonClick } >
                <MenuIcon width = "25" height = "25" fill = "#FFF" />
            </MenuButton>

            <SCMenuModal
                show = { showModalMenu }
                setShow = { setShowModalMenu }
            />
        </Container>
    );
}