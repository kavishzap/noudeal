export interface Event {
  id: string
  slug: string
  title: string
  description: string
  category: "concert" | "theatre" | "festival" | "sports" | "comedy" | "conference"
  image: string
  startDate: string
  endDate: string
  venue: {
    name: string
    address: string
    city: string
    mapUrl: string
  }
  organizer: {
    name: string
    description: string
    contact: string
  }
  featured: boolean
  trending: boolean
  ticketTypes: string[]
}

export const mockEvents: Event[] = [
  {
    id: "1",
    slug: "atif-aslam-concert-mauritius",
    title: "Atif Aslam Live in Concert",
    description:
      "Experience the soulful voice of Atif Aslam live in Mauritius. An unforgettable night of music with his greatest hits.",
    category: "concert",
    image: "https://www.premiertickets.co/assets/uploads/2023/10/ATIF-ASLAM-2.jpg",
    startDate: "2025-04-05T19:00:00+04:00",
    endDate: "2025-04-05T23:30:00+04:00",
    venue: {
      name: "SVICC",
      address: "Pailles, Mauritius",
      city: "Pailles",
      mapUrl:
        "https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3739.5!2d57.47!3d-20.23",
    },
    organizer: {
      name: "Star Events Mauritius",
      description: "Bringing top international artists to Mauritius.",
      contact: "info@starevents.mu",
    },
    featured: true,
    trending: true,
    ticketTypes: ["general", "vip", "vvip"],
  },
  {
    id: "2",
    slug: "arijit-singh-concert-mauritius",
    title: "Arijit Singh Live in Mauritius",
    description:
      "Join us for a magical evening with Arijit Singh as he performs his chart-topping Bollywood hits live on stage.",
    category: "concert",
    image: "https://www.tottenhamhotspurstadium.com/media/mzrftp3l/arijit-singh-venue-900-x-800.jpg",
    startDate: "2025-05-02T19:30:00+04:00",
    endDate: "2025-05-02T23:45:00+04:00",
    venue: {
      name: "Anjalay Stadium",
      address: "Belle Vue, Mauritius",
      city: "Belle Vue",
      mapUrl:
        "https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3740.8!2d57.64!3d-20.08",
    },
    organizer: {
      name: "Bollywood Nights MU",
      description: "Hosting the best Bollywood concerts in Mauritius.",
      contact: "hello@bollywoodnights.mu",
    },
    featured: true,
    trending: true,
    ticketTypes: ["general", "premium", "vip"],
  },
  {
    id: "3",
    slug: "coldplay-island-special",
    title: "Coldplay Island Special",
    description:
      "Coldplay comes to Mauritius for a once-in-a-lifetime island special concert. Lights, music, and magic under the stars.",
    category: "concert",
    image: "https://www.jsonline.com/gcdn/authoring/authoring-images/2025/06/14/PTX1/84198380007-06132025-coldplay-at-sun-bowl-42.jpg?crop=4935,2777,x0,y0&width=3200&height=1801&format=pjpg&auto=webp",
    startDate: "2025-07-18T18:00:00+04:00",
    endDate: "2025-07-18T23:59:00+04:00",
    venue: {
      name: "Anse La Raie Open Grounds",
      address: "Anse La Raie, Mauritius",
      city: "Anse La Raie",
      mapUrl:
        "https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3742.5!2d57.63!3d-20.03",
    },
    organizer: {
      name: "Island Beats",
      description: "Global music experiences in paradise destinations.",
      contact: "contact@islandbeats.mu",
    },
    featured: true,
    trending: true,
    ticketTypes: ["general", "vip", "gold-circle"],
  },
];


export const categories = [
  { id: "all", name: "All Events", icon: "calendar" },
  { id: "concert", name: "Concerts", icon: "music" },
  { id: "theatre", name: "Theatre", icon: "drama" },
  { id: "festival", name: "Festivals", icon: "party" },
  { id: "sports", name: "Sports", icon: "trophy" },
  { id: "comedy", name: "Comedy", icon: "laugh" },
  { id: "conference", name: "Conferences", icon: "presentation" },
]
