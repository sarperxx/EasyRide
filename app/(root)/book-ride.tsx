import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookRide = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black">Book Ride</Text>
        <Text className="text-gray-500 mt-2">
          Stripe payment coming in Week 6
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default BookRide;
