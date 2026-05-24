"use client";

import { Widgetview } from "@/modules/widget/ui/views/widget-view";
import { use } from "react";


interface Props {
  searchParams: Promise<{
    organizationId: string;
  }>
};

const Page = ({ searchParams }: Props) => {
  const { organizationId } = use(searchParams);

  return (
    <Widgetview organizationId={organizationId} />
  );
};

export default Page;