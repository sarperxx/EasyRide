import { useUser } from "@clerk/clerk-expo";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "@/components/RideCard";
import { data } from "@/constants";

const Rides = () => {
  const { user } = useUser();
  const loading = false;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={data.recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center mt-20">
            {!loading ? (
              <>
                <Image
                  source={require("@/assets/images/no-result.png")}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
                <Text className="text-base text-center text-gray-500 mt-3">
                  Henüz sürüşünüz bulunmuyor
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <Text className="text-2xl font-JakartaBold my-5">
            Sürüş Geçmişim
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Rides;
