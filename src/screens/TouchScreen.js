import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Fontisto, MaterialIcons } from "@expo/vector-icons"

import Text from "../components/Text"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TouchScreen({ navigation }) {
    const [loggedIn, setLoggedIn] = useState(null)

    useEffect(async () => {
        try {
            const value = await AsyncStorage.getItem('logged-in');
            setLoggedIn(value)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <Container>
            <Text center heavy title color="#964ff0" margin="32px 0 0 0">micropay</Text>
            <Touch disabled={loggedIn !== "true"} onLongPress={() => navigation.navigate("Tabs")} delayPressIn={0}>
                <Circle bgColor="#1e1e1e">
                    <Circle bgColor={loggedIn ? "#5196F405" : "#4e4e4ed9"}>
                        <Circle bgColor={loggedIn ? "#5196F410" : "#5a5a5ad9" }>
                            <Circle bgColor={loggedIn ? "#5196F430" : "#646464d9"}>
                                <TouchButton disabled={!loggedIn} bgColor={loggedIn ? "#5196F4" : "#3e3e3e" } onLongPress={() => navigation.navigate("Tabs")} delayPressIn={0}>
                                    <MaterialIcons name="fingerprint" size={64} color="white" />
                                </TouchButton>
                            </Circle>
                        </Circle>
                    </Circle>
                </Circle>
            </Touch>

            <Text center large heavy>
                Please verify your identity{"\n"} using Touch ID
            </Text>

            <PinAccess onPress={() => navigation.navigate("CreateAccount")}>
                <Fontisto name="person" size={16} color="#964ff0" />
                <Text bold color="#964ff0" margin="0 0 0 8px">Create an Account</Text>
            </PinAccess>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #1e1e1e;
`

const Touch = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const Circle = styled.View`
    background-color: ${props => props.bgColor};
    padding: 32px;
    border-radius: 999px;
`

const TouchButton = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 100px;
`

const PinAccess = styled.TouchableOpacity`
    margin-top: 16px;
    padding: 16px;
    flex-direction: row;
    justify-content: center;
`