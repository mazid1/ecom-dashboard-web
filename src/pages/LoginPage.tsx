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
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";

export const LoginPage = () => {
  return (
    <Center mt={100}>
      <Card>
        <CardBody>
          <Tabs variant="enclosed">
            <TabList>
              <Tab data-testid="login-tab">Login</Tab>
              <Tab data-testid="register-tab">Create Account</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <RegisterForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Center>
  );
};
