import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GoogleTextInput from "@/components/GoogleTextInput";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Başlık */}
      <View className="flex flex-row items-center px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaBold">Sürüş Bul</Text>
      </View>

      <View className="flex flex-col px-5 mt-5 gap-y-4">
        {/* Başlangıç Noktası */}
        <View>
          <Text className="text-sm font-JakartaMedium text-gray-500 mb-2">
            Nereden
          </Text>
          <GoogleTextInput
            icon="radio-button-on"
            initialLocation={userAddress ?? ""}
            containerStyle="bg-gray-50"
            textInputBackgroundColor="#F7F8FA"
            handlePress={(location) =>
              setUserLocation({
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address,
              })
            }
          />
        </View>

        {/* Varış Noktası */}
        <View>
          <Text className="text-sm font-JakartaMedium text-gray-500 mb-2">
            Nereye
          </Text>
          <GoogleTextInput
            icon="location"
            initialLocation={destinationAddress ?? ""}
            containerStyle="bg-gray-50"
            textInputBackgroundColor="#F7F8FA"
            handlePress={(location) =>
              setDestinationLocation({
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address,
              })
            }
          />
        </View>

        {/* Sürücü Seç Butonu */}
        <TouchableOpacity
          className={`mt-4 rounded-full py-4 items-center ${
            userAddress && destinationAddress ? "bg-[#0286FF]" : "bg-gray-300"
          }`}
          disabled={!userAddress || !destinationAddress}
          onPress={() => router.push("/(root)/confirm-ride")}
        >
          <Text className="text-white font-JakartaBold text-lg">
            Sürücü Seç
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FindRide;
