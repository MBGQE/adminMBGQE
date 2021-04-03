import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

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

    CustomButtomArea,
    CustomButton,
    CustomButtonText
} from './styles';

import AccountIcon from '../../assets/Images/account.svg';
import MenuIcon from '../../assets/Images/menu.svg';
import ADMMenuModal from '../../components/ADMMenuModal';

import Api from '../../Api';
import { Alert } from 'react-native';

export default () => {

    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModalMenu, setShowModalMenu] = useState(false);

    const { state: user } = useContext(UserContext);

    const UserInfoData = async () => {
        setLoading(true);
        let result = await Api.LoadUserAdmin(user.idAdm);
        if(result.exists)
        {
            setUserInfo(result.data());
        }
        setLoading(false);
    }

    useEffect(() => {
        UserInfoData();
    }, []);

    const handleMenuButtonClick = () => {
        setShowModalMenu(true);
    }

    const handleUpdateAvatar = async () => {
        let imagePath = '';
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(image => {
            imagePath = image.path;
            console.log("Image Path: ", imagePath);
        })
        .catch(error => {
            console.log("Error: ", error.message);
        });
        if(imagePath != '')
        {
            let result = await Api.uploadImageAdm(user.idAdm, imagePath);
            let upAvatar = await Api.updateAvatarAdm(user.idAdm, result);
            if(upAvatar)
            {
                Alert.alert("Avatar atualizado com sucesso!");
                UserInfoData();
            }
        }        
    }

    const handleSignOutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes: [{ name: 'Preload' }]
        });
    }

    return(
        <Container>
            <Scroller>
                {
                    loading &&
                    <LoadingIcon size = "large" color = "#FFF" />
                }
                <ProfileArea>
                    <UserInfoArea>
                        <AvatarArea>
                            <UserAvatarUpdate onPress = { handleUpdateAvatar } >
                                {
                                    userInfo.avatar != '' ?
                                        <UserAvatar source = {{ uri: userInfo.avatar }} />
                                        :
                                        <AccountIcon width = "150" height = "150" fill = "#FFF" />
                                }
                            </UserAvatarUpdate>
                        </AvatarArea>

                        <UserInfo>
                            <UserInfoName>{ userInfo.name }</UserInfoName>
                        </UserInfo>
                    </UserInfoArea>
                </ProfileArea>
            </Scroller>

            <CustomButtomArea>
                <CustomButton onPress = { handleSignOutClick } >
                    <CustomButtonText>Sair da Conta</CustomButtonText>
                </CustomButton>
            </CustomButtomArea>

            <MenuButton onPress = { handleMenuButtonClick } >
                <MenuIcon width = "25" height = "25" fill = "#FFF" />
            </MenuButton>

            <ADMMenuModal
                show = { showModalMenu }
                setShow = { setShowModalMenu }
            />

        </Container>
    );
}