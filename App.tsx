import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useUser } from "./src/stores/user";
import { Login } from "./src/screens/login";
import { Home } from "./src/screens/home";
import { BiometricsController } from "./src/controllers/biometrics-controller";
import { useEffect } from "react";

export default function App() {
  const { set, ...user } = useUser();

  useEffect(() => {
    return () => {
      set({ didLogout: true });
    };
  }, []);
  return (
    <NativeBaseProvider>
      <StatusBar style="light" />
      {user?.id ? (
        <>
          <Home />
          <BiometricsController />
        </>
      ) : (
        <Login />
      )}
    </NativeBaseProvider>
  );
}
