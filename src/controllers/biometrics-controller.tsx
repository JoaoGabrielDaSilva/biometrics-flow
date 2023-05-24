import { Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect } from "react";
import { useUser } from "../stores/user";

export const BiometricsController = () => {
  const { set, hasBiometry } = useUser();

  const handleAskBiometricsPermission = async () => {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isEnrolled) return;

    Alert.alert(
      "Biometria",
      "Você deseja acessar a sua conta utilizando a biometria celular?",
      [
        {
          text: "Não",
          style: "destructive",
        },
        {
          text: "Sim",
          onPress: () => set({ hasBiometry: true }),
        },
      ]
    );
  };

  useEffect(() => {
    if (!hasBiometry) {
      handleAskBiometricsPermission();
    }
  }, []);

  return null;
};
