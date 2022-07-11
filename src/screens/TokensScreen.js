import React, { useEffect } from "react"
import styled from "styled-components"
import { Fontisto, MaterialIcons } from "@expo/vector-icons"

import Text from "../components/Text"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function TokensScreen({ navigation }) {
    const isFocused = useIsFocused()

    useEffect(() => {
        const getTokens = async () => {
            const token = await AsyncStorage.getItem("token")

            if (token) {
                const res = await axios.get("http://localhost:8800/api/user/tokens", {
                    headers: {
                        "X-Auth-Token": token
                    }
                })

                console.log(res.data)
            }
        }

        getTokens()
    }, [navigation, isFocused])
    return (
        <Container>
            <Text center large heavy margin="16px 0 0 0">My Tokens</Text>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #1e1e1e;
`