import { prefersReducedMotion } from "@/components/sections/Programmes/lib/motion";

/**
 * Brings this site's counsellor form (#contact, components/sections/Contact) into view and puts the focus in its name field.
 * With a `programme` (e.g. the flagship card's "Enquire") it also chooses that programme in the form's programme list, the
 * same way every [data-prog] link on this site does (components/sections/Contact/contact-form.js): the option is added if the
 * list does not have it, and a change event lets the form's own dropdown (components/ui/custom-select.js) follow.
 *
 * (soloboy dispatched a "vr:enquire" event to its own counselling postcard; this site's form is the Contact section.)
 */
export function requestEnquiry(programme?: string): void {
  const select = document.getElementById("fProg") as HTMLSelectElement | null;
  if (programme && select) {
    if (![...select.options].some((o) => o.value === programme)) select.add(new Option(programme));
    select.value = programme;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }
  const form = document.getElementById("contact");
  if (!form) return;
  const smooth = !prefersReducedMotion();
  const lenis = (window as unknown as { __lenis?: { scrollTo: (el: Element, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(form, { immediate: !smooth });
  else form.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  window.setTimeout(() => (document.getElementById("fName") as HTMLInputElement | null)?.focus({ preventScroll: true }), smooth ? 900 : 0);
}
