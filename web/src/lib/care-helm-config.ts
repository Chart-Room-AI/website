import { siteConfig } from "@/lib/site-config";

export const careHelmConfig = {
  productName: "The Care Helm",
  kioskName: "Care Kiosk",
  parentCompany: siteConfig.legalName,
  parentSiteUrl: siteConfig.url,
  productUrl: "https://carehelm.chartroomai.com",
  contactEmail: siteConfig.contactEmail,
  demoMailSubject: "Care Helm demo request",
  formEndpoint: siteConfig.formEndpoint,
} as const;
