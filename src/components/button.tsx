import { IButtonProps, Button as NBButton } from "native-base";

export const Button = (props: IButtonProps) => (
  <NBButton
    variant="unstyled"
    bg="purple.600"
    py="3"
    rounded="sm"
    _pressed={{
      opacity: 0.7,
    }}
    _loading={{
      opacity: 1,
    }}
    _text={{ fontWeight: "bold", fontSize: "md", color: "white" }}
    {...props}
  />
);
