import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TouchScreen from './src/screens/TouchScreen';
import HomeScreen from './src/screens/HomeScreen';
import TokensScreen from './src/screens/TokensScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import SendRequestScreen from './src/screens/SendRequestScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Feather } from "@expo/vector-icons"
import { View } from "react-native"

export default function App() {
  const AppStack = createStackNavigator()
  const TabStack = createBottomTabNavigator()

  const TabStackScreen = () => {
    return (
      <TabStack.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1e1e1e",
          borderTopColor: "#1e1e1e",
          paddingBottom: 32,
          paddingTop: 10,
          height: 90
        },
      })}>
        <TabStack.Screen name="Tokens" component={TokensScreen} options={{
          title: "My Tokens",
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome5 name="coins" size={24} style={{
                color: focused ? "#559DFF" : "#828282"
              }} />
            </View>
          )
        }} />
        <TabStack.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather name="home" size={24} style={{
                color: focused ? "#559DFF" : "#828282"
              }} />
            </View>
          )
        }} />
        <TabStack.Screen name="SendRequest" component={SendRequestScreen} options={{
          title: "Send & Request",
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather name="send" size={24} style={{
                color: focused ? "#559DFF" : "#828282"
              }} />
            </View>
          )
        }} />
      </TabStack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{
        headerShown: false
      }}>
        <AppStack.Screen name="Tabs" component={TabStackScreen} />
        <AppStack.Screen name="Touch" component={TouchScreen} />
        
        <AppStack.Screen name="CreateAccount" component={CreateAccountScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}