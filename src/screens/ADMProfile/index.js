import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';
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

    CustomButtomArea,
    CustomButton,
    CustomButtonText,
} from './styles';

import AccountIcon from '../../assets/Images/account.svg';
import MenuIcon from '../../assets/Images/menu.svg';
import ADMMenuModal from '../../components/ADMMenuModal';

import Api from '../../Api';
import AlertCustom from '../../components/AlertCustom';

import Colors from '../../assets/Themes/Colors';

export default () => {
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showModalMenu, setShowModalMenu] = useState(false);

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const setAlert = (visible = false, title = '', message = '') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    const { state: user } = useContext(UserContext);

    const UserInfoData = async () => {
        setLoading(true);
        let result = await Api.LoadUserAdmin(user.idAdm);
        if (result.exists) 
        {
            setUserInfo(result.data());
        }
        setLoading(false);
    }

    useEffect(() => {
        UserInfoData();
    }, [])

    const handleMenuButtonClick = () => {
        setShowModalMenu(true);
    }

    const handleUpdateAvatar = async () => {
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(async({path}) => {
            setLoading(true);
            console.log(path);
            if(path !== "")
            {
                const result = await Api.uploadImageAdm(user.idAdm, path);
                const upAvatar = await Api.updateAvatarAdm(user.idAdm, result);
                if(upAvatar)
                {
                    setAlert(true, "Aviso", "Avatar atualizado com sucesso!");
                    setLoading(false);
                    UserInfoData();
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleSignOutClick = async () => {
        await Api.logout();
        setUserInfo('');
        navigation.reset({
            routes: [{name: 'Preload'}],
        });
    }

    const onRefresh = () => {
        setRefreshing(false);
        UserInfoData();
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
                                    userInfo.avatar == '' ?
                                    <AvatarIcon>
                                        <AccountIcon width = "150" height = "150" fill = { Colors.primary } />
                                    </AvatarIcon>
                                    :
                                    <UserAvatar source = {{ uri: userInfo.avatar }} />                        
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

            <MenuButton onPress ={ handleMenuButtonClick }>
                <MenuIcon width = "25" height = "25" fill = "#FFF" />
            </MenuButton>

            <ADMMenuModal show = { showModalMenu } setShow = { setShowModalMenu } />

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
