import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GoogleInputProps } from "@/types/type";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState(initialLocation ?? "");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const fetchSuggestions = async (text: string) => {
    setQuery(text);
    if (text.length < 3) { setSuggestions([]); return; }

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&key=${GOOGLE_API_KEY}&language=tr`
      );
      const data = await res.json();
      setSuggestions(data.predictions ?? []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelect = async (placeId: string, description: string) => {
    setSuggestions([]);
    setQuery(description);

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();
      const location = data.result?.geometry?.location;
      if (location) {
        handlePress({
          latitude: location.lat,
          longitude: location.lng,
          address: description,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View className={`relative z-50 ${containerStyle}`}>
      <View
        className="flex flex-row items-center rounded-full px-4 py-3"
        style={{ backgroundColor: textInputBackgroundColor ?? "white" }}
      >
        <Ionicons name={(icon as any) ?? "search"} size={20} color="#aaa" />
        <TextInput
          value={query}
          onChangeText={fetchSuggestions}
          placeholder="Konum ara..."
          placeholderTextColor="#aaa"
          className="flex-1 ml-3 text-base text-black"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(""); setSuggestions([]); }}>
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {suggestions.length > 0 && (
        <View className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-lg z-50 overflow-hidden">
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item.place_id, item.description)}
                className="flex flex-row items-center px-4 py-3 border-b border-gray-100"
              >
                <Ionicons name="location-outline" size={16} color="#0286FF" />
                <Text className="ml-3 text-sm text-gray-700 flex-1" numberOfLines={2}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
};

export default GoogleTextInput;
