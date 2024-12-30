"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import Spinner from "./Spinner";

const EventList = () => {
  const events = useQuery(api.events.get);

  if (!events) {
    return (
      <div className="min-h-[400] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <div>EventList</div>;
};

export default EventList;
