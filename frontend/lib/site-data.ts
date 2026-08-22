export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  intro: string;
  image: string;
  icon: string;
  benefits: string[];
  steps: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "montaza-antena",
    title: "Montaža TV i satelitskih antena",
    shortTitle: "Montaža antena",
    eyebrow: "Stabilan signal bez kompromisa",
    description: "Montaža, usmjeravanje i servis DVB-T2 i satelitskih sustava za domove i poslovne objekte.",
    intro: "Od mjerenja signala do uredne montaže i završnog testiranja, svaki sustav podešavamo prema stvarnim uvjetima na lokaciji.",
    image: "/projects/1.JPG",
    icon: "ANT",
    benefits: ["Mjerenje i optimalno usmjeravanje signala", "Sigurna montaža i uredno vođenje kabela", "Servis postojećih antenskih sustava"],
    steps: [
      { title: "Procjena", text: "Provjeravamo lokaciju, signal i postojeću instalaciju." },
      { title: "Montaža", text: "Postavljamo nosače, antenu, kabele i potrebnu opremu." },
      { title: "Testiranje", text: "Mjerimo prijem i optimiziramo sve dostupne programe." },
    ],
    faq: [
      { question: "Koliko traje montaža antene?", answer: "Jednostavne montaže najčešće završavamo isti dan, ovisno o pristupu krovu i stanju instalacije." },
      { question: "Možete li popraviti postojeći sustav?", answer: "Da. Najprije mjerimo signal i provjeravamo antenu, pojačalo, spojeve i kabele." },
    ],
  },
  {
    slug: "starlink-internet-wifi",
    title: "Starlink, internet i Wi-Fi mreže",
    shortTitle: "Starlink i Wi-Fi",
    eyebrow: "Povezanost u svakom prostoru",
    description: "Profesionalna instalacija Starlinka, optike, 5G opreme i Wi-Fi mreža bez mrtvih zona.",
    intro: "Projektiramo stabilnu mrežu prema objektu, broju korisnika i načinu korištenja — od obiteljske kuće do poslovnog prostora.",
    image: "/projects/19.JPG",
    icon: "NET",
    benefits: ["Optimalna Starlink pozicija i zaštita kabela", "Wi-Fi pokrivenost bez mrtvih zona", "Uredna mrežna i optička instalacija"],
    steps: [
      { title: "Mjerenje", text: "Analiziramo pokrivenost, prepreke i potrebe korisnika." },
      { title: "Konfiguracija", text: "Postavljamo terminale, rutere i pristupne točke." },
      { title: "Optimizacija", text: "Testiramo brzinu, roaming i stabilnost cijele mreže." },
    ],
    faq: [
      { question: "Montirate li Starlink na krov?", answer: "Da. Biramo siguran položaj s otvorenim pogledom prema nebu i uredno provodimo kabel do opreme." },
      { question: "Možete li poboljšati postojeći Wi-Fi?", answer: "Da. Mjerenjem otkrivamo slabe zone i predlažemo mesh ili pristupne točke prema prostoru." },
    ],
  },
  {
    slug: "videonadzor-alarmi",
    title: "Videonadzor i alarmni sustavi",
    shortTitle: "Videonadzor i alarmi",
    eyebrow: "Pregled i sigurnost 24/7",
    description: "Projektiranje i ugradnja kamera, snimača i alarma s pouzdanim udaljenim pristupom.",
    intro: "Sustav prilagođavamo kritičnim točkama objekta, uvjetima osvjetljenja i potrebnom vremenu čuvanja snimki.",
    image: "/projects/23.JPG",
    icon: "SEC",
    benefits: ["Jasni kadrovi ključnih zona", "Sigurna pohrana i udaljeni pregled", "Diskretna, uredna instalacija"],
    steps: [
      { title: "Plan", text: "Definiramo zone pokrivanja, opremu i način pohrane." },
      { title: "Ugradnja", text: "Montiramo kamere, senzore, snimač i kabele." },
      { title: "Predaja", text: "Podešavamo aplikaciju i pokazujemo korištenje sustava." },
    ],
    faq: [
      { question: "Mogu li gledati kamere na mobitelu?", answer: "Da. Sustav konfiguriramo za siguran udaljeni pristup na podržanim uređajima." },
      { question: "Radite li poslovne objekte?", answer: "Da. Izvodimo sustave za kuće, urede, trgovine, skladišta i druge objekte." },
    ],
  },
  {
    slug: "montaza-televizora",
    title: "Montaža televizora i multimedije",
    shortTitle: "Montaža televizora",
    eyebrow: "Čist zid. Savršena slika.",
    description: "Sigurna zidna montaža TV-a, skriveni kabeli i povezivanje multimedijske opreme.",
    intro: "Televizor postavljamo na optimalnu visinu, odabiremo odgovarajući nosač i ostavljamo uredan prostor bez vidljivih kabela.",
    image: "/projects/13.JPG",
    icon: "TV",
    benefits: ["Fiksni, nagibni i zglobni nosači", "Skrivanje i organizacija kabela", "Spajanje audio i video opreme"],
    steps: [
      { title: "Pozicija", text: "Dogovaramo visinu, kut gledanja i vrstu nosača." },
      { title: "Montaža", text: "Sigurno pričvršćujemo nosač i televizor na zid." },
      { title: "Povezivanje", text: "Skrivamo kabele i testiramo povezanu opremu." },
    ],
    faq: [
      { question: "Može li TV na knauf zid?", answer: "U mnogim slučajevima može, nakon provjere konstrukcije i odabira odgovarajućeg pričvršćenja." },
      { question: "Nabavljate li nosač?", answer: "Možemo preporučiti i osigurati nosač prilagođen televizoru i zidu." },
    ],
  },
  {
    slug: "eon-tv-podrska",
    title: "EON TV tehnička podrška",
    shortTitle: "EON TV podrška",
    eyebrow: "Gledanje bez tehničkih prepreka",
    description: "Postavljanje, povezivanje i rješavanje poteškoća s Telemach EON TV opremom.",
    intro: "Pomažemo kod instalacije uređaja, povezivanja s mrežom, podešavanja televizora i svakodnevnih tehničkih poteškoća.",
    image: "/projects/10.JPG",
    icon: "EON",
    benefits: ["Povezivanje i početno postavljanje", "Dijagnostika slike, zvuka i mreže", "Jasne upute za korištenje"],
    steps: [
      { title: "Provjera", text: "Pregledavamo uređaj, televizor i mrežnu vezu." },
      { title: "Podešavanje", text: "Povezujemo opremu i optimiziramo postavke." },
      { title: "Podrška", text: "Objašnjavamo korištenje i rješavamo poteškoće." },
    ],
    faq: [
      { question: "Pomažete li s EON Smart Boxom?", answer: "Da. Pomažemo kod spajanja, mreže i osnovnog podešavanja podržane opreme." },
      { question: "Možete li provjeriti slab signal?", answer: "Da. Provjeravamo je li uzrok u mreži, kabelima, televizoru ili uređaju." },
    ],
  },
  {
    slug: "a1-podrska",
    title: "A1 tehnička podrška",
    shortTitle: "A1 podrška",
    eyebrow: "Ovlaštena podrška na lokaciji",
    description: "Tehnička pomoć za povezivanje i optimizaciju A1 usluga i opreme.",
    intro: "Korisnicima pomažemo povezati opremu, urediti kućnu mrežu i otkloniti poteškoće koje se mogu riješiti na lokaciji.",
    image: "/projects/7.png",
    icon: "A1",
    benefits: ["Povezivanje korisničke opreme", "Provjera kućne instalacije", "Optimizacija lokalne mreže"],
    steps: [
      { title: "Dijagnostika", text: "Provjeravamo opremu, instalaciju i simptome problema." },
      { title: "Intervencija", text: "Izvodimo potrebna spajanja i podešavanja na lokaciji." },
      { title: "Kontrola", text: "Testiramo uslugu i potvrđujemo stabilan rad." },
    ],
    faq: [
      { question: "Dolazite li na kućnu adresu?", answer: "Da, prema dogovoru i području pokrivenosti organiziramo dolazak na lokaciju." },
      { question: "Možete li urediti Wi-Fi nakon spajanja?", answer: "Da. Možemo provjeriti pokrivenost i predložiti poboljšanje kućne mreže." },
    ],
  },
];

