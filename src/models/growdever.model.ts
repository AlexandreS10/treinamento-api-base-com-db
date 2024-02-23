export interface CreateGrowdever {
  name: string;
  email: string;
  dateOfBirth: Date;
  phone: string;
  address?: string | null;
}

export interface UpdateGrowdever {
  id: number;
  name: string;
  email: string;
  dateOfBirth: Date;
  phone: string;
  address?: string | null;
}

export interface GrowdeverResponse {
  id: number;
  name: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
}

export class Growdever {
  private _id: number;
  constructor(
    private _name: string,
    private _email: string,
    private _dateOfBirth: Date,
    private _phone: string
  ) {
    this._id = 0;
  }

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get email() {
    return this._email;
  }
  public get dateOfBirth() {
    return this._dateOfBirth;
  }
  public get phone() {
    return this._phone;
  }
}
