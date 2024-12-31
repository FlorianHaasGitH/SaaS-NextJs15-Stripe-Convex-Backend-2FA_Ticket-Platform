"use client";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useStorageUrl } from "@/lib/utils";

export default function EventPage() {
  const { user } = useUser();
  const params = useParams();
  const event = useQuery(api.events.getById, {
    eventId: params.id as Id<"events">,
  });
  const availability = useQuery(api.events.getEventAvailability, {
    eventId: params.id as Id<"events">,
  });
  const imageUrl = useStorageUrl(event?.imageStorageId);

  if (!event || !availability) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden"></div>
        {imageUrl && (
          <div className="aspect-[21/9] relative w-full">
            <Image
              src={imageUrl}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Event Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {event.name}
                </h1>
                <p className="text-lg text-gray-600">{event.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-600 mb-1">
                    <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-sm font-medium">Date</span>
                  </div>
                  <p className="text-gray-900">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-600 mb-1">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="text-gray-900">{event.location}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Ticket className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-sm font-medium">Price</span>
                  </div>
                  <p className="text-gray-900">£{event.price.toFixed(2)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-sm font-medium">Availability</span>
                  </div>
                  <p className="text-gray-900">
                    {availability.totalTickets - availability.purchasedCount} /{" "}
                    {availability.totalTickets} left
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
