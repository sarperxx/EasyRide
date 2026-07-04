import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-general-500">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black">Home</Text>
        <Text className="text-gray-500 mt-2">
          Map & ride UI coming in Week 3
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
