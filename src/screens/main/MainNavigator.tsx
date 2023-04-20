import React, { useContext } from "react";

import TabAccountImage from "@images/svg/TabAccountImage";
import TabClassImage from "@images/svg/TabClassImage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountScreen } from "@screens/main/Account/AccountScreen";
import { HomeScreen } from "@screens/main/Home/HomeScreen";
import { ThemeContext } from "@src/styles/theme";

export type MainTabParamList = {
  home: undefined;
  account: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        activeTintColor: theme.primary,
        inactiveTintColor: theme.hintText,
        tabStyle: {
          paddingBottom: 12,
          paddingTop: 8,
        },
        style: {
          height: 50,
        },
      }}>
      <Tab.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (focused ? <TabClassImage /> : <TabClassImage />),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (focused ? <TabAccountImage /> : <TabAccountImage />),
        }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
