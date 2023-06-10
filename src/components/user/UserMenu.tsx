import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useLogoutMutation } from "../../redux/api/authApiSlice";
import { useGetMeQuery } from "../../redux/api/userApiSlice";

const UserMenu = () => {
  const [logout] = useLogoutMutation();
  const { data: user } = useGetMeQuery();

  const startLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar size={"sm"} src="" />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {user?.email}
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <MenuItem onClick={startLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserMenu;
