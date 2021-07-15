import { Contact } from "../Contact/index";
import { ContactType } from "../types/ContactType/index";

export class LocalStorage {
  public index() {
    const contacts = this.getContactsFromLocalStorage();
    return this.sortContacts(contacts);
  }

  public create(contact: Contact) {
    const contacts = this.getContactsFromLocalStorage();

    const temp = [];
    temp.push(contact);

    if (!contacts) {
      localStorage.setItem("contacts", JSON.stringify(temp));
      return;
    }

    const emailAlreadyExists = contacts.find(
      (contactInDatabase: ContactType) => {
        return contactInDatabase._email === contact.getEmail;
      }
    );

    if (emailAlreadyExists) {
      throw new Error("E-mail already exists!");
    }

    contacts.push(...temp);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  public read(searchedContact: string) {
    const contacts = this.getContactsFromLocalStorage();
    const contactsFound = contacts.filter((contactIterating: ContactType) => {
      return (
        contactIterating._name
          .toLocaleLowerCase()
          .includes(searchedContact.toLocaleLowerCase()) ||
        contactIterating._email
          .toLocaleLowerCase()
          .includes(searchedContact.toLocaleLowerCase())
      );
    });

    if (!contactsFound) {
      return false;
    }

    return this.sortContacts(contactsFound);
  }

  public update(contact: Contact) {
    const contacts = this.getContactsFromLocalStorage();
    const contactIndex = contacts.findIndex(
      (contactIterating: ContactType) => contactIterating._id === contact.getId
    );

    contacts[contactIndex]._id = contact.getId;
    contacts[contactIndex]._name = contact.getName;
    contacts[contactIndex]._phone = contact.getPhone;
    contacts[contactIndex]._email = contact.getEmail;

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  public delete(contactId: string) {
    const contacts = this.getContactsFromLocalStorage();
    const newArrayOfContacts = contacts.filter((contact: ContactType) => {
      return contact._id !== contactId;
    });

    localStorage.setItem("contacts", JSON.stringify(newArrayOfContacts));
  }

  public getTotalOfContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts") as string);
    return contacts.length;
  }

  private getContactsFromLocalStorage() {
    const contacts = JSON.parse(localStorage.getItem("contacts") as string);
    return contacts;
  }

  private sortContacts(contacts: ContactType[]) {
    const sortedContacts = contacts.sort(function (
      contact1: ContactType,
      contact2: ContactType
    ) {
      return contact1._name.localeCompare(contact2._name);
    });
    return sortedContacts;
  }
}
