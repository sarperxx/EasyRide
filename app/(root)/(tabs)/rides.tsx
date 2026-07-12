import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rides = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black">Sürüşlerim</Text>
        <Text className="text-gray-500 mt-2">Sürüş geçmişin</Text>
      </View>
    </SafeAreaView>
  );
};

export default Rides;
