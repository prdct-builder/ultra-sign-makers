import type { Contact } from '@/platform/site/types'

export const contact: Contact = {
  phones: [
    { display: '+91-8978689859', href: 'tel:+918978689859' },
    { display: '+91-8978087179', href: 'tel:+918978087179' }
  ],
  email: { display: 'zmrfabrications@gmail.com', href: 'mailto:zmrfabrications@gmail.com' },
  address: 'Beside Mahima Sai Temple, Opp. Bharat Petroleum, Nandigama, Andhra Pradesh.',
  addressShort: 'Nandigama, Andhra Pradesh',
  pincode: '521185',
  hours: 'Available 24 hours on call',
  map: {
    embedUrl: 'https://www.google.com/maps?q=Mahima+Sai+Temple+Nandigama+Andhra+Pradesh+521185&output=embed',
    title: 'ZMR Fabrications location'
  }
}

export const primaryPhone = contact.phones[0]
