import { Account } from "./account.entity";
export declare class PhoneNumber {
    label?: string;
    digits: string;
}
declare class AddressName {
    salutation: string;
    first: string;
    last: string;
    title?: string;
}
export declare class Address {
    id: number;
    name: AddressName;
    type: string;
    phoneNumbers?: PhoneNumber[];
    account: Account;
}
export declare class PhysicalAddress extends Address {
}
export declare class MailingAddress extends Address {
}
export {};
//# sourceMappingURL=address.entity.d.ts.map