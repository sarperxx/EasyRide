import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { data } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const Home = () => {
  const { user } = useUser();
  const loading = false;

  useEffect(() => {
    if (!user) return;
    fetchAPI("/(api)/user", {
      method: "POST",
      body: JSON.stringify({
        name: user.fullName ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        clerkId: user.id,
      }),
    }).catch(() => {});
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-general-500">
      <FlatList
        data={data.recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={require("@/assets/images/no-result.png")}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
                <Text className="text-sm text-center">
                  Henüz sürüş bulunamadı
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            {/* Başlık */}
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Merhaba, {user?.firstName ?? user?.emailAddresses[0].emailAddress.split("@")[0]} 👋
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(root)/(tabs)/profile")}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Ionicons name="person" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Arama Kutusu */}
            <TouchableOpacity
              onPress={() => router.push("/(root)/find-ride")}
              className="flex flex-row items-center bg-white rounded-full shadow-md shadow-neutral-300 px-4 py-3 mb-5"
            >
              <Ionicons name="search" size={20} color="#aaa" />
              <Text className="ml-3 text-gray-400 text-base">
                Nereye gitmek istiyorsun?
              </Text>
            </TouchableOpacity>

            {/* Harita Alanı */}
            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-xl font-JakartaBold">Güncel Konum</Text>
              <TouchableOpacity onPress={() => router.push("/(root)/find-ride")}>
                <Text className="text-[#0286FF]">Sürüş Bul</Text>
              </TouchableOpacity>
            </View>

            <View className="rounded-2xl overflow-hidden h-[220px] mb-5">
              <Map />
            </View>

            {/* Son Sürüşler */}
            <Text className="text-xl font-JakartaBold mb-3">
              Son Sürüşler
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
