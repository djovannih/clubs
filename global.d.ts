import type en from "@/../messages/en.json";
import type { formats } from "@/i18n/request";

type Messages = typeof en;
type Formats = typeof formats;

declare global {
  type IntlMessages = Messages;
  type IntlFormats = Formats;
}
