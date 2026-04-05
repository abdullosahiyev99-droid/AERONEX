import { useState, createContext, useContext } from 'react'

export const LangContext = createContext()

export const translations = {
  en: {
    nav_home:'Home', nav_book:'Book Flight', nav_dest:'Destinations',
    nav_flights:'Live Flights', nav_checkin:'Check-In', nav_signin:'Sign In',
    hero_tag:'Premium Global Aviation',
    hero_title1:'THE SKY', hero_title2:'IS YOURS',
    hero_body:'Experience aviation reimagined. First-class service, seamless booking, and real-time intelligence — wherever your journey takes you.',
    hero_cta1:'Explore Flights', hero_cta2:'View Destinations →',
    stat1:'Countries', stat2:'Daily Flights', stat3:'On-Time Rate',
    scroll:'SCROLL',
    dest_label:'Popular Routes', dest_title:'Top Destinations', dest_all:'View all routes →',
    why_label:'Why AeroNex', why_title:'Engineered for the Modern Traveler',
    book_title:'BOOK YOUR FLIGHT', book_sub:'Search 400+ airlines. Best price guaranteed.',
    from:'FROM', to:'TO', depart:'DEPART', return:'RETURN',
    adults:'Adults', children:'Children', search:'SEARCH',
    one_way:'One Way', round_trip:'Round Trip', multi:'Multi-City',
    economy:'Economy', premium:'Premium Economy', business:'Business', first:'First Class',
    results_label:'Showing', results_for:'flights for',
    cheapest:'Cheapest', fastest:'Fastest', best:'Best',
    select:'SELECT', direct:'Direct',
    no_flights_title:'No flights found',
    no_flights_sub:'Try another route or cabin class.',
    dest_page_title:'DESTINATIONS', dest_page_sub:'120+ cities. Every continent. Your next adventure awaits.',
    filter_all:'All', filter_eu:'Europe', filter_me:'Middle East',
    filter_as:'Asia', filter_am:'Americas', filter_cis:'CIS',
    book_btn:'BOOK →',
    flights_title:'LIVE FLIGHT BOARD', flights_sub:'Real-time departures and arrivals from Tashkent International',
    live:'LIVE DATA', flight:'FLIGHT', airline:'AIRLINE', destination:'DESTINATION',
    departs:'DEPARTS', gate:'GATE', terminal:'TERMINAL', status:'STATUS',
    departures:'Departures', arrivals:'Arrivals',
    on_time_today:'On Time Today', boarding_now:'Currently Boarding',
    delayed:'Delayed', total_today:'Total Flights Today',
    checkin_title:'ONLINE CHECK-IN', checkin_sub:'Complete check-in online. Choose your seat. Print your boarding pass.',
    step1:'STEP 1', step1_name:'Booking details',
    step2:'STEP 2', step2_name:'Seat selection',
    step3:'STEP 3', step3_name:'Boarding pass',
    booking_ref:'BOOKING REF', last_name:'LAST NAME', first_name:'FIRST NAME',
    nationality:'NATIONALITY', passport:'PASSPORT NO', dob:'DATE OF BIRTH', email:'EMAIL',
    continue_btn:'CONTINUE TO SEAT SELECTION →',
    avail:'Available', taken:'Taken', exit_row:'Exit Row', your_seat:'Your Seat',
    confirm_seat:'CONFIRM SEAT & CHECK IN →',
    your_flight:'Your Flight', on_time:'ON TIME',
    date:'Date', aircraft:'Aircraft', sel_seat:'Selected Seat', not_sel:'Not selected',
    class:'Class', ticket_price:'Ticket price', start_checkin:'START CHECK-IN',
    boarding_pass:'BOARDING PASS', passenger:'PASSENGER', seat:'SEAT', boarding:'BOARDING',
    print_bp:'PRINT BOARDING PASS',
    footer_copy:'© 2025 AeroNex · All rights reserved',
  },
  uz: {
    nav_home:'Bosh Sahifa', nav_book:'Chipta', nav_dest:'Manzillar',
    nav_flights:'Jonli Reyislar', nav_checkin:"Ro'yxat", nav_signin:'Kirish',
    hero_tag:'Premium Global Aviatsiya',
    hero_title1:'OSMON', hero_title2:'SIZNIKI',
    hero_body:"Aviatsiyani qaytadan kashf eting. Birinchi sinf xizmat, uzluksiz bron va real vaqt ma'lumotlari — sayohatingiz qayerga olib bormasin.",
    hero_cta1:"Reyislarni Ko'rish", hero_cta2:"Manzillarni Ko'rish →",
    stat1:'Davlat', stat2:'Kunlik Reyis', stat3:"O'z Vaqtida",
    scroll:'AYLANTIRING',
    dest_label:"Mashhur Yo'nalishlar", dest_title:'Eng Yaxshi Manzillar', dest_all:"Barcha yo'nalishlar →",
    why_label:'Nima Uchun AeroNex', why_title:'Zamonaviy Sayohatchi Uchun Yaratilgan',
    book_title:'REYSINGIZNI BRON QILING', book_sub:"400+ aviakompaniyada qidiruv. Eng yaxshi narx kafolati.",
    from:'DAN', to:'GA', depart:"JO'NASH", return:'QAYTISH',
    adults:'Kattalar', children:'Bolalar', search:'QIDIRISH',
    one_way:'Bir Tomonga', round_trip:'Borish-Kelish', multi:"Ko'p Shaharli",
    economy:'Ekonom', premium:'Premium Ekonom', business:'Biznes', first:'Birinchi Sinf',
    results_label:"Ko'rsatilmoqda", results_for:'ta reys',
    cheapest:'Arzon', fastest:'Tezkor', best:'Eng Yaxshi',
    select:'TANLASH', direct:"To'g'ridan",
    no_flights_title:'Mos reys topilmadi',
    no_flights_sub:"Boshqa yo'nalish yoki sinfni tanlab ko'ring.",
    dest_page_title:'MANZILLAR', dest_page_sub:"120+ shahar. Har bir qit'a. Keyingi sarguzashtingiz kutmoqda.",
    filter_all:'Barchasi', filter_eu:'Yevropa', filter_me:'Yaqin Sharq',
    filter_as:'Osiyo', filter_am:'Amerika', filter_cis:'MDH',
    book_btn:'BRON →',
    flights_title:'JONLI REYS TAXTASI', flights_sub:"Toshkent Xalqaro aeroportidan jonli jo'nash va kelishlar",
    live:"JONLI MA'LUMOT", flight:'REYS', airline:'AVIAKOMPANIYA', destination:'MANZIL',
    departs:"JO'NAYDI", gate:'DARVOZA', terminal:'TERMINAL', status:'HOLAT',
    departures:"Jo'nayotganlar", arrivals:'Kelayotganlar',
    on_time_today:"Bugun O'z Vaqtida", boarding_now:'Hozir Posadka',
    delayed:'Kechikmoqda', total_today:'Bugun Jami Reyislar',
    checkin_title:"ONLAYN RO'YXAT", checkin_sub:"Ro'yxatni onlayn bajaring. O'rningizni tanlang. Posadka taloni saqlab oling.",
    step1:'QADAM 1', step1_name:"Bron ma'lumotlari",
    step2:'QADAM 2', step2_name:"O'rin tanlash",
    step3:'QADAM 3', step3_name:'Posadka taloni',
    booking_ref:'BRON RAQAMI', last_name:'FAMILIYA', first_name:'ISM',
    nationality:'FUQAROLIK', passport:'PASPORT RAQAMI', dob:"TUG'ILGAN SANA", email:'ELEKTRON POCHTA',
    continue_btn:"O'RIN TANLASHGA O'TISH →",
    avail:"Bo'sh", taken:'Band', exit_row:'Chiqish Qatori', your_seat:"Sizning O'rningiz",
    confirm_seat:"O'RINNI TASDIQLASH →",
    your_flight:'Reysingiz', on_time:"O'Z VAQTIDA",
    date:'Sana', aircraft:'Samolyot', sel_seat:"Tanlangan O'rin", not_sel:'Tanlanmagan',
    class:'Sinf', ticket_price:'Chipta narxi', start_checkin:"RO'YXATNI BOSHLASH",
    boarding_pass:'POSADKA TALONI', passenger:"YO'LOVCHI", seat:"O'RIN", boarding:'POSADKA',
    print_bp:'POSADKA TALONINI CHOP ETISH',
    footer_copy:'© 2025 AeroNex · Barcha huquqlar himoyalangan',
  }
}

export function useLang() {
  return useContext(LangContext)
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (key) => translations[lang][key] || translations.en[key] || key
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}
