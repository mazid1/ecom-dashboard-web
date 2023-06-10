import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Product } from "../../redux/api/@types";
import { PRODUCT_FORM_ID, ProductForm } from "./ProductForm";

type ProductFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  headerText: string | ReactNode; // i.e. Add a new product
  cancelButtonText?: string;
  saveButtonText?: string;
  product?: Product;
};

export const ProductFormModal = (props: ProductFormModalProps) => {
  const {
    isOpen,
    onClose,
    headerText,
    cancelButtonText = "Cancel",
    saveButtonText = "Save",
    product,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ProductForm onSuccess={onClose} product={product} />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button colorScheme="teal" type="submit" form={PRODUCT_FORM_ID}>
            {saveButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
