import { Box, HStack, Heading, Icon, IconButton } from "native-base";
import { useUser } from "../stores/user";
import { Ionicons } from "@expo/vector-icons";

export const Home = () => {
  const { logout, ...user } = useUser();

  return (
    <Box bg="gray.800" safeArea flex="1">
      <HStack p="4" pr="0" justifyContent="space-between">
        <Heading color="white" fontSize="3xl">
          Welcome, {user.name}
        </Heading>
        <IconButton
          _pressed={{
            bg: "transparent",
          }}
          onPress={logout}
          icon={
            <Icon
              as={<Ionicons name="log-out-outline" />}
              color="white"
              size="xl"
            />
          }
        />
      </HStack>
    </Box>
  );
};
