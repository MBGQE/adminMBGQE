import React, { useContext, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

import { Container, LoadingIcon } from './styles';

import FootLogo from '../../assets/Images/football.svg';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);

    useEffect(() => {
        const checkToken = async () => {
            let result = await Api.checkLogin();
            if (result) 
            {
                userDispatch({
                    type: 'setIdAdm',
                    payload: {
                        idAdm: result.uid,
                    },
                });
                navigation.reset({
                    routes: [{name: 'MainTab'}],
                });
            } 
            else 
            {
                navigation.reset({
                    routes: [{name: 'SignIn'}],
                });
            }
        }
        checkToken();
    }, [])

    return (
        <Container>
            <FootLogo width = "100%" height = "160" />
            <LoadingIcon size = "large" color = "#FFF" />
        </Container>
    )
}
