import type { Metadata } from "next";
import JAHmereGoFundMeDivine from "@/components/jahmere-gofundme-divine";

export const metadata: Metadata = {
  title: "JAHmere Divine Defense Fund | The Bridge Project",
  description:
    "Support JAHmere Webb's legal defense through divine community manifestation. Every donation is a prayer for justice.",
  keywords:
    "JAHmere Webb, legal defense, GoFundMe, divine justice, community support, Bridge Project",
};

export default function JAHmereGoFundMePage() {
  return <JAHmereGoFundMeDivine />;
}
