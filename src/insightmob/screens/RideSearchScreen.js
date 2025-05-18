import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Antonio_700Bold } from '@expo-google-fonts/antonio';

const GOOGLE_API_KEY = 'AIzaSyAW6BceiMZl-1MWA73v_DFZp5MkOVDn61U';
const CALCULAR_API_URL = 'https://insightmob.up.railway.app/calcular';

export default function RideSearchManual() {
  const [originText, setOriginText] = useState('');
  const [destinationText, setDestinationText] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const [fontsLoaded] = useFonts({ Antonio_700Bold });
  if (!fontsLoaded) return null;

  const fetchSuggestions = async (text, setSuggestions) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&language=pt-BR&components=country:br`
      );
      const json = await response.json();
      setSuggestions(json.predictions || []);
    } catch (error) {
      console.error('Erro nas sugestões:', error);
    }
  };

  const fetchDetails = async (placeId, setCoords) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}&language=pt-BR`
      );
      const json = await response.json();
      const location = json.result.geometry.location;
      setCoords(location);
    } catch (error) {
      console.error('Erro nos detalhes:', error);
    }
  };

  const handleSelectOrigin = (item) => {
    setOriginText(item.description);
    setOriginSuggestions([]);
    fetchDetails(item.place_id, setOriginCoords);
  };

  const handleSelectDestination = (item) => {
    setDestinationText(item.description);
    setDestinationSuggestions([]);
    fetchDetails(item.place_id, setDestinationCoords);
  };

  const handleEstimateRide = async () => {
    if (originCoords && destinationCoords) {
      const jsonPayload = {
        lonOri: originCoords.lng,
        latOri: originCoords.lat,
        lonDes: destinationCoords.lng,
        latDes: destinationCoords.lat,
      };

      try {
        const response = await fetch(CALCULAR_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonPayload),
        });

        const data = await response.json();
        console.log('Resposta da API:', data);
        setApiResponse(data);
      } catch (error) {
        console.error('Erro ao chamar API:', error);
      }
    } else {
      console.warn('Coordenadas ainda não definidas.');
    }
  };

  return (
    <LinearGradient colors={['#0A1F44', '#3D3D3D']} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="Digite o local de partida"
            placeholderTextColor="#3D3D3D"
            value={originText}
            onChangeText={(text) => {
              setOriginText(text);
              fetchSuggestions(text, setOriginSuggestions);
              setOriginCoords(null);
            }}
            style={styles.input}
          />
          <FlatList
            data={originSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectOrigin(item)} style={styles.suggestion}>
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />

          <TextInput
            placeholder="Digite o destino"
            placeholderTextColor="#3D3D3D"
            value={destinationText}
            onChangeText={(text) => {
              setDestinationText(text);
              fetchSuggestions(text, setDestinationSuggestions);
              setDestinationCoords(null);
            }}
            style={styles.input}
          />
          <FlatList
            data={destinationSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectDestination(item)} style={styles.suggestion}>
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />

          <TouchableOpacity style={styles.button} onPress={handleEstimateRide}>
            <Text style={styles.buttonText}>Estimar Corrida</Text>
          </TouchableOpacity>

          {apiResponse && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Estimativa InsightMob:</Text>
              <Text style={styles.resultText}>R${JSON.stringify(apiResponse, null, 2)}</Text>
            </View>
          )}

          {originCoords && destinationCoords && (
            <TouchableOpacity
              style={styles.uberButton}
              onPress={() => {
                const uberURL = `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${originCoords.lat}&pickup[longitude]=${originCoords.lng}&dropoff[latitude]=${destinationCoords.lat}&dropoff[longitude]=${destinationCoords.lng}`;
                Linking.openURL(uberURL).catch((err) =>
                  console.error('Erro ao abrir o app da Uber:', err)
                );
              }}
            >
              <Text style={styles.uberButtonText}>Ir para o app da Uber</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: '#e5f0ff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: 'Antonio_700Bold',
    fontSize: 16,
    color: '#3D3D3D',
    marginBottom: 10,
  },
  suggestion: {
    backgroundColor: '#e5f0ff',
    padding: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontFamily: 'Antonio_700Bold',
    fontSize: 14,
    color: '#3D3D3D',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2E5BFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E0EFFF',
    fontSize: 18,
    fontFamily: 'Antonio_700Bold',
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#e5f0ff',
    borderRadius: 10,
    padding: 15,
  },
  resultText: {
    fontSize: 14,
    color: '#3D3D3D',
    fontFamily: 'Antonio_700Bold',
    marginBottom: 5,
  },
  uberButton: {
    marginTop: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  uberButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Antonio_700Bold',
  },
});
