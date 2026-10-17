import type { Contact } from '@/platform/site/types'

export const contact: Contact = {
  phones: [
    { display: '+91-7330645071', href: 'tel:+917330645071' },
    { display: '+91-8686922979', href: 'tel:+918686922979' }
  ],
  email: null, // TODO: add the Ultra Sign Makers email, e.g. { display: 'hello@…', href: 'mailto:hello@…' }
  address: 'Near SriKrishna Neuro Hospital, Kachiguda Road, Hyderabad',
  addressShort: 'Hyderabad, Telangana',
  pincode: '500063',
  hours: '24/7' // TODO: update with actual business hours if different
  // map: { embedUrl: '…', title: 'Ultra Sign Makers location' }, // TODO: Google Maps → Share → Embed a map
}

export const primaryPhone = contact.phones[0]
