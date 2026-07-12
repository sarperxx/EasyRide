import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type IconName = "home" | "home-outline" | "car" | "car-outline" | "chatbubble" | "chatbubble-outline" | "person" | "person-outline";

const TabIcon = ({
  name,
  focused,
}: {
  name: IconName;
  focused: boolean;
}) => (
  <View
    className={`w-12 h-12 items-center justify-center rounded-full ${focused ? "bg-[#0286FF]" : ""}`}
  >
    <Ionicons
      name={name}
      size={26}
      color="white"
    />
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Ana Sayfa",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name={focused ? "home" : "home-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Sürüşlerim",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name={focused ? "car" : "car-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Mesajlar",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name={focused ? "chatbubble" : "chatbubble-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name={focused ? "person" : "person-outline"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
