import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black">Profil</Text>
        <Text className="text-gray-500 mt-2">Profil ekranı yakında geliyor</Text>

        <TouchableOpacity
          onPress={handleSignOut}
          className="mt-10 bg-red-500 px-10 py-4 rounded-full"
        >
          <Text className="text-white font-bold text-lg">Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
