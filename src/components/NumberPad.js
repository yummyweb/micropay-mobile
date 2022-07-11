import React from "react"
import styled from "styled-components"
import { MaterialIcons } from "@expo/vector-icons"

import Text from "./Text"

export default function NumberPad({ onPress }) {
    const buttons = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        <MaterialIcons name="keyboard-backspace" size={24} />
    ]
    return (
        <KeyPad>
            {buttons.map((btn, index) => {
                return (
                    <Number key={index} onPress={() => onPress(btn, index)} delayPressIn={0}>
                        <Text large heavy>{ btn }</Text>
                    </Number>
                )
            })}
        </KeyPad>
    )
}

const KeyPad = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    margin: 0 35px;
    margin-top: 10px;
`

const Number = styled.TouchableOpacity`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    margin: 5px 20px;
    border-width: 1px;
    border-color: #ffffff20;
`