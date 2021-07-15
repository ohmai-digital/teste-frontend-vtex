import { LocalStorage } from "../../Database";
import { ContactType } from "../../types/ContactType";

export function displayContactList(contacts: ContactType[]) {
  const contactList = $(".table-body");
  const totalOfContacts = $("#total-of-contacts");

  const database = new LocalStorage();
  const total = database.getTotalOfContacts();

  switch (total) {
    case 0:
  }

  if (total === 0) {
    totalOfContacts.text("");
  }

  if (total > 0) {
    totalOfContacts.text(`${total} ${total === 1 ? "contato" : "contatos"}`);
  }

  if (contacts?.length === 0) {
    contactList.html("Nenhum contato encontrado 🧐");
    contactList.css({
      color: "rgba(5, 150, 105)",
      "font-size": "20px",
      "text-align": "center",
    });
  } else {
    contactList.html("");
    contacts?.forEach((contact: ContactType) => {
      contactList.append(`<ul>
				<li>${contact._id}</li>
				<li>${contact._name}</li>
				<li>${contact._phone}</li>
				<li>${contact._email}</li>
				<li class="actions-buttons">
					<button type="button" class="edit-btn">Editar</button>
					<button type="button" class="delete-btn">Excluir</button>
				</li>
			</>`);
    });
  }
}
