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

export const LoginPage = () => {
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
