import { MarkerData } from "@/types/type";

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: any[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01;
    const lngOffset = (Math.random() - 0.5) * 0.01;

    return {
      id: driver.id,
      title: `${driver.first_name} ${driver.last_name}`,
      first_name: driver.first_name,
      last_name: driver.last_name,
      profile_image_url: driver.profile_image_url,
      car_image_url: driver.car_image_url,
      car_seats: driver.car_seats,
      rating: driver.rating,
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 41.0082,
      longitude: 28.9784,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: (maxLat - minLat) * 1.5 + 0.01,
    longitudeDelta: (maxLng - minLng) * 1.5 + 0.01,
  };
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number;
  userLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
}) => {
  const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  const timesPromises = markers.map(async (marker) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${marker.latitude},${marker.longitude}&destinations=${userLatitude},${userLongitude}|${destinationLatitude},${destinationLongitude}&key=${key}`
    );
    const data = await res.json();

    const toUser = data.rows[0]?.elements[0]?.duration?.value ?? 0;
    const toDestination = data.rows[0]?.elements[1]?.duration?.value ?? 0;

    const totalMinutes = Math.round((toUser + toDestination) / 60);
    const price = ((toUser + toDestination) / 60 * 2).toFixed(2);

    return { ...marker, time: totalMinutes, price };
  });

  return Promise.all(timesPromises);
};
