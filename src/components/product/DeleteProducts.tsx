import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Text, useToast } from "@chakra-ui/react";
import { handleError } from "../../helpers/handleError";
import { useDeleteManyProductsMutation } from "../../redux/api/productApiSlice";
import { useConfirmation } from "../common/confirmation";

type DeleteProductsProps = {
  selectedProductIds: string[];
};

export const DeleteProducts = (props: DeleteProductsProps) => {
  const { selectedProductIds } = props;

  const toast = useToast();
  const { ask } = useConfirmation();
  const [deleteProducts] = useDeleteManyProductsMutation();

  const handleDeleteProducts = async () => {
    try {
      const isConfirmed = await ask({
        header: `Delete Products`,
        message: (
          <Text>
            Are you sure you want to delete{" "}
            <strong>{selectedProductIds.length}</strong> products?
            <br />
            This action can not be undone.
          </Text>
        ),
        acceptButtonText: "Delete",
        rejectButtonText: "Cancel",
      });
      if (!isConfirmed) return;

      const { deletedCount } = await deleteProducts(
        selectedProductIds
      ).unwrap();

      toast({
        title: "Deleted.",
        description: `Deleted ${deletedCount} product${
          deletedCount > 1 ? "s" : ""
        }.`,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <Button
      leftIcon={<DeleteIcon />}
      colorScheme="red"
      onClick={handleDeleteProducts}
      isDisabled={selectedProductIds.length === 0}
    >
      Delete Product
    </Button>
  );
};
