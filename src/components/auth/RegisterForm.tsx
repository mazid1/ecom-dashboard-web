import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { handleError } from "../../helpers/handleError";
import { asOptionalField } from "../../helpers/zodHelper";
import { useRegisterMutation } from "../../redux/api/authApiSlice";

const registerSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
  firstName: z.string().nonempty("First name is required"),
  email: z.string().email().nonempty("Valid email is required"),
  lastName: asOptionalField(z.string().nonempty()),
  address: asOptionalField(z.string().nonempty()),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  });

  const [signUp, { isLoading }] = useRegisterMutation();

  const toast = useToast();

  const submitHandler: SubmitHandler<RegisterDto> = async (data) => {
    try {
      await signUp(data).unwrap();
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

        <FormControl isInvalid={!!errors.firstName} isRequired>
          <FormLabel>First Name</FormLabel>
          <Input type="text" {...register("firstName")} />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" {...register("lastName")} />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Textarea {...register("address")} />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="teal" type="submit" disabled={isLoading}>
          Register
        </Button>
      </Stack>
    </form>
  );
};
