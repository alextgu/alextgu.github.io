import type { ReactNode } from "react";

/**
 * Registry of project slugs to their custom page components.
 * Each project can have a completely unique design — add an entry here
 * and implement your component in this file or in a separate file and import it.
 *
 * Example:
 *   import { MyProjectPage } from "./designs/MyProjectPage";
 *   export const projectDesigns: Record<string, () => ReactNode> = {
 *     "my-project": () => <MyProjectPage />,
 *   };
 */
export const projectDesigns: Record<string, () => ReactNode> = {
  // Add project slugs and their custom design components here.
};
