import { useEffect, useState } from "react";
import {
  useFlag,
  useUnleashContext,
  useVariant,
} from "@unleash/proxy-client-react";
import logo from "./logo.svg";
import "./App.css";

const getStyleFromVariant = (variant) => {
  if (!variant.enabled) {
    return {
      style: { backgroundColor: "gray" },
      name: "undefined",
      enabled: false,
    };
  }

  return {
    style: JSON.parse(variant.payload.value),
    name: variant.name,
    enabled: true,
  };
};

function App() {
  const updateContext = useUnleashContext();

  const [ client, setClient ] = useState(24)
  useEffect(() => {
    // context is updated with userId
    updateContext({ userId: 123, properties: { clientId: client } });
  }, [client]);

  const clients = [
    { label: "Vrådal", value: 123 },
    { label: "24SO Labs", value: 24 }
  ]

  const enableFor24so = useFlag('feature.24so')
  const enableCustomerDownload = useFlag("feature.download-customers");
  const styleVariant = useVariant("ab.landing-page-style");

  let {
    style,
    name,
    enabled: styleEnabled,
  } = getStyleFromVariant(styleVariant);

  return (
    <div className="App" style={style}>
      <header className="App-header">
        <select
          value={client}
          onChange={e => setClient(e.currentTarget.value)}
        >
          {clients.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <img src={logo} className="App-logo" alt="logo" />
          { enableFor24so
              ? <h1>Kun synlig for 24SO</h1>
              : null
          }
        <p>
          {styleEnabled ? (
            <>
              Isn't this style <b>{name}</b>
            </>
          ) : (
            "Style flag disabled"
          )}
        </p>
        {enableCustomerDownload ? (
          <a
            className="App-link"
            href="https://24sevenoffice.no"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download customer CSV
          </a>
        ) : null}
      </header>
    </div>
  );
}

export default App;
