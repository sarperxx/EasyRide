import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FindRide = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black">Sürüş Bul</Text>
        <Text className="text-gray-500 mt-2">
          Harita ve arama Hafta 5'te geliyor
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default FindRide;
