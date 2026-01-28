import { useState, useCallback } from "react";

export interface Contact {
  name: string;
  tel?: string[];
  email?: string[];
}

interface UseContactsReturn {
  contacts: Contact[];
  isSupported: boolean;
  isLoading: boolean;
  error: string | null;
  pickContact: () => Promise<Contact | null>;
  requestContacts: () => Promise<Contact[]>;
}

// Check if Contact Picker API is supported
function isContactPickerSupported(): boolean {
  return typeof window !== "undefined" && "contacts" in navigator && "ContactsManager" in window;
}

export function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSupported = isContactPickerSupported();

  // Pick a single contact from the device
  const pickContact = useCallback(async (): Promise<Contact | null> => {
    if (!isSupported) {
      setError("Contact Picker is not supported on this device/browser");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const props = ["name", "tel", "email"];
      const opts = { multiple: false };

      // @ts-ignore - Contact Picker API types not in standard TypeScript
      const selected = await navigator.contacts.select(props, opts);

      if (selected && selected.length > 0) {
        const contact: Contact = {
          name: selected[0].name?.[0] || "Unknown",
          tel: selected[0].tel || [],
          email: selected[0].email || [],
        };
        setContacts([contact]);
        return contact;
      }

      return null;
    } catch (err: any) {
      if (err.name === "InvalidStateError") {
        setError("Contact picker is already open");
      } else if (err.name === "SecurityError") {
        setError("Permission denied to access contacts");
      } else if (err.name === "NotAllowedError") {
        setError("User cancelled contact selection");
      } else {
        setError(err.message || "Failed to access contacts");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  // Request multiple contacts from the device
  const requestContacts = useCallback(async (): Promise<Contact[]> => {
    if (!isSupported) {
      setError("Contact Picker is not supported on this device/browser");
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const props = ["name", "tel", "email"];
      const opts = { multiple: true };

      // @ts-ignore - Contact Picker API types not in standard TypeScript
      const selected = await navigator.contacts.select(props, opts);

      if (selected && selected.length > 0) {
        const contactsList: Contact[] = selected.map((c: any) => ({
          name: c.name?.[0] || "Unknown",
          tel: c.tel || [],
          email: c.email || [],
        }));
        setContacts(contactsList);
        return contactsList;
      }

      return [];
    } catch (err: any) {
      if (err.name === "NotAllowedError") {
        setError("User cancelled contact selection");
      } else {
        setError(err.message || "Failed to access contacts");
      }
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  return {
    contacts,
    isSupported,
    isLoading,
    error,
    pickContact,
    requestContacts,
  };
}
