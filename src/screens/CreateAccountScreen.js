import React, { useState } from "react"
import styled from "styled-components"
import AsyncStorage from '@react-native-async-storage/async-storage'

import Text from "../components/Text"
import axios from "axios"

export default function CreateAccountScreen({ navigation }) {
    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const createAccount = async () => {
        try {
            const res = await axios.post("http://localhost:8800/api/register", {
                name,
                username,
                password
            })

            if (res.data.token !== null) {
                AsyncStorage.setItem("logged-in", "true")
                AsyncStorage.setItem("token", res.data.token)
                navigation.navigate("Touch")
            }
            else {
                console.log("error, not work")
                console.log(res.data.token)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <Text center large heavy margin="16px 0 0 0">Create an Account</Text>
            <Form>
                <InputContainer>
                    <NameInput value={name} onChangeText={text => setName(text)} placeholder="Enter your name" placeholderTextColor="#dbdbdb"  />
                </InputContainer>
                <InputContainer>
                    <UsernameInput value={username} onChangeText={text => setUsername(text)} placeholder="Enter your username" placeholderTextColor="#dbdbdb"  />
                </InputContainer>
                <InputContainer>
                    <PasswordInput value={password} onChangeText={text => setPassword(text)} placeholder="Enter your password" placeholderTextColor="#dbdbdb"  />
                </InputContainer>
                <SubmitButton onPress={createAccount}>
                    <Text bold color="#ffff">Create Account</Text>
                </SubmitButton>
            </Form>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #1e1e1e;
`

const Form = styled.View`
    padding: 16px;
    margin-top: 10px;
`

const InputContainer = styled.View`
    background-color: #3d3d3d;
    flex-direction: row;
    align-items: center;
    border-radius: 6px;
    padding: 5px 0;
    margin: 16px 0;
`

const NameInput = styled.TextInput`
    flex: 1;
    padding: 8px 16px;
    color: #dbdbdb;
`

const UsernameInput = styled.TextInput`
    flex: 1;
    padding: 8px 16px;
    color: #dbdbdb;
`

const PasswordInput = styled.TextInput`
    flex: 1;
    padding: 8px 16px;
    color: #dbdbdb;
`

const SubmitButton = styled.TouchableOpacity`
    margin-top: 20px;
    padding: 16px 32px;
    width: 100%;
    background-color: #964ff0;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    flex-direction: row;
    color: #dbdbdb;
`