import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index !== null && viewableItems[0]?.index !== undefined) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const handleNext = () => {
    if (isLastSlide) {
      router.replace("/(auth)/sign-up");
    } else {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboarding}
        renderItem={({ item }) => (
          <View className="flex items-center justify-center p-5" style={{ width: 375 }}>
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-between w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={handleNext}
        className="w-11/12 mt-10 mb-5"
      />

      <View className="flex flex-row items-center justify-center w-full gap-x-3 mb-5">
        {onboarding.map((_, index) => (
          <View
            key={index}
            className={`w-[32px] h-[4px] rounded-full ${
              activeIndex === index ? "bg-[#0286FF]" : "bg-[#E2E8F0]"
            }`}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
