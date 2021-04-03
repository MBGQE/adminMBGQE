import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SignUp2 from '../screens/SignUp2';
import CreateSC from '../screens/CreateSC';
import Services from '../screens/Services';
import ServiceUpdate from '../screens/ServiceUpdate';
import SCAddressUpdate from '../screens/SCAddressUpdate';
import SCPhoneUpdate from '../screens/SCPhoneUpdate';
import ADMAddressUpdate from '../screens/ADMAddressUpdate';
import ADMPhoneUpdate from '../screens/ADMPhoneUpdate';
import PeriodUpdate from '../screens/PeriodUpdate';
import MainTab from '../stacks/MainTab';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name = "Preload" component = { Preload } />
        <Stack.Screen name = "SignIn" component = { SignIn } />
        <Stack.Screen name = "SignUp" component = { SignUp } />
        <Stack.Screen name = "SignUp2" component = { SignUp2 } />
        <Stack.Screen name = "CreateSC" component = { CreateSC } />
        <Stack.Screen name = "MainTab" component = { MainTab } />
        <Stack.Screen name = "Services" component = { Services } />
        <Stack.Screen name = "ServiceUpdate" component = { ServiceUpdate } />
        <Stack.Screen name = "SCAddressUpdate" component = { SCAddressUpdate } />
        <Stack.Screen name = "SCPhoneUpdate" component = { SCPhoneUpdate } />
        <Stack.Screen name = "ADMAddressUpdate" component = { ADMAddressUpdate } />
        <Stack.Screen name = "ADMPhoneUpdate" component = { ADMPhoneUpdate } />
        <Stack.Screen name = "PeriodUpdate" component = { PeriodUpdate } />

    </Stack.Navigator>
);