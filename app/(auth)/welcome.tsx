import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <View className="flex w-full flex-1 items-center justify-center px-5">
        <Text className="text-4xl font-bold text-center text-black">
          EasyRide
        </Text>
        <Text className="text-lg text-center text-gray-500 mt-3">
          Your ride, your way
        </Text>
      </View>

      <View className="w-full px-5 pb-10 gap-4">
        <TouchableOpacity
          className="w-full bg-black py-4 rounded-full"
          onPress={() => router.push("/(auth)/sign-up")}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full bg-white border border-gray-200 py-4 rounded-full"
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text className="text-black text-center font-semibold text-lg">
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
