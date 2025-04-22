export interface EventType {
    id:number,
    title: string,
    start_datetime?: string,
    location?: {
      name: string,
      region: number,
      city: number,
      type_of_area: string,
      address: string
    },
    files?: [
      {
        file: string
      }
    ],
    author?: {
      id: number,
      first_name: string,
      last_name: string,
      middle_name: string,
      phone_number: string
    },
    organizers_contact?: {
        email: string,
        phone: string
    }
}