import React, { useState, useEffect, useContext } from 'react';
import CheckBox from '@react-native-community/checkbox';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

import AlertCustom from '../../components/AlertCustom';

import {
    Container,
    BackButton,

    HeaderArea,
    HeaderTitle,

    DateArea,
    DateInfo,
    DatePrevArea,
    DataNextArea,

    DateTitleArea,
    DateTitle,

    DateList,

    DateItem,
    DateItemWeekDay,
    DateItemNumber,

    RenderListItem,

    TimeArea,
    TimeItem,
    TimeText,

    CheckItem,

    ButtonArea,
    FinishButton,
    FinishButtonText,
} from './styles';

import BackIcon from '../../assets/Images/back.svg';
import NavPrevIcon from '../../assets/Images/nav_prev.svg';
import NavNextIcon from '../../assets/Images/nav_next.svg';

import Api from '../../Api';

import Colors from '../../assets/Themes/Colors';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const HoursDate = require('../../Hours.json');

export default () => {
    const navigation = useNavigation();

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);

    const [listPeriod, setListPeriod] = useState([]);

    const [data, setData] = useState([]);
    const [listDays, setListDays] = useState([]);

    const [selectedHour, setSelectedHour] = useState([]);

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const setAlert = (visible = false, title = '', message = '') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    const { state: user } = useContext(UserContext);

    useEffect(() => {
        let unsub = Api.onPeriod(user.idCourt, setListPeriod);
        return unsub;
    }, [])

    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
    }, [])

    useEffect(() => {
        if (listPeriod) 
        {
            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            let newListDays = [];

            for (let i = 1; i <= daysInMonth; i++) 
            {
                let d = new Date(selectedYear, selectedMonth, i);
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let day = d.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                let selDate = `${day}/${month}/${year}`;

                let availability = listPeriod.filter((e) => e.data === selDate);

                newListDays.push({
                    status: availability.length > 0 ? false : true,
                    weekday: days[d.getDay()],
                    number: i,
                });
            }
            setListDays(newListDays);
            setSelectedDay(0);
            setData([]);
        }
    }, [listPeriod, selectedMonth, selectedYear]);

    useEffect(() => {
        const verifyDate = async () => {
            if (selectedDay > 0) 
            {
                let verifyDatePeriod = await Api.verifyDatePeriod(selectedDay, selectedMonth, selectedYear);
                if (verifyDatePeriod) 
                {
                    setData(HoursDate);
                } 
                else 
                {
                    setAlert(true, 'Erro ao criar o período:', 'Não é possível criar o período em uma data passada!');
                    setData([]);
                }
                setSelectedHour([]);
            }
        }
        verifyDate();
    }, [selectedDay]);

    useEffect(() => {
        const verifyHour = async () => {
            if (selectedDay > 0 && selectedHour.length > 0) 
            {
                let result = await Api.verifyHourPeriod(selectedDay, selectedMonth, selectedYear, selectedHour);
                if (result)
                {
                    setAlert(true, 'Aviso:', 'O registro pode ser efetuado!');
                } 
                else
                {
                    setAlert(true, 'Erro ao criar o período:', 'Não é possível registrar o período em uma data passada!');
                    setSelectedHour([]);
                }
            }
        }
        verifyHour();
    }, [selectedDay, selectedHour]);

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const onChangeValue = (itemSelected, index) => {
        const newData = data.map((item) => {
            if (item.id === itemSelected.id) 
            {
                return {
                    ...item,
                    selected: !item.selected,
                }
            }
            return {
                ...item,
                selected: item.selected,
            }
        })
        setData(newData);
    }

    const renderItem = ({ item, index }) => {
        return (
            <TimeItem>
                <TimeText>{ item.hour }</TimeText>
                <CheckItem>
                    <CheckBox
                        disabled = { false }
                        onAnimationType = "fill"
                        offAnimationType = "fade"
                        boxType = "square"
                        value = { item.selected }
                        onChange = { () => onChangeValue(item, index) }
                    />
                </CheckItem>
            </TimeItem>
        )
    }

    const handleConfirmSelectClick = async () => {
        const listSelect = data.filter((item) => item.selected === true);
        let list = [];
        listSelect.forEach((item) => {
            list.push(item.hour);
        });
        setSelectedHour(list);
    }

    const handleRegisterPeriodClick = async () => {
        if (selectedDay != '' && selectedMonth != '' && selectedYear != '' && selectedHour != '') 
        {
            await Api.setPeriod(user.idCourt, selectedDay, selectedMonth, selectedYear, selectedHour);
            setAlert(true, 'Aviso:', 'O registro foi efetuado com sucesso!');
            setSelectedDay(0);
            setSelectedHour([]);
        } 
        else 
        {
            setAlert(true, 'Atenção:', 'Selecione uma hora!');
        }
    }

    return (
        <Container>
            <BackButton onPress = { handleBackButtonClick }>
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>

            <HeaderArea>
                <HeaderTitle>Período de Funcionamento</HeaderTitle>
            </HeaderArea>

            <DateArea>
                <DateInfo>
                    <DatePrevArea onPress = { handleLeftDateClick }>
                        <NavPrevIcon width = "35" height = "35" fill = "#000" />
                    </DatePrevArea>

                    <DateTitleArea>
                        <DateTitle>{ months[selectedMonth] } { selectedYear }</DateTitle>
                    </DateTitleArea>

                    <DataNextArea onPress = { handleRightDateClick }>
                        <NavNextIcon width = "35" height = "35" fill = "#000" />
                    </DataNextArea>
                </DateInfo>

                <DateList
                    horizontal = { true }
                    showsHorizontalScrollIndicator = { false }
                >
                    {
                        listDays.map((item, key) => 
                        (
                            <DateItem
                                key = { key }
                                onPress = { () => item.status ? setSelectedDay(item.number) : null }
                                style = {{
                                    opacity: item.status ? 1 : 0.5,
                                    backgroundColor: item.number === selectedDay ? Colors.primary : '#FFF',
                                }}
                            >
                                <DateItemWeekDay
                                    style = {{
                                        color: item.number === selectedDay ? '#FFF' : '#000',
                                    }}
                                >
                                    { item.weekday }
                                </DateItemWeekDay>

                                <DateItemNumber
                                    style={{
                                        color: item.number === selectedDay ? '#FFF': '#000',
                                    }}
                                >
                                    { item.number }
                                </DateItemNumber>
                            </DateItem>
                        ))
                    }
                </DateList>
            </DateArea>

            {
                selectedDay > 0 && data.length > 0 && 
                (
                    <RenderListItem>
                        <TimeArea
                            data = { data }
                            renderItem = { renderItem }
                            keyExtractor = { (item) => `key - ${ item.id }` }
                            numColumns = { 2 }
                        />

                        <ButtonArea>
                            <FinishButton onPress = { handleConfirmSelectClick }>
                                <FinishButtonText>Confirmar Seleção</FinishButtonText>
                            </FinishButton>

                            <FinishButton onPress = { handleRegisterPeriodClick }>
                                <FinishButtonText>Registrar Período</FinishButtonText>
                            </FinishButton>
                        </ButtonArea>
                    </RenderListItem>
                )}
            <AlertCustom
                showAlert = { alertVisible }
                setShowAlert = { setAlertVisible } 
                alertTitle = { alertTitle }
                alertMessage = { alertMessage }
                displayNegativeButton = { true }
                negativeText = { "OK" }
            />
        </Container>
    )
}
