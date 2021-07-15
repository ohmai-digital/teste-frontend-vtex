import { LocalStorage } from "./Database/index";
import { Contact } from "./Contact/index";

import { generateID } from "./utils/generateID/index";
import { invalidFields } from "./utils/invalidFields";
import { displayContactList } from "./utils/displayContactList";

import "./scss/globals.scss";
import "./scss/index.scss";

import $ from "jquery";

import { ContactType } from "./types/ContactType";

$(function () {
  let isUpdating: boolean = false;
  let contactID: string;
  let nameValue: string;
  let phoneValue: string;
  let emailValue: string;

  const database = new LocalStorage();
  const contacts = database.index();

  displayContactList(contacts as ContactType[]);

  const searchInput = $("#search-input");
  const contactList = $(".table-body");
  const showModalButton = $("#show-modal-btn");
  const showConfirmDeleteModalButton = $("#confirm-delete-modal");
  const closeModalButton = $("#close-btn");
  const formModal = $("#modal");
  const form = $("#form");
  const statusMessage = $("#status-message");
  const name = $("#name");
  const phone = $("#phone");
  const email = $("#email");

  const no = $("#no");
  const yes = $("#yes");

  showModalButton.on("click", function () {
    $(window).scrollTop(0);
    formModal.fadeIn(100);
    name.val("");
    phone.val("");
    email.val("");
  });

  closeModalButton.on("click", function () {
    formModal.fadeOut(100);
    isUpdating = false;
  });

  searchInput.on("change", function (event: any) {
    const searchedContact = event.target.value;
    const filteredContacts = database.read(searchedContact);
    displayContactList(filteredContacts as ContactType[]);
  });

  contactList.on(
    "click",
    function (
      event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>
    ) {
      $(window).scrollTop(0);
      contactID = event.target.parentNode?.parentNode?.children[0]
        .innerHTML as string;

      if (event.target.innerText === "Excluir") {
        nameValue = event.target.parentNode?.parentNode?.children[1]
          .innerHTML as string;

        showConfirmDeleteModalButton.css("display", "flex");
        showConfirmDeleteModalButton.fadeIn(100);

        $("#confirm-text").text(`Apagar o contato ${nameValue}?`);

        no.on("click", function () {
          showConfirmDeleteModalButton.fadeOut(1000);
        });

        yes.on("click", function () {
          database.delete(contactID);
          showConfirmDeleteModalButton.fadeOut(1000);
          const contacts = database.index();

          displayContactList(contacts as ContactType[]);
        });
      }

      if (event.target.innerText === "Editar") {
        formModal.fadeIn(100);
        nameValue = event.target.parentNode?.parentNode?.children[1]
          .innerHTML as string;
        phoneValue = event.target.parentNode?.parentNode?.children[2]
          .innerHTML as string;
        emailValue = event.target.parentNode?.parentNode?.children[3]
          .innerHTML as string;
        name.val(nameValue);
        phone.val(phoneValue);
        email.val(emailValue);
        isUpdating = true;
      }
    }
  );

  form.on("submit", function (event) {
    event.preventDefault();

    const fields: JQuery<HTMLElement>[] = [];
    fields.push(name);
    fields.push(phone);
    fields.push(email);

    if (invalidFields(fields).length > 0) {
      invalidFields(fields).forEach((fieldName) => {
        let fieldNameInPortuguese;
        switch (fieldName.get(0).id) {
          case "name":
            fieldNameInPortuguese = "nome";
            break;
          case "phone":
            fieldNameInPortuguese = "telefone";
            break;
          default:
            fieldNameInPortuguese = "email";
            break;
        }
        $(`.${fieldName.get(0).id}-error`)
          .text(`Campo ${fieldNameInPortuguese} é obrigatório!`)
          .show()
          .fadeOut(10000);
      });
      return;
    }

    const contactValues = {
      _id: isUpdating ? contactID : generateID(),
      _name: name.val() as string,
      _phone: phone.val() as string,
      _email: email.val() as string,
    };
    const contact = new Contact(
      contactValues._id,
      contactValues._name,
      contactValues._phone,
      contactValues._email
    );

    if (isUpdating) {
      database.update(contact);
      statusMessage
        .text(`Atualizado com sucesso ✅`)
        .show()
        .fadeOut(3000)
        .css("color", "green");
      isUpdating = false;
      formModal.fadeOut(4000);
    } else {
      try {
        database.create(contact);
        statusMessage
          .text(`Adicionado com sucesso 🥳`)
          .show()
          .fadeOut(3000)
          .css("color", "green");
      } catch (error) {
        statusMessage
          .text(`E-mail já cadastrado 😬`)
          .show()
          .fadeOut(3000)
          .css("color", "red");
      }
    }
    name.val("");
    phone.val("");
    email.val("");
    name.focus();

    const contacts = database.index();
    displayContactList(contacts as ContactType[]);
  });
});
