import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "chakra-react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { handleError } from "../../helpers/handleError";
import { asOptionalField } from "../../helpers/zodHelper";
import { Product } from "../../redux/api/@types";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../redux/api/productApiSlice";

const ProductStatusEnum = z.enum(["Available", "Discontinued"]);

export type ProductStatus = z.infer<typeof ProductStatusEnum>;

const productSchema = z.object({
  name: z.string().nonempty("Name is required"),
  price: z.number().nonnegative(),
  status: ProductStatusEnum,
  availableSince: asOptionalField(z.date()),
});

export type CreateProductDto = z.infer<typeof productSchema>;
export type UpdateProductDto = Partial<CreateProductDto>;

type ProductFormProps = {
  onSuccess: () => void;
  product?: Product;
};

const transformToCreateProductDto = (
  product: Product | undefined
): CreateProductDto | undefined => {
  if (!product) return undefined;
  return {
    name: product.name,
    price: product.price,
    status: product.status,
    availableSince: product.availableSince,
  };
};

export const PRODUCT_FORM_ID = "productForm";

export const ProductForm = (props: ProductFormProps) => {
  const { onSuccess, product } = props;
  const productDto = transformToCreateProductDto(product);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateProductDto>({
    resolver: zodResolver(productSchema),
    values: productDto,
  });

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const toast = useToast();

  const statusOptions = Object.values(ProductStatusEnum.Values).map((v) => ({
    label: v,
    value: v,
  }));

  const submitHandler: SubmitHandler<CreateProductDto> = async (data) => {
    const isUpdateForm = !!product;
    try {
      if (isUpdateForm) {
        await updateProduct({ id: product._id, productDto: data }).unwrap();
      } else {
        await createProduct(data).unwrap();
      }
      toast({
        title: isUpdateForm ? "Updated the product." : "Created new product.",
        status: "success",
        isClosable: true,
      });
      onSuccess();
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} id={PRODUCT_FORM_ID}>
      <Stack gap={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.price} isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        <Controller
          name="status"
          control={control}
          render={({ field: { name, onBlur, onChange, ref, value } }) => (
            <FormControl isInvalid={!!errors.status}>
              <FormLabel>Product Status</FormLabel>
              <Select
                name={name}
                onBlur={onBlur}
                onChange={(v) => onChange(v?.value)}
                ref={ref}
                value={statusOptions.find((o) => o.value === value)}
                options={statusOptions}
              />
              <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <FormControl isInvalid={!!errors.availableSince}>
          <FormLabel>Available Since</FormLabel>
          <Input
            type="date"
            {...register("availableSince", { valueAsDate: true })}
          />
          <FormErrorMessage>{errors.availableSince?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
    </form>
  );
};
