import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Fontisto, MaterialIcons } from "@expo/vector-icons"

import NumberPad from "../components/NumberPad"
import Text from "../components/Text"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TouchableOpacity } from "react-native"
import { useIsFocused } from "@react-navigation/native"

export default function SendRequestScreen({ navigation }) {
    const [amount, setAmount] = useState("0")
    const [to, setTo] = useState({ name: "", username: "" })
    const [displayName, setDisplayName] = useState("")
    const [displayUsername, setDisplayUsername] = useState("")
    const [success, setSuccess] = useState(false)
    const [editable, setEditable] = useState(false)
    const [user, setUser] = useState({ name: "", balance: "", transactions: [], username: "" })

    const isFocused = useIsFocused()

    const convertToDollars = currentAmount => {
        const newAmount = currentAmount / 100

        return newAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })
    }

    const pressKey = (number, index) => {
        setAmount(prev => {
            return index !== 10 ? prev + number : prev.slice(0, prev.length - 1)
        })
    }

    const editName = () => {
        setEditable(true)
    }

    const saveName = async () => {
        const res = await axios.post("http://localhost:8800/api/user/find", {
            usernameOrAddress: to.username,
        })

        setEditable(false)
        setDisplayName(res.data.name)
        setDisplayUsername(res.data.username)
    }

    const sendPayment = async () => {
        setSuccess(false)
        const token = await AsyncStorage.getItem("token")

        if (token) {
            const res = await axios.post("http://localhost:8800/api/transaction/create", {
                to: displayUsername,
                amount: parseInt(amount.substring(1)) / 100
            }, {
                headers: {
                    "X-Auth-Token": token
                }
            })

            if (res.data.status === "success") {
                setSuccess(true)
                setAmount("0")
            }
        }
    }

    const setUserToSend = async text => {
        setTo({ name: text, username: text })
    }

    useEffect(() => {
        const getUserDetails = async () => {
            if (isFocused) {
                const token = await AsyncStorage.getItem("token")
                if (token) {
                    const res = await axios.get("http://localhost:8800/api/user/details", {
                        headers: {
                            "X-Auth-Token": token
                        }
                    })
                    setUser(res.data)
                    setDisplayName(res.data.name)
                    setDisplayUsername(res.data.username)
                }
            }
        }
        getUserDetails()
    }, [navigation, isFocused])

    return (
        <Container>
            <Text center large heavy margin="16px 0 0 0">Send</Text>

            <Amount>
                <Text title heavy>{convertToDollars(amount)}</Text>
                <Text bold color="#727479">Choose amount to send</Text>
            </Amount>

            <User>
                <ProfilePhoto source={{ uri: user.name ? `https://ui-avatars.com/api/?name=${displayName}?size=128` : "https://ui-avatars.com/api/?size=128" }} />
                <UserDetails>
                    {editable ? (
                        <EditName value={to} onChangeText={text => setUserToSend(text)} placeholderTextColor="#dbdbdb" placeholder="Enter username or address" />
                    ) : (
                        <>
                            <Text medium heavy>{ displayName }</Text>
                            <Text bold color="#727479">{ displayUsername }</Text>
                        </>
                    )}
                </UserDetails>
                <TouchableOpacity onPress={editable ? saveName : editName}>
                    <MaterialIcons name={editable ? "check" : "edit"} size={16} color="#ffffff" />
                </TouchableOpacity>
            </User>

            <Send onPress={sendPayment}>
                <Text medium heavy>Send {convertToDollars(amount)} to { displayName }</Text>
            </Send>
            
            <Text center medium color="#27bf0c">{ success && "Hooray! Your transaction was successful." }</Text>

            <NumberPad onPress={pressKey} />
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #1e1e1e;
`

const Amount = styled.View`
    margin-top: 64px;
    align-items: center;
`

const User = styled.View`
    margin: 32px 16px;
    flex-direction: row;
    align-items: center;
`

const ProfilePhoto = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 50%;
`

const UserDetails = styled.View`
    flex: 1;
    margin: 0 16px;
`

const Send = styled.TouchableOpacity`
    margin: 16px;
    background-color: #5196f4;
    padding: 16px 32px;
    border-radius: 12px;
    align-items: center;
`

const EditName = styled.TextInput`
    flex: 1;
    padding: 8px 16px;
    color: #dbdbdb;
`