export const projects = [
  { src: "/projects/1.JPG", alt: "Krovna TV antena montirana u Zagrebu", category: "Antene" },
  { src: "/projects/19.JPG", alt: "Vanjska oprema za stabilnu internetsku vezu", category: "Internet" },
  { src: "/projects/23.JPG", alt: "Profesionalno postavljen sigurnosni sustav", category: "Sigurnost" },
  { src: "/projects/13.JPG", alt: "Uredno izvedena multimedijska instalacija", category: "Multimedija" },
  { src: "/projects/26.JPG", alt: "Satelitska antena na obiteljskom objektu", category: "Antene" },
  { src: "/projects/29.JPG", alt: "Završena terenska instalacija AntenaPRO", category: "Internet" },
  { src: "/projects/4.png", alt: "Detalj završene antenske instalacije", category: "Antene" },
  { src: "/projects/16.JPG", alt: "Tehnička oprema ugrađena na lokaciji", category: "Sigurnost" },
];

export const contact = {
  phoneLabel: "099 333 0036",
  phoneHref: "tel:+385993330036",
  email: "info@antenapro.hr",
  address: "Banatska ulica 38, Zagreb",
};

export const PRIMARY_ROUTES = [
  "/",
  "/usluge/montaza-antena",
  "/o-nama",
  "/projekti",
  "/kontakt",
] as const;

export const SECONDARY_SERVICE_ROUTES = services
  .slice(1)
  .map((service) => `/usluge/${service.slug}`);

export const LEGAL_ROUTES = [
  "/politika-privatnosti",
  "/pravila-o-kolacicima",
] as const;

export const PUBLIC_ROUTES = [
  ...PRIMARY_ROUTES,
  ...SECONDARY_SERVICE_ROUTES,
  ...LEGAL_ROUTES,
];
