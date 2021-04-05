import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SCProfile from '../screens/SCProfile';
import Appointments from '../screens/Appointments';
import OperationWindow from '../screens/OperationWindow';
import ADMProfile from '../screens/ADMProfile';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator tabBar = { props => < CustomTabBar {...props} /> } >
        <Tab.Screen name = "Appointments" component = { Appointments } />
        <Tab.Screen name = "OperationWindow" component = { OperationWindow } />
        <Tab.Screen name = "SCProfile" component = { SCProfile } />
        <Tab.Screen name = "ADMProfile" component = { ADMProfile } />
    </Tab.Navigator>
);