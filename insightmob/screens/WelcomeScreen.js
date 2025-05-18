import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Antonio_400Regular,
} from "@expo-google-fonts/antonio";
import { Michroma_400Regular } from "@expo-google-fonts/michroma";
import { Rajdhani_400Regular } from "@expo-google-fonts/rajdhani";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const [slid, setSlid] = useState(false);

  let [fontsLoaded] = useFonts({
    Antonio_400Regular,
    Michroma_400Regular,
    Rajdhani_400Regular,
  });

  // RESETA o slider quando a tela ganha foco novamente
  useFocusEffect(
    useCallback(() => {
      setSlid(false);
      pan.setValue({ x: 0, y: 0 });
    }, [])
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > width * 0.5) {
          Animated.timing(pan.x, {
            toValue: width - 80,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setSlid(true);
            navigation.navigate("Login");
          });
        } else {
          Animated.spring(pan.x, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  if (!fontsLoaded) return null;

  return (
    <LinearGradient colors={["#0A1F44", "#3D3D3D"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../assets/InsightMob (1).png")}
          style={styles.logo}
        />
        <View style={styles.sliderContainer}>
          <Text style={styles.slideText}>Viaje de um jeito inteligente!</Text>
          {!slid && (
            <Animated.View
              style={[styles.sliderThumb, { transform: [{ translateX: pan.x }] }]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.arrow}>{'→'}</Text>
            </Animated.View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: "Michroma_400Regular",
    color: "#E0EFFF",
    marginBottom: 60,
    textAlign: "center",
  },
  sliderContainer: {
    width: "90%",
    height: 60,
    backgroundColor: "#a8a8a8",
    borderRadius: 30,
    justifyContent: "center",
    overflow: "hidden",
  },
  slideText: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 0,
    fontSize: 15,
    color: "#3D3D3D",
    fontFamily: "Antonio_400Regular",
  },
  sliderThumb: {
    width: 60,
    height: 60,
    backgroundColor: "#1b78f2",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  arrow: {
    color: "#E0EFFF",
    fontSize: 28,
    fontFamily: "Rajdhani_400Regular",
  },
});
