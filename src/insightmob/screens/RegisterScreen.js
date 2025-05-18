import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "@expo-google-fonts/antonio";
import { Antonio_400Regular } from "@expo-google-fonts/antonio";
import { Michroma_400Regular } from "@expo-google-fonts/michroma";
import { Rajdhani_400Regular } from "@expo-google-fonts/rajdhani";

// Função de validação de senha
const validatePassword = (password) => {
  const minLength = /^(?=.{8,})/; // Pelo menos 8 caracteres
  const uppercase = /^(?=.*[A-Z])/; // Pelo menos uma letra maiúscula
  const number = /^(?=.*[0-9])/; // Pelo menos um número
  const specialChar = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/; // Pelo menos um caractere especial (opcional)

  if (!minLength.test(password)) {
    return "A senha deve ter pelo menos 8 caracteres.";
  }
  if (!uppercase.test(password)) {
    return "A senha deve conter pelo menos uma letra maiúscula.";
  }
  if (!number.test(password)) {
    return "A senha deve conter pelo menos um número.";
  }
  if (!specialChar.test(password)) {
    return "A senha deve conter pelo menos um caractere especial.";
  }
  return null;
};

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Antonio_400Regular,
    Michroma_400Regular,
    Rajdhani_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleRegister = () => {
    // Validação das senhas
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (!email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Lógica de registro (pode ser com Firebase ou qualquer outra API)

    Alert.alert("Sucesso", "Conta criada com sucesso.");
    navigation.navigate("Login");
  };

  return (
    <LinearGradient colors={["#0A1F44", "#3D3D3D"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Crie sua conta</Text>

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
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
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

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Confirmar Senha"
            placeholderTextColor="#3D3D3D"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Já tem conta? Entrar</Text>
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
    fontSize: 28,
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
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Michroma_400Regular",
    color: "#E0EFFF",
  },
  loginText: {
    fontSize: 14,
    color: "#E0EFFF",
    fontFamily: "Antonio_400Regular",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Antonio_400Regular",
    marginTop: 5,
  },
});
