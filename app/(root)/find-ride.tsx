import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FindRide = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black">Find a Ride</Text>
        <Text className="text-gray-500 mt-2">
          Search & map coming in Week 5
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default FindRide;
