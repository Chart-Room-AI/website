import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export default function HomePage() {
  const { Home } = activeDesign.pages;
  return <Home config={clientConfig} />;
}
