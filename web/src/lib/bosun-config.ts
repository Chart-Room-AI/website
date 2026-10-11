import { siteConfig } from "@/lib/site-config";

export const bosunConfig = {
  productName: "Bosun",
  lockupSuffix: "by Chart Room AI",
  fullName: "Bosun by Chart Room AI",
  pronunciation: "BOH-sun",
  parentCompany: siteConfig.legalName,
  parentSiteName: siteConfig.name,
  parentSiteUrl: siteConfig.url,
  path: "/bosun",
  displayAddress: "chartroomai.com/bosun",
  contactEmail: "marc@chartroomai.com",
  contactMailSubject: "Bosun by Chart Room AI",
  formEndpoint: siteConfig.formEndpoint,
} as const;
