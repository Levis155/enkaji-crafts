import { format, addDays } from "date-fns";

export const earliestDeliveryDate = format(new Date(), "MMM dd");
export const latestDeliveryDate = format(addDays(new Date(), 5), "MMM dd");