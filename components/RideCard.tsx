import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

const RideCard = ({ ride }: { ride: any }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-2xl shadow-sm shadow-neutral-300 mb-3 p-4">
      {/* Sürücü Fotoğrafı */}
      <View className="w-[70px] h-[70px] rounded-full overflow-hidden mr-4 bg-gray-100 items-center justify-center">
        {ride.driver?.profile_image_url ? (
          <Image
            source={{ uri: ride.driver.profile_image_url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="person" size={32} color="#aaa" />
        )}
      </View>

      {/* Bilgiler */}
      <View className="flex-1">
        {/* Rota */}
        <View className="flex flex-row items-center gap-2 mb-1">
          <Ionicons name="radio-button-on" size={14} color="#0286FF" />
          <Text className="text-sm font-JakartaMedium flex-1" numberOfLines={1}>
            {ride.origin_address}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-2 mb-2">
          <Ionicons name="location" size={14} color="#FF4C4C" />
          <Text className="text-sm font-JakartaMedium flex-1" numberOfLines={1}>
            {ride.destination_address}
          </Text>
        </View>

        {/* Alt Bilgiler */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center bg-general-600 px-2 py-1 rounded-full">
            <Text className="text-xs text-[#0286FF] font-JakartaBold">
              {ride.fare_price ? `₺${ride.fare_price}` : "—"}
            </Text>
          </View>

          <View className="flex flex-row items-center gap-1">
            <Ionicons name="time-outline" size={12} color="#aaa" />
            <Text className="text-xs text-gray-400">{ride.ride_time} dk</Text>
          </View>

          <View
            className={`px-2 py-1 rounded-full ${
              ride.payment_status === "paid"
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            <Text
              className={`text-xs font-JakartaBold ${
                ride.payment_status === "paid"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {ride.payment_status === "paid" ? "Ödendi" : "Bekliyor"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
