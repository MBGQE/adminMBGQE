import React, { useContext, useState, useEffect } from 'react';

import { RefreshControl } from 'react-native';

import {
    Container,
    HeaderArea,
    HeaderTitle,
    Scroller,

    LoadingIcon,

    ListInfo,

    EmptyScroller,
    EmptyHeader,
    EmptyToday,
    EmptyTitle,

    ListArea,

    InfoPlayerArea,
    InfoPlayerName,

    InfoServiceChooseArea,
    InfoServiceArea,
    InfoService,

    InfoDateArea,
    InfoDayArea,
    InfoHourArea,
    InfoDateText,

    CancelButton,
    CancelButtonText,
} from './styles';

import { UserContext } from '../../context/UserContext';
import Api from '../../Api';

import AlertCustom from '../../components/AlertCustom';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const  { state: user } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [listAppointments, setListAppointments] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [itemCancel, setItemCancel] = useState("");

    const [today, setToday] = useState("");

    const setAlert = (visible = false, title = "", message = "", item) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
        setItemCancel(item);
    }

    useEffect(() => {
        const setIdCourt = async () => {
            let result = await Api.LoadUserAdmin(user.idAdm);
            let court = result.data().quadras;
            if (result) 
            {
                userDispatch({
                    type: 'setIdCourt',
                    payload: {
                        idCourt: court,
                    },
                });
            }
        }
        setIdCourt();
    }, [])

    useEffect(() => {
        let date = new Date();
        let Day = date.getDate();
        let Month = date.getMonth();
        let Year = date.getFullYear();
        let month = Month < 10 ? '0' + (Month + 1) : (Month + 1);
        let day = Day < 10 ? '0' + Day : Day;
        setToday( `${day}/${month}/${Year}`);
    }, []);

    const getListAppointments = async () => {
        setLoading(true);
        let result = await Api.getAppointments(user.idCourt);
        if (result) 
        {
            setListAppointments(result);
        };
        setLoading(false);
    }

    useEffect(() => {
        getListAppointments();
    }, [user.idCourt]);

    const onRefresh = () => {
        setRefreshing(false);
        getListAppointments();
    }

    const handleCancelAppointments = (listAppointments) => {
        setAlert(true, "Sistema:", "Deseja mesmo cancelar o agendamento?", listAppointments);
    }

    const CancelAppointments = async (listAppointments) => {
        await Api.cancelAppointments(user.idCourt, listAppointments);
        getListAppointments();
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Agendamentos</HeaderTitle>
            </HeaderArea>

            {
                loading 
                && 
                <LoadingIcon size = "large" color = "#FFF" />
            }

            <ListInfo>
                {
                    listAppointments && listAppointments.length > 0 ? 
                    (
                        <Scroller
                            refreshControl = 
                            {
                                <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh } />
                            }
                        >
                            {
                                listAppointments.map((item, key) => 
                                (
                                    <ListArea key = { key }>
                                        <InfoPlayerArea>
                                            <InfoPlayerName>{ item.jogadorNome }</InfoPlayerName>
                                        </InfoPlayerArea>

                                        <InfoServiceChooseArea>
                                            <InfoServiceArea>
                                                <InfoService>Quadra: { item.servico.tipo }</InfoService>
                                                <InfoService>R$ { item.servico.preco.toFixed(2) }</InfoService>
                                            </InfoServiceArea>

                                            <InfoDateArea>
                                                <InfoDayArea>
                                                    <InfoDateText>{ item.data }</InfoDateText>
                                                </InfoDayArea>

                                                <InfoHourArea>
                                                    <InfoDateText>{ item.hora }</InfoDateText>
                                                </InfoHourArea>
                                            </InfoDateArea>
                                        </InfoServiceChooseArea>

                                        <CancelButton onPress = { () => handleCancelAppointments(item) }> 
                                            <CancelButtonText>Cancelar</CancelButtonText>
                                        </CancelButton>

                                        <AlertCustom
                                            showAlert = { alertVisible }
                                            setShowAlert = { setAlertVisible } 
                                            alertTitle = { alertTitle }
                                            alertMessage = { alertMessage }
                                            displayNegativeButton = { true }
                                            negativeText = { "Não" }
                                            displayPositiveButton = { true }
                                            positiveText = { "Sim" }
                                            onPressPositiveButton = { () => CancelAppointments(itemCancel) }
                                        />
                                    </ListArea>
                                ))
                            }
                        </Scroller>
                    ) 
                    : 
                    (
                        <EmptyScroller
                            refreshControl = 
                            {
                                <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh } />
                            }
                        >
                            <EmptyHeader>
                                <EmptyToday>{today}</EmptyToday>
                                <EmptyTitle>Não possui nenhum agendamento!</EmptyTitle>
                            </EmptyHeader>
                        </EmptyScroller>
                    )
                }
            </ListInfo>
        </Container>
    )
}
