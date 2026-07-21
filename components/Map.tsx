import { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useLocationStore, useDriverStore } from "@/store";
import { calculateRegion, generateMarkersFromData, calculateDriverTimes } from "@/lib/map";
import { MarkerData, MapProps } from "@/types/type";

const Map = ({ destinationLatitude, destinationLongitude, onDriverTimesCalculated, selectedDriver }: MapProps) => {
  const { userLatitude, userLongitude, setUserLocation } = useLocationStore();
  const { setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);

  // Kullanıcı konumunu al
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0]?.street ?? ""}, ${address[0]?.city ?? ""}`,
      });
    })();
  }, []);

  // Sürücüleri yükle
  useEffect(() => {
    if (!userLatitude || !userLongitude) return;

    fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/driver`)
      .then((r) => r.json())
      .then(async ({ data }) => {
        const markers = generateMarkersFromData({ data, userLatitude, userLongitude });
        setMarkers(markers);
        setDrivers(markers);

        if (destinationLatitude && destinationLongitude && onDriverTimesCalculated) {
          const withTimes = await calculateDriverTimes({
            markers,
            userLatitude,
            userLongitude,
            destinationLatitude,
            destinationLongitude,
          });
          onDriverTimesCalculated(withTimes);
        }
      })
      .catch(console.error);
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  // Yol tarifi çiz
  useEffect(() => {
    if (!userLatitude || !userLongitude || !destinationLatitude || !destinationLongitude) return;

    const origin = `${userLatitude},${userLongitude}`;
    const destination = `${destinationLatitude},${destinationLongitude}`;
    const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.routes?.length) {
          const points = decodePolyline(data.routes[0].overview_polyline.points);
          setRouteCoords(points);
        }
      })
      .catch(console.error);
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  const defaultRegion = {
    latitude: 41.0082,
    longitude: 28.9784,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const region = (userLatitude && userLongitude)
    ? calculateRegion({ userLatitude, userLongitude, destinationLatitude, destinationLongitude })
    : defaultRegion;

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ width: "100%", height: "100%" }}
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation
      showsMyLocationButton
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={`${marker.first_name} ${marker.last_name}`}
          description={`${marker.car_seats} koltuk • ⭐ ${marker.rating}`}
          pinColor={selectedDriver === marker.id ? "#0286FF" : "#FF6B6B"}
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <Marker
          coordinate={{ latitude: destinationLatitude, longitude: destinationLongitude }}
          title="Varış Noktası"
          pinColor="#00C853"
        />
      )}

      {routeCoords.length > 0 && (
        <Polyline
          coordinates={routeCoords}
          strokeColor="#0286FF"
          strokeWidth={3}
        />
      )}
    </MapView>
  );
};

// Google Polyline decoder
function decodePolyline(encoded: string) {
  const points: { latitude: number; longitude: number }[] = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;
    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return points;
}

export default Map;
