import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { handleError } from "../../helpers/handleError";
import { useLoginMutation } from "../../redux/api/authApiSlice";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  const toast = useToast();

  const submitHandler: SubmitHandler<LoginDto> = async (data) => {
    try {
      await login(data).unwrap();
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack gap={4}>
        <FormControl isInvalid={!!errors.username} isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" {...register("username")} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="teal" type="submit" disabled={isLoading}>
          Login
        </Button>
      </Stack>
    </form>
  );
};
