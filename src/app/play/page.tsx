import SlotMachine from "@/components/slot-machine/SlotMachine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play & Win — Sago Whisky | Spin for Exclusive Rewards",
  description:
    "Spin the Sago slot machine for a chance to win free whisky, premium pours, and exclusive discounts. Redeem rewards at participating bars across Kenya.",
};

export default function PlayPage() {
  return <SlotMachine />;
}
