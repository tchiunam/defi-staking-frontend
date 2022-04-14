import { Container } from "@material-ui/core";
import { DAppProvider, Config, Kovan } from "@usedapp/core";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { getDefaultProvider } from "ethers"

const config: Config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: getDefaultProvider('kovan'),
  },
}

function App() {
  return (
    <DAppProvider config={{
      networks: [Kovan],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </DAppProvider>
  );
}

export default App;
