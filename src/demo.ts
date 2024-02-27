// part 1-2
type ContactName = string;

type ContactStatus = "active" | "inactive" | "new"
// invece di 
// enum ContactStatus {
//     Active = "active",
//     Inactive = "inactive",
//     New = "new"
// }

// invece di scrivere birthDate?: Date | number | string,
// andiamo a sostituirevtutto con il "type"

type ContactBirthDate = Date | number | string

interface Contact {
    id: number;
    name: ContactName;
    // birthDate?: Date | number | string; commentato per la parte 4
    status: ContactStatus;
    address: Address
}

// commentati per la parte 2, tolo il commento per la parte 4
interface Address {
    street: string;
    province: string;
    postalCode: string;
}

// type AddressableContact = Contact & Address

// function getBirthDate(contact: Contact){
//     if(typeof contact.birthDate === "number"){
//         return new Date(contact.birthDate)
//     }
//     else if(typeof contact.birthDate === "string"){
//         return new Date(contact.birthDate)
//     }
//     else{
//         return contact.birthDate
//     }
// }

// commentato per la parte 4
// let primaryContact: Contact = {
//     id: 12345,
//     name: "Aldo Baglio",
//     status: "active"
// }

type ContactField = keyof Contact


function getValue<T, U extends keyof T>(source: T, propertyName: U){
    return source[propertyName]
}

// part 3
// const x = 'string' cambiato con la parte 5
// const y = true cambiato con la parte 5

let x: Record<string, string | number | boolean | Function> = { name: "Giovanni Storti" }
x.id = 1234;
x.active = true
x.log = () => console.log("awesome!")

// console.log(typeof x) // --> 'string' cambiato com la parte 5
// console.log(typeof y) // --> 'boolean' cambiato con la parte 5

// commentato per la parte 4
// function toContact(nameOrContact: string | Contact): Contact {
//     if(typeof nameOrContact === "object"){
//         return {
//             id: nameOrContact.id,
//             name: nameOrContact.name,
//             status: nameOrContact.status
//         }
//     }
//     else {
//         return{
//             id: 0,
//             name: nameOrContact,
//             status: "active"
//         }
//     }
// }

const myType = { min: 1, max: 100 }
function save(source: typeof myType){}

// part 4
interface ContactEvent {
    contactId: Contact["id"]
}

interface ContactDeleteEvent extends ContactEvent{

}

interface ContactStatusChangedEvent extends ContactEvent{
    oldStatus: Contact["status"]
    newStatus: Contact["status"]
}

type Awesome = Contact["address"]["postalCode"]

interface ContactEvents {
    deleted: ContactDeleteEvent;
    statusChanged: ContactStatusChangedEvent;
    // and so on...
}

function handleEvent<T extends keyof ContactEvents>(
    eventName: T,
    handler: (evt: ContactEvents[T]) => void
){
    if (eventName === "statusChanged"){
        handler({ contactId: 1, oldStatus: "active", newStatus: "inactive" })
    }
}

handleEvent("statusChanged", evt => evt)

interface Query {
    sort?: 'asc' | 'desc';
    matches(val): boolean
}

function searchContacts(contacts: Contact[], query: Record<keyof Contact, Query>){
    return contacts.filter(contact => {
        for (const contact of Object.keys(contact) as (keyof Contact)[]){
            // prendi l'oggetto di questa proprietà
            const propertyObject = query[property]
            // controlla se coincidono
            if(propertyQuery && propertyQuery.matches(contact[property])){
                return true
            }
        }
        return false
    })
}

const filteredContacts = searchContacts(
    [/* contacts */],
    {
        id: { matches: (id) => id === 123 },
        name: { matches: (name) => name === "Giacomo Poretti" },
    }
)