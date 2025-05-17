import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "@expo-google-fonts/antonio";
import { Antonio_400Regular } from "@expo-google-fonts/antonio";
import { Michroma_400Regular } from "@expo-google-fonts/michroma";
import { Rajdhani_400Regular } from "@expo-google-fonts/rajdhani";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Antonio_400Regular,
    Michroma_400Regular,
    Rajdhani_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    navigation.navigate("RideSearch"); // Aqui seria a navegação após login bem-sucedido
  };

  return (
    <LinearGradient colors={["#0A1F44", "#3D3D3D"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#3D3D3D"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Senha"
            placeholderTextColor="#3D3D3D"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Crie sua conta</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontFamily: "Michroma_400Regular",
    color: "#E0EFFF",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#e5f0ff",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#3D3D3D",
    marginBottom: 15,
    fontFamily: "Antonio_400Regular",
    fontSize: 15,
  },
  passwordContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleButton: {
    marginLeft: 10,
    padding: 10,
  },
  toggleText: {
    color: "#E0EFFF",
    fontFamily: "Antonio_400Regular",
    fontSize: 14,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#2E5BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Michroma_400Regular",
    color: "#E0EFFF",
  },
  registerText: {
    fontSize: 14,
    color: "#E0EFFF",
    fontFamily: "Antonio_400Regular",
    marginTop: 20,
  },
});
