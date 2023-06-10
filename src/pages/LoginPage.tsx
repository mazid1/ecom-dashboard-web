import {
  Card,
  CardBody,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { history } from "../helpers/history";

export const LoginPage = () => {
  // globally store current location
  history.location = useLocation();

  return (
    <Center mt={200}>
      <Card>
        <CardBody>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Create Account</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <p>register form</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Center>
  );
};
