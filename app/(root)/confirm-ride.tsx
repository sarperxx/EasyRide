import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Map from "@/components/Map";
import CustomButton from "@/components/CustomButton";
import { useDriverStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";

const ConfirmRide = () => {
  const { destinationLatitude, destinationLongitude } = useLocationStore();
  const { drivers, setSelectedDriver, selectedDriver } = useDriverStore();
  const [driversWithTimes, setDriversWithTimes] = useState<MarkerData[]>([]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Başlık */}
      <View className="flex flex-row items-center px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaBold">Sürücü Seç</Text>
      </View>

      {/* Harita */}
      <View className="h-[300px] mx-5 mt-4 rounded-2xl overflow-hidden">
        <Map
          destinationLatitude={destinationLatitude ?? undefined}
          destinationLongitude={destinationLongitude ?? undefined}
          onDriverTimesCalculated={setDriversWithTimes}
          selectedDriver={selectedDriver}
        />
      </View>

      {/* Sürücü Listesi */}
      <FlatList
        data={driversWithTimes.length > 0 ? driversWithTimes : drivers}
        keyExtractor={(item) => item.id.toString()}
        className="px-5 mt-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDriver(item.id)}
            className={`flex flex-row items-center p-4 rounded-2xl mb-3 border-2 ${
              selectedDriver === item.id
                ? "border-[#0286FF] bg-blue-50"
                : "border-gray-100 bg-white"
            }`}
          >
            <Image
              source={{ uri: item.car_image_url }}
              className="w-20 h-14 rounded-xl"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4">
              <Text className="font-JakartaBold text-base">
                {item.first_name} {item.last_name}
              </Text>
              <View className="flex flex-row items-center gap-3 mt-1">
                <View className="flex flex-row items-center gap-1">
                  <Ionicons name="star" size={13} color="#FFD700" />
                  <Text className="text-xs text-gray-500">{item.rating}</Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Ionicons name="people" size={13} color="#aaa" />
                  <Text className="text-xs text-gray-500">{item.car_seats} koltuk</Text>
                </View>
                {item.time && (
                  <View className="flex flex-row items-center gap-1">
                    <Ionicons name="time-outline" size={13} color="#aaa" />
                    <Text className="text-xs text-gray-500">{item.time} dk</Text>
                  </View>
                )}
              </View>
            </View>
            {item.price && (
              <Text className="font-JakartaBold text-[#0286FF]">
                ₺{item.price}
              </Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-5">
            <Text className="text-gray-400">Yakında sürücü aranıyor...</Text>
          </View>
        )}
      />

      {/* Onayla Butonu */}
      {selectedDriver && (
        <View className="absolute bottom-5 left-5 right-5">
          <CustomButton
            title="Rezervasyonu Onayla"
            onPress={() => router.push("/(root)/book-ride")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ConfirmRide;
