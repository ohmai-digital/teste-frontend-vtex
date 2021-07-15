export class Contact {
  private _id: string = "";
  private _name: string = "";
  private _email: string = "";
  private _phone: string = "";

  constructor(
    theId: string,
    theName: string,
    thePhone: string,
    theEmail: string
  ) {
    this._id = theId;
    this._name = theName;
    this._phone = thePhone;
    this._email = theEmail;
  }

  public get getId(): string {
    return this._id;
  }

  public set setId(id: string) {
    this._id = id;
  }

  public get getName(): string {
    return this._name;
  }

  public set setName(name: string) {
    this._name = name;
  }

  public get getEmail(): string {
    return this._email;
  }

  public set setEmail(email: string) {
    this._email = email;
  }

  public get getPhone(): string {
    return this._phone;
  }

  public set setPhone(phone: string) {
    this._phone = phone;
  }
}
