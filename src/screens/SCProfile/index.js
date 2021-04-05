import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {
    Container,
    Scroller,

    LoadingIcon,

    ProfileArea,
    MenuButton,

    UserInfoArea,
    AvatarArea,
    AvatarIcon,
    UserAvatarUpdate,
    UserAvatar,

    UserInfo,
    UserInfoName,

    PhotosArea,
    PhotosItemArea,

    PhotoItem,
    Photo,

    CustomButton,
    CustomButtonText,
} from './styles';

import { UserContext } from '../../context/UserContext';

import MenuIcon from '../../assets/Images/menu.svg';
import PhotoIcon from '../../assets/Images/photo.svg';
import AccountIcon from '../../assets/Images/account.svg';
import SCMenuModal from '../../components/SCMenuModal';

import Api from '../../Api';
import AlertCustom from '../../components/AlertCustom';

import Colors from '../../assets/Themes/Colors';

export default () => {
    const { state: user } = useContext(UserContext);

    const [quadraInfo, setQuadraInfo] = useState('');
    const [showModalMenu, setShowModalMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [photoField1, setPhotoField1] = useState('');
    const [photoField2, setPhotoField2] = useState('');
    const [photoField3, setPhotoField3] = useState('');

    const [photoUrl1, setPhotoUrl1] = useState(null);
    const [photoUrl2, setPhotoUrl2] = useState(null);
    const [photoUrl3, setPhotoUrl3] = useState(null);

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const setAlert = (visible = false, title = '', message = '') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    const getQuadraInfo = async () => {
        setLoading(true);
        let result = await Api.LoadSportCourt(user.idCourt);
        if (result.exists) 
        {
            setQuadraInfo(result.data());
        }
        setLoading(false);
    }

    useEffect(() => {
        getQuadraInfo();
    }, [])

    useEffect(() => {
        const awaitImage = async () => {
            if (photoField1 != '') 
            {
                let result = await Api.uploadPhotosCourt(user.idCourt, photoField1);
                if (result != '') 
                {
                    setPhotoUrl1(result);
                }
            }
        }
        awaitImage();
    }, [photoField1]);

    useEffect(() => {
        const awaitImage = async () => {
            if (photoField2 != '') 
            {
                let result = await Api.uploadPhotosCourt(user.idCourt, photoField2);
                if (result != '') 
                {
                    setPhotoUrl2(result);
                }
            }
        }
        awaitImage();
    }, [photoField2]);

    useEffect(() => {
        const awaitImage = async () => {
            if (photoField3 != '') 
            {
                let result = await Api.uploadPhotosCourt(user.idCourt, photoField3);
                if (result != '') 
                {
                    setPhotoUrl3(result);
                }
            }
        }
        awaitImage();
    }, [photoField3]);

    const handleUpdateAvatar = async () => {
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(async({path}) => {
            setLoading(true);
            console.log(path);
            if(path !== "")
            {
                const result = await Api.uploadImageCourt(user.idCourt, path);
                const upAvatar = await Api.updateAvatarCourt(user.idCourt, result);
                if(upAvatar)
                {
                    setAlert(true, "Aviso", "Avatar atualizado com sucesso!");
                    UserInfoData();
                }
            }
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleMenuButtonClick = () => {
        setShowModalMenu(true);
    }

    const handleImage1Click = async () => {
        await ImagePicker.openPicker({
            cropping: true,
        })
        .then((image) => {
            setPhotoField1(image.path);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleImage2Click = async () => {
        await ImagePicker.openPicker({
            cropping: true,
        })
        .then((image) => {
            setPhotoField2(image.path);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleImage3Click = async () => {
        await ImagePicker.openPicker({
            cropping: true,
        })
        .then((image) => {
            setPhotoField3(image.path);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleFinishClick = async () => {
        if (photoUrl1 != null && photoUrl2 != null && photoUrl3 != null)
        {
            setLoading(true);
            let result = await Api.updatePhotosCourt(user.idCourt, photoUrl1, photoUrl2, photoUrl3);
            if (result) 
            {
                setAlert(true, 'Aviso:', 'As fotos do local foram atualizadas com sucesso!');
            }
            setLoading(false);
        } 
        else 
        {
            setAlert(true, 'Não foram adicionadas todas as fotos!');
        }
    }

    const onRefresh = () => {
        setRefreshing(false);
        getQuadraInfo();
    }

    return (
        <Container>
            <Scroller
                refreshControl = 
                {
                    <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh } />
                }
            >

                {
                    loading && 
                    <LoadingIcon size = "large" color = "#FFF" />
                }

                <ProfileArea>
                    <UserInfoArea>
                        <AvatarArea>
                            <UserAvatarUpdate onPress = { handleUpdateAvatar }>
                            {
                                quadraInfo.avatar == '' ?
                                <AvatarIcon>
                                    <AccountIcon width = "150" height = "150" fill = { Colors.primary } />
                                </AvatarIcon>
                                :
                                <UserAvatar source = {{ uri: quadraInfo.avatar }} />                        
                            }
                            </UserAvatarUpdate>
                        </AvatarArea>

                        <UserInfo>
                            <UserInfoName>{ quadraInfo.name }</UserInfoName>
                        </UserInfo>
                        
                    </UserInfoArea>
                </ProfileArea>

                <PhotosArea>
                    <PhotosItemArea>
                        <PhotoItem onPress = { handleImage1Click } >
                            {
                                photoField1 != '' ? 
                                (
                                    <Photo source = {{ uri: photoField1 }} />
                                ) 
                                : 
                                (
                                    <PhotoIcon width = "100" height = "100" fill = "#FFF" />
                                )
                            }
                        </PhotoItem>

                        <PhotoItem onPress = { handleImage2Click } >
                            {
                                photoField2 != '' ? 
                                (
                                    <Photo source = {{ uri: photoField2 }} />
                                ) 
                                : 
                                (
                                    <PhotoIcon width = "100" height = "100" fill = "#FFF" />
                                )
                            }
                        </PhotoItem>

                        <PhotoItem onPress = { handleImage3Click } >
                            {
                                photoField3 != '' ? 
                                (
                                    <Photo source = {{ uri: photoField3 }} />
                                ) 
                                : 
                                (
                                    <PhotoIcon width = "100" height = "100" fill = "#FFF" />
                                )
                            }
                        </PhotoItem>

                    </PhotosItemArea>
                </PhotosArea>

                <CustomButton onPress = { handleFinishClick } >
                    <CustomButtonText>Finalizar Escolha das Fotos</CustomButtonText>
                </CustomButton>
            </Scroller>

            <MenuButton onPress = {handleMenuButtonClick } >
                <MenuIcon width = "25" height = "25" fill = "#FFF" />
            </MenuButton>

            <SCMenuModal 
                show = { showModalMenu }
                setShow = { setShowModalMenu } 
            />

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
