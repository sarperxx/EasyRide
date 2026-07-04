import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-3xl font-bold text-black">Create Account</Text>
        <Text className="text-gray-500 mt-2">
          Create a new EasyRide account
        </Text>

        {/* Auth form will be added in Week 2 with Clerk */}
        <View className="mt-10 w-full items-center">
          <Text className="text-gray-400 text-sm">
            Clerk authentication coming in Week 2
          </Text>
        </View>

        <Link
          href="/(auth)/sign-in"
          className="text-center text-gray-500 mt-10"
        >
          Already have an account?{" "}
          <Text className="text-black font-bold">Log In</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
