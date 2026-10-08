import type { Design } from "../types";
import { Frame } from "./components/Frame";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Gallery } from "./pages/Gallery";
import { Home } from "./pages/Home";
import { Reviews } from "./pages/Reviews";
import { Services } from "./pages/Services";

/** "Classic": the first design, built for Dry Creek Landscaping. */
export const classic: Design = {
  id: "classic",
  label: "Classic",
  Frame,
  pages: { Home, Services, Gallery, Reviews, About, Contact },
};
