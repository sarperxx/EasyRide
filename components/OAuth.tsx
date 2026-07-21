import { useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { user } = useUser();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive, createdUserId } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(root)/(tabs)/home", {
          scheme: "easyride",
        }),
      });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });

        // Kullanıcıyı NeonDB'ye kaydet
        if (createdUserId) {
          await fetchAPI(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/user`, {
            method: "POST",
            body: JSON.stringify({
              name: user?.fullName ?? user?.emailAddresses[0].emailAddress.split("@")[0],
              email: user?.emailAddresses[0].emailAddress,
              clerkId: createdUserId,
            }),
          });
        }

        router.replace("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error:", err);
      Alert.alert("Hata", "Google ile giriş başarısız. Tekrar deneyin.");
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">veya</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Google ile Giriş Yap"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
