export const images = {
  onboarding1: require("@/assets/images/onboarding1.png"),
  onboarding2: require("@/assets/images/onboarding2.png"),
  onboarding3: require("@/assets/images/onboarding3.png"),
  getStarted: require("@/assets/images/get-started.png"),
  signUpCar: require("@/assets/images/sign-up-car.png"),
  successBg: require("@/assets/images/success-bg.png"),
  noResult: require("@/assets/images/no-result.png"),
  message: require("@/assets/images/message.png"),
};

export const icons = {
  arrowDown: require("@/assets/icons/arrow-down.png"),
  arrowUp: require("@/assets/icons/arrow-up.png"),
  backArrow: require("@/assets/icons/back-arrow.png"),
  chat: require("@/assets/icons/chat.png"),
  checkmark: require("@/assets/icons/check.png"),
  close: require("@/assets/icons/close.png"),
  dollar: require("@/assets/icons/dollar.png"),
  email: require("@/assets/icons/email.png"),
  eyecross: require("@/assets/icons/eyecross.png"),
  google: require("@/assets/icons/google.png"),
  home: require("@/assets/icons/home.png"),
  homeAddress: require("@/assets/icons/home-address.png"),
  list: require("@/assets/icons/list.png"),
  lock: require("@/assets/icons/lock.png"),
  map: require("@/assets/icons/map.png"),
  marker: require("@/assets/icons/marker.png"),
  out: require("@/assets/icons/out.png"),
  person: require("@/assets/icons/person.png"),
  pin: require("@/assets/icons/pin.png"),
  point: require("@/assets/icons/point.png"),
  profile: require("@/assets/icons/profile.png"),
  search: require("@/assets/icons/search.png"),
  selectedMarker: require("@/assets/icons/selected-marker.png"),
  star: require("@/assets/icons/star.png"),
  target: require("@/assets/icons/target.png"),
  to: require("@/assets/icons/to.png"),
};

export const onboarding = [
  {
    id: 1,
    title: "Mükemmel yolculuk bir dokunuşla!",
    description:
      "Yolculuğun EasyRide ile başlıyor. İdeal aracını kolayca bul.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "En iyi araç EasyRide ile yanında",
    description:
      "EasyRide ile mükemmel yolculuğunu bulmanın kolaylığını keşfet.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Senin yolculuğun, senin tarzın!",
    description:
      "Hedefini gir, yerine otur, gerisini biz halledelim.",
    image: images.onboarding3,
  },
];

export const data = {
  recentRides: [
    {
      ride_id: "1",
      origin_address: "Simone Weil Ave, Mulhouse, France",
      destination_address: "Nouveau Bassin, Mulhouse, France",
      origin_latitude: "47.70169",
      origin_longitude: "7.34954",
      destination_latitude: "47.68345",
      destination_longitude: "7.30234",
      ride_time: 28,
      fare_price: "19.90",
      payment_status: "paid",
      driver_id: 2,
      user_id: "1",
      created_at: "2024-08-12 05:19:20.620007",
      driver: {
        driver_id: "2",
        first_name: "David",
        last_name: "Brown",
        profile_image_url:
          "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        car_image_url:
          "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        car_seats: 5,
        rating: "4.80",
      },
    },
  ],
};
