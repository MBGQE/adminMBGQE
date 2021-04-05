import React, { useContext, useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import { useNavigation } from '@react-navigation/native';

import FootLogo from '../../assets/Images/football.svg';

import Api from '../../Api';

import { UserContext } from '../../context/UserContext';

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
