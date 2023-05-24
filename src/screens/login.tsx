import {
  Box,
  Center,
  Heading,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Button } from "../components/button";
import { TextInput } from "../components/text-input";
import { useEffect, useState } from "react";
import { useUser } from "../stores/user";
import { Alert, AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometryEnrolled, setIsBiometryEnrolled] = useState(false);

  const { login, logout, clearBiometricsCredentials, ...user } = useUser();

  const handleBiometricsLogin = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();

    if (!success)
      return Alert.alert(
        "Biometria",
        "Não foi possível fazer o login utilizando a sua biometria"
      );

    setIsLoading(true);
    await login({ email: user.email, password: user.password });
    setIsLoading(false);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    await login({ email, password });
    setIsLoading(false);
  };

  const checkBiometryAccess = async () => {
    console.log(await LocalAuthentication.supportedAuthenticationTypesAsync());
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    setIsBiometryEnrolled(isEnrolled);

    if (isEnrolled && !user.didLogout && user.hasBiometry) {
      handleBiometricsLogin();
    }
  };

  useEffect(() => {
    checkBiometryAccess();
  }, []);

  return (
    <Box flex="1" bg="gray.800" safeArea>
      <KeyboardAvoidingView flex="1" behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box justifyContent="center" flex="1">
            <VStack space="4" p="4" mb="20">
              <Heading
                color="purple.600"
                fontSize="6xl"
                textAlign="center"
                mb="12"
              >
                Biometrics
              </Heading>
              {!user.hasBiometry && isBiometryEnrolled ? (
                <>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-mail"
                  />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                  />
                  <Button onPress={handleLogin} isLoading={isLoading}>
                    Login
                  </Button>
                </>
              ) : (
                <Box mb="6">
                  <Heading color="white" textAlign="center">
                    {user.name}
                  </Heading>
                  <Text color="white" textAlign="center" fontSize="md">
                    ***{user.email.slice(5, user.email.length / 2)}*** @
                    {user.email.split("@")[1]}
                  </Text>
                  <Button
                    mt="4"
                    onPress={handleBiometricsLogin}
                    isLoading={isLoading}
                  >
                    Login
                  </Button>
                </Box>
              )}
            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <Pressable
        mb="4"
        onPress={clearBiometricsCredentials}
        _pressed={{ opacity: 0.6 }}
      >
        <Text color="gray.400" textAlign="center">
          Login with a different account
        </Text>
      </Pressable>
    </Box>
  );
};
