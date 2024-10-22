import { Provider } from "jotai";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { PropsWithChildren } from "react";

export const Providers = async ({ children }: PropsWithChildren) => {
  const messages = await getMessages();

  return (
    <Provider>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </Provider>
  );
};
