import { useState } from "react";
import { cn } from "@/lib/utils";
import { useContacts, Contact } from "@/hooks/useContacts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Phone, Mail, User, Users, Loader2, AlertCircle, PhoneCall, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactPickerProps {
  onContactSelect?: (contact: Contact) => void;
  onCall?: (phoneNumber: string) => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ContactPicker({
  onContactSelect,
  onCall,
  className,
  variant = "outline",
  size = "default",
}: ContactPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { contacts, isSupported, isLoading, error, pickContact, requestContacts } = useContacts();
  const { toast } = useToast();

  const handlePickContact = async () => {
    const contact = await pickContact();
    if (contact) {
      setSelectedContact(contact);
      onContactSelect?.(contact);
      toast({
        title: "Contact selected",
        description: `${contact.name} has been selected.`,
      });
    }
  };

  const handleCall = (phoneNumber: string) => {
    // Use tel: protocol for native phone calls
    window.location.href = `tel:${phoneNumber}`;
    onCall?.(phoneNumber);
    setOpen(false);
  };

  const handleSendSMS = (phoneNumber: string) => {
    window.location.href = `sms:${phoneNumber}`;
    setOpen(false);
  };

  const handleSendWhatsApp = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanNumber}`, "_blank");
    setOpen(false);
  };

  // Fallback for unsupported browsers
  if (!isSupported) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={variant} size={size} className={cn("gap-2", className)}>
            <Users className="w-4 h-4" />
            Contacts
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Contact Access Not Available
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-2">
              <p>
                Your browser doesn't support the Contact Picker API. This feature works best on:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Chrome for Android (v80+)</li>
                <li>Samsung Internet</li>
                <li>Edge for Android</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                To call a contact, you can manually enter a phone number or use your device's phone app.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 pt-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => window.location.href = "tel:"}
            >
              <Phone className="w-4 h-4" />
              Open Phone Dialer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={cn("gap-2", className)}>
          <Users className="w-4 h-4" />
          Contacts
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Phone Contacts
          </DialogTitle>
          <DialogDescription>
            Select a contact from your device to call or message them directly.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-4">
          {/* Pick Contact Button */}
          <Button
            variant="default"
            className="w-full justify-center gap-2"
            onClick={handlePickContact}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Accessing Contacts...
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                Select Contact
              </>
            )}
          </Button>

          {error && (
            <p className="text-sm text-destructive flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}

          {/* Selected Contact Display */}
          {selectedContact && (
            <div className="border rounded-lg p-4 bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedContact.name}</p>
                  {selectedContact.tel?.[0] && (
                    <p className="text-sm text-muted-foreground">{selectedContact.tel[0]}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {selectedContact.tel && selectedContact.tel.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <PhoneCall className="w-4 h-4" />
                        Call
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {selectedContact.tel.map((num, idx) => (
                        <DropdownMenuItem key={idx} onClick={() => handleCall(num)}>
                          <Phone className="w-4 h-4 mr-2" />
                          {num}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {selectedContact.tel && selectedContact.tel.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {selectedContact.tel.map((num, idx) => (
                        <>
                          <DropdownMenuItem key={`sms-${idx}`} onClick={() => handleSendSMS(num)}>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            SMS: {num}
                          </DropdownMenuItem>
                          <DropdownMenuItem key={`wa-${idx}`} onClick={() => handleSendWhatsApp(num)}>
                            <Phone className="w-4 h-4 mr-2" />
                            WhatsApp: {num}
                          </DropdownMenuItem>
                        </>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {selectedContact.email && selectedContact.email.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {selectedContact.email.map((email, idx) => (
                        <DropdownMenuItem key={idx} onClick={() => window.location.href = `mailto:${email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          {email}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          )}

          {/* Recent Contacts */}
          {contacts.length > 1 && (
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Recent Selections</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {contacts.slice(0, 5).map((contact, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "w-full flex items-center gap-3 p-2 rounded-lg text-left",
                      "hover:bg-muted/50 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                    onClick={() => {
                      setSelectedContact(contact);
                      onContactSelect?.(contact);
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contact.name}</p>
                      {contact.tel?.[0] && (
                        <p className="text-xs text-muted-foreground truncate">{contact.tel[0]}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
