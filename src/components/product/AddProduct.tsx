import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import { ProductFormModal } from "./ProductFormModal";

export const AddProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Add Product
      </Button>

      <ProductFormModal
        isOpen={isOpen}
        onClose={onClose}
        headerText="Add a new product"
        saveButtonText="Save Product"
      />
    </>
  );
};
