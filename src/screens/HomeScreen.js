import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons"
import { LineChart } from "react-native-chart-kit"

import Text from "../components/Text"
import { Dimensions } from "react-native"
import axios from "axios"
import moment from "moment"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useIsFocused } from "@react-navigation/native"

export default function HomeScreen({ navigation }) {
    const [xrpPrice, setXrpPrice] = useState([0, 0, 0, 0, 0, 0])
    const [user, setUser] = useState({ name: "", balance: "", transactions: [], username: "" })
    const isFocused = useIsFocused()

    useEffect(async () => {
        let results = []
        for (let i = 6; i > -1; i--) {
            let now = moment().subtract(i, 'months').subtract(1, 'days').format('DD-MM-YYYY')

            try {
                const res = await axios.get("https://api.coingecko.com/api/v3/coins/ripple/history?date=" + now, {
                    headers: {
                        "Accept": "application/json"
                    }
                })

                results.push(res.data.market_data.current_price.usd)
            }
            catch (e) {
                console.log(e)
            }
        }

        setXrpPrice(results)
    }, [])

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
                }
            }
        }
        getUserDetails()
    }, [navigation, isFocused])

    const renderPurchase = ({ item }) => (
        <Purchase>
            <PurchaseInfo>
                <Text heavy>{item.to}</Text>
                <Text bold margin="2px 0 2px 0">{moment(item.created_at).format("YYYY-MM-DD")}</Text>
            </PurchaseInfo>
            <Text heavy>{item.amount}</Text>
        </Purchase>
    )

    return (
        <Container>
            <Header>
                <ProfilePhoto source={{ uri: user.name ? `https://ui-avatars.com/api/?name=${user.name}?size=128` : "https://ui-avatars.com/api/?size=128" }} />

                <Welcome>
                    <Text heavy medium>Welcome,</Text>
                    <Text>{user.name}</Text>
                </Welcome>
                <FontAwesome5 name="cog" size={24} color="#565656" />
            </Header>

            <Text center title heavy>{user.balance} XRP</Text>
            <Text center heavy color="#727479">Current Balance</Text>

            <Chart>
                <LineChart data={{
                    labels: ["May", "June", "July", "Aug", "Sept", "Oct"],
                    datasets: [
                        {
                            data: xrpPrice
                        }
                    ]
                }} chartConfig={{
                    color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
                    labelColor: () => `rgba(255, 255, 255, 0.2)`,
                    strokeWidth: 3,
                    backgroundGradientFrom: "#1e1e1e",
                    backgroundGradientTo: "#1e1e1e",
                }} bezier width={Dimensions.get("window").width} height={250} withHorizontalLines={false} withVerticalLines={false} />
            </Chart>

            <Purchases ListHeaderComponent={
                <>
                    <TransactionHeader>
                        <Text>Last Purchases</Text>
                        <MaterialIcons name="sort" size={24} color="#5196f4" />
                    </TransactionHeader>

                    <SearchContainer>
                        <AntDesign name="search1" size={18} color="#5196f4" />
                        <Search placeholder="Search Transactions" />
                    </SearchContainer>
                </>
            } data={user.transactions} renderItem={renderPurchase} showsVerticalScrollIndicator={false} />
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #1e1e1e;
`

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 16px 16px 32px 16px;
`

const ProfilePhoto = styled.Image`
    height: 40px;
    width: 40px;
    border-radius: 50%;
`

const Welcome = styled.View`
    flex: 1
    padding: 0 16px;
`

const Purchases = styled.FlatList`
    background-color: #2c2c2c;
    padding: 16px;
`

const TransactionHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const SearchContainer = styled.View`
    background-color: #3d3d3d;
    flex-direction: row;
    padding: 0 8px;
    align-items: center;
    border-radius: 6px;
    margin: 16px 0;
`

const Search = styled.TextInput`
    flex: 1;
    padding: 8px 16px;
    color: #dbdbdb;
`

const Purchase = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #393939;
    padding-bottom: 12px;
    margin-bottom: 12px;
`

const PurchaseInfo = styled.View``

const Chart = styled.View`
    margin: 32px 0;
`