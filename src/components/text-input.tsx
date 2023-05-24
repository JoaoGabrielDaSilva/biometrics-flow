import { IInputProps, Input } from "native-base";

type TextInputprops = IInputProps;

export const TextInput = (props: TextInputprops) => {
  return (
    <Input
      bg="gray.700"
      p="4"
      borderColor="transparent"
      fontSize="md"
      variant="unstyled"
      borderWidth="1"
      _focus={{
        bg: "gray.600",

        borderColor: "gray.300",
      }}
      _input={{
        selectionColor: "white",
      }}
      color="white"
      {...props}
    />
  );
};
