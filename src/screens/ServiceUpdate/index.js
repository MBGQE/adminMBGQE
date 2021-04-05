import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

import PriceModal from '../../components/PriceModal';

import {
    Container,
    LoadingIcon,
    BackButton,

    UpServiceHeader,
    UpServiceTitle,

    ServiceArea,
    ServiceItem,
    ServiceInfo,
    ServiceName,

    ServicePrice,

    ButtonArea,
    EditButton,
    DeleteButton,
} from './styles';

import BackIcon from '../../assets/Images/back.svg';
import EditIcon from '../../assets/Images/edit.svg';
import DeleteIcon from '../../assets/Images/delete.svg';

import Api from '../../Api';
import AlertCustom from '../../components/AlertCustom';

export default () => {
    const navigation = useNavigation();

    const [quadraInfo, setQuadraInfo] = useState('');
    const [newPrice, setNewPrice] = useState(null);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertPosDelete, setAlertPosDelete] = useState(false);
    const [delTipo, setDelTipo] = useState('');
    const [delPreco, setDelPreco] = useState('');

    const setAlert = (visible = false, title = '', message = '') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    const setAlertDelete = (visible = false, title = '', message = '', selTipo, selPreco) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertPosDelete(visible);
        setDelTipo(selTipo);
        setDelPreco(selPreco);
    }

    const { state: user } = useContext(UserContext);

    getInfoQuadra = async () => {
        setLoading(true);
        let result = await Api.LoadSportCourt(user.idCourt);
        if (result.exists)
        {
            setQuadraInfo(result.data());
        }
        setLoading(false);
    }

    useEffect(() => {
        getInfoQuadra();
    }, [showPriceModal]);

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const handleEditButtonClick = (key) => {
        setNewPrice(key);
        setShowPriceModal(true);
    }

    const handleDeleteButtonClick = (tipo, preco) => {
        setAlertDelete(true, 'Aviso:', 'Deseja deletar essa quadra?', tipo, preco);
    }

    const deleteServiceCourt = async (tipo, preco) => {
        let result = await Api.deleteService(user.idCourt, tipo, preco);
        if (result) 
        {
            setAlert(true, 'Aviso:',`Serviço ${tipo} R$${preco.toFixed(2)} deletado com sucesso!`);
            getInfoQuadra();
        }
    }

    return (
        <Container>
            <UpServiceHeader>
                <UpServiceTitle>Quadras Cadastradas</UpServiceTitle>
            </UpServiceHeader>
            {
                loading &&
                <LoadingIcon size = "large" color = "#FFF" />
            }
            
            {
                quadraInfo.servico && 
                (
                    <ServiceArea>
                        {
                            quadraInfo.servico.map((item, key) => 
                            (
                                <ServiceItem key = { key } >
                                    <ButtonArea>
                                        <EditButton onPress = { () => handleEditButtonClick(key) } >
                                            <EditIcon width = "25" height = "25" fill = "#FFF" />
                                        </EditButton>

                                        <DeleteButton onPress = { () => handleDeleteButtonClick(item.tipo, item.preco) } >
                                            <DeleteIcon width = "25" height = "25" fill = "#FF0000" />
                                        </DeleteButton>
                                    </ButtonArea>

                                    <ServiceInfo>
                                        <ServiceName>Tipo: { item.tipo }</ServiceName>
                                        <ServicePrice>R$ { item.preco.toFixed(2) }</ServicePrice>
                                    </ServiceInfo>

                                    <AlertCustom
                                        showAlert = { alertPosDelete }
                                        setShowAlert = { setAlertPosDelete } 
                                        alertTitle = { alertTitle }
                                        alertMessage = { alertMessage }
                                        displayNegativeButton = { true }
                                        negativeText = { "Não" }
                                        displayPositiveButton = { true }
                                        positiveText = { "Sim" }
                                        onPressPositiveButton = { () => deleteServiceCourt(delTipo, delPreco) }
                                    /> 
                                </ServiceItem>
                            ))
                        }
                    </ServiceArea>
                )
            }

            <BackButton onPress = { handleBackButtonClick } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>

            <PriceModal
                show = { showPriceModal }
                setShow = { setShowPriceModal }
                quadraInfo = { quadraInfo }
                service = { newPrice }
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
    )
}
