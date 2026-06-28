import { createError } from "h3";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import {
  getBooking as getBookingById,
  getBookings as getUserBookings,
  getCabin as getCabinById,
} from "./data-service";

export async function signInAction(event) {
  return signIn("google", { event, redirectTo: "/account" });
}

export async function updateGuestAction(formData, event) {
  const session = await auth(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "You must be logged in",
    });
  }

  const nationalID = formData?.get?.("nationalID");
  const nationalityValue = formData?.get?.("nationality");
  const [nationality, countryFlag] = nationalityValue?.split("%") ?? [];

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  return { success: true, redirectTo: "/account/profile" };
}

export async function deleteBookingAction(bookingId, event) {
  const session = await auth(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "You must be logged in",
    });
  }

  const guestBookings = await getUserBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  return { success: true, redirectTo: "/account/reservations" };
}

export async function signOutAction(event) {
  await signOut({ event });
  return { success: true, redirectTo: "/" };
}

export async function updateReservationAction(formData, event) {
  const session = await auth(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "You must be logged in",
    });
  }

  const booking = await getBookingById(formData?.get?.("reservationId"));
  if (!booking) {
    throw new Error("Booking not found");
  }

  const cabin = await getCabinById(booking.cabinId);
  if (!cabin) {
    throw new Error("Cabin not found");
  }

  if (booking.guestId !== session.user.guestId) {
    throw new Error("You are not allowed to edit this booking");
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      numGuests: formData?.get?.("numGuests"),
      observations: formData?.get?.("observations"),
      numNights: formData?.get?.("numNights"),
      totalPrice:
        Number(formData?.get?.("numNights")) *
        (cabin.regularPrice - cabin.discount),
    })
    .eq("id", formData?.get?.("reservationId"));

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return { success: true, redirectTo: "/account/reservations" };
}
