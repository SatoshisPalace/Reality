import { AoWallet } from "@/features/ao/lib/aoWallet";
import Main from "@/features/main/components/Main";
import { WaitlistSplash } from "@/features/waitlist/components/WaitlistSplash";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [wallet, setWallet] = useState<AoWallet | null>(null);

  if (wallet === null) {
    return (
      <WaitlistSplash loginTitle="Sign in" temporaryWalletEnabled={true}>
        {(wallet) => {
          setWallet(wallet); // Immediately set the wallet
          return null; // Skip rendering WaitlistScreen
        }}
      </WaitlistSplash>
    );
  }


  return <Main wallet={wallet} disconnect={() => setWallet(null)} />;
}
