export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  cabinId: number;
  guestId: number;
  cabins: {
    name: string;
    image: string;
  };
}
