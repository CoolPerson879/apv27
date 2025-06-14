"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Crown, Banknote, HeartHandshake, Leaf, Cpu, Globe } from "lucide-react"

interface TimelineEvent {
  id: number
  year: string
  title: string
  description: string
  region: string
  category: "Political" | "Economic" | "Social" | "Cultural" | "Environmental" | "Technological"
  period: number
}

const TimePeriods = [
  " < 1200-1450 (Period 1)",
  "1450-1750 (Period 2)",
  "1750-1900 (Period 3)",
  "1900-Present (Period 4)"
]

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "671–1025",
    title: "Srivijaya Empire's Influence",
    description: "Southeast Asian maritime empire thrives as a Buddhist and trade center.",
    region: "Southeast Asia",
    category: "Cultural",
    period: 1
  },
  {
    id: 2,
    year: "750–1258",
    title: "Islamic Golden Age",
    description: "Muslim scholars preserve and expand classical knowledge across Afro-Eurasia.",
    region: "Middle East",
    category: "Technological",
    period: 1
  },
  {
    id: 3,
    year: "750–1450",
    title: "Spread of Islam via Trade and Sufism",
    description: "Sufi missionaries and trade routes facilitate the growth of Islam in Africa and Asia.",
    region: "Africa/Asia",
    category: "Cultural",
    period: 1
  },
  {
    id: 4,
    year: "794–1185",
    title: "Heian Cultural Renaissance",
    description: "Buddhism and court culture flourish in classical Japan.",
    region: "East Asia",
    category: "Cultural",
    period: 1
  },
  {
    id: 5,
    year: "960–1279",
    title: "Technological Innovation in Song China",
    description: "Advances include gunpowder, printing, the compass, and maritime technologies.",
    region: "East Asia",
    category: "Technological",
    period: 1
  },
  {
    id: 6,
    year: "960–1279",
    title: "Economic Expansion in Song China",
    description: "Commercialization and maritime trade contribute to rapid population growth.",
    region: "East Asia",
    category: "Economic",
    period: 1
  },
  {
    id: 7,
    year: "1000",
    title: "Cultural Exchange in East Asia",
    description: "Neo-Confucianism, Buddhism, and Chinese script influence neighboring regions.",
    region: "East Asia",
    category: "Cultural",
    period: 1
  },
  {
    id: 8,
    year: "1000–1450",
    title: "Development of Feudal Systems in Europe",
    description: "Land-based hierarchies dominate governance and society in medieval Europe.",
    region: "Europe",
    category: "Social",
    period: 1
  },
  {
    id: 9,
    year: "1000–1450",
    title: "Cultural Dominance of the Catholic Church",
    description: "The Catholic Church shapes European politics, education, and daily life.",
    region: "Europe",
    category: "Cultural",
    period: 1
  },
  {
    id: 10,
    year: "1000–1450",
    title: "Great Zimbabwe and Indian Ocean Trade",
    description: "Southern African kingdom grows wealthy through regional and overseas trade.",
    region: "Africa",
    category: "Economic",
    period: 1
  },
  {
    id: 11,
    year: "1037–1450",
    title: "Decline of the Abbasids",
    description: "Turkic states like the Seljuks and Mamluks replace Abbasid political power.",
    region: "Middle East",
    category: "Political",
    period: 1
  },
  {
    id: 12,
    year: "1050–1350",
    title: "Cahokia Urbanization",
    description: "Major city in North America reflects complex social and political organization.",
    region: "North America",
    category: "Political",
    period: 1
  },
  {
    id: 13,
    year: "1096–1291",
    title: "The Crusades",
    description: "European crusades increase exposure to Eastern goods and knowledge.",
    region: "Europe/Middle East",
    category: "Cultural",
    period: 1
  },
  {
    id: 14,
    year: "1100",
    title: "Agricultural Innovations in China",
    description: "Champa rice and iron tools improve yields and support population growth.",
    region: "East Asia",
    category: "Environmental",
    period: 1
  },
  {
    id: 15,
    year: "1100–1450",
    title: "Bhakti Movement",
    description: "Hindu devotional movement stresses personal connection with the divine.",
    region: "South Asia",
    category: "Cultural",
    period: 1
  },
  {
    id: 16,
    year: "1150–1431",
    title: "Khmer Empire and Angkor Wat",
    description: "Powerful Southeast Asian kingdom known for irrigation and monumental temples.",
    region: "Southeast Asia",
    category: "Political",
    period: 1
  },
  {
    id: 17,
    year: "1185–1333",
    title: "Kamakura Shogunate in Japan",
    description: "Feudal military government with samurai warrior class emerges in Japan.",
    region: "East Asia",
    category: "Cultural",
    period: 1
  },
  {
    id: 18,
    year: "1200–1450",
    title: "Delhi Sultanate",
    description: "Muslim rulers establish a stronghold in northern India.",
    region: "South Asia",
    category: "Political",
    period: 1
  },
  {
    id: 19,
    year: "1200–1450",
    title: "Women’s Influence in Afro-Eurasian Empires",
    description: "Women in Mali, Mongol, and Muslim societies hold cultural and economic roles.",
    region: "Afro-Eurasia",
    category: "Social",
    period: 1
  },
  {
    id: 20,
    year: "1200–1450",
    title: "Maritime Innovations Enhance Trade",
    description: "Compass, astrolabe, and junk ships strengthen Indian Ocean commerce.",
    region: "Indian Ocean",
    category: "Technological",
    period: 1
  },
  {
    id: 21,
    year: "1220–1400",
    title: "Pax Mongolica",
    description: "Mongol conquests stabilize Silk Roads and promote long-distance trade.",
    region: "Central Asia",
    category: "Political",
    period: 1
  },
  {
    id: 22,
    year: "1235–1450",
    title: "Rise of the Mali Empire",
    description: "Wealth from gold and salt boosts Mali’s role in Trans-Saharan trade.",
    region: "West Africa",
    category: "Political",
    period: 1
  },
  {
    id: 23,
    year: "1300–1450",
    title: "Banking and Trade in Renaissance Italy",
    description: "Credit and bills of exchange support urban growth in Florence and Venice.",
    region: "Europe",
    category: "Economic",
    period: 1
  },
  {
    id: 24,
    year: "1315–1317",
    title: "Little Ice Age and Great Famine",
    description: "Climate shift causes agricultural failure and starvation in Europe.",
    region: "Europe",
    category: "Environmental",
    period: 1
  },
  {
    id: 25,
    year: "1331–1353",
    title: "Black Death",
    description: "Bubonic plague kills millions and disrupts societies across Eurasia.",
    region: "Eurasia",
    category: "Environmental",
    period: 1
  },
  {
    id: 26,
    year: "1350–1450",
    title: "Indian Ocean Trade Peaks",
    description: "Luxury goods flow through thriving port cities like Kilwa and Calicut.",
    region: "Indian Ocean",
    category: "Economic",
    period: 1
  },
  {
    id: 27,
    year: "1350–1450",
    title: "Decline of Silk Road Trade",
    description: "Mongol fragmentation reduces overland safety and shifts trade to sea.",
    region: "Central Asia",
    category: "Political",
    period: 1
  },
  {
    id: 28,
    year: "1368",
    title: "Founding of the Ming Dynasty",
    description: "Peasant-led rebellion overthrows Yuan rule and restores Han Chinese power.",
    region: "East Asia",
    category: "Political",
    period: 1
  },
  {
    id: 29,
    year: "1368–1433",
    title: "Maritime Expansion under Ming",
    description: "Massive junks are built, expanding China’s naval capacity and trade influence.",
    region: "East Asia",
    category: "Technological",
    period: 1
  },
  {
    id: 30,
    year: "1438",
    title: "Inca Infrastructure Projects",
    description: "Terrace farming and road networks improve communication and agriculture.",
    region: "Andes",
    category: "Environmental",
    period: 1
  },
  {
      id: 31,
      year: "1300–1600",
      title: "European Renaissance",
      description: "Emphasis on humanism and art reshapes European thought and culture.",
      region: "Europe",
      category: "Cultural",
      period: 2
    },
    {
      id: 32,
      year: "1300–1922",
      title: "Ottoman Expansion",
      description: "Ottomans rise using gunpowder, capturing Constantinople, and forming an efficient bureaucracy.",
      region: "Middle East",
      category: "Political",
      period: 2
    },
    {
      id: 33,
      year: "1438–1533",
      title: "Inca Empire Consolidation",
      description: "Inca unify the Andes with mit’a labor, road systems, and centralized storage.",
      region: "South America",
      category: "Political",
      period: 2
    },
    {
      id: 34,
      year: "1440–1750",
      title: "Spread of the Printing Press",
      description: "Gutenberg's invention allows rapid distribution of ideas, aiding reform and science.",
      region: "Europe",
      category: "Technological",
      period: 2
    },
    {
      id: 35,
      year: "1450–1600",
      title: "Advances in European Shipbuilding",
      description: "New ships like caravels and carracks enable long-distance exploration.",
      region: "Europe",
      category: "Technological",
      period: 2
    },
    {
      id: 36,
      year: "1450–1620",
      title: "Iberian Colonial Expansion",
      description: "Spain and Portugal establish global empires via maritime exploration.",
      region: "Europe/Americas",
      category: "Political",
      period: 2
    },
    {
      id: 37,
      year: "1464–1591",
      title: "Songhai Empire Dominance",
      description: "West African kingdom prospers through trade, Islamic learning, and strong governance.",
      region: "West Africa",
      category: "Political",
      period: 2
    },
    {
      id: 38,
      year: "1491",
      title: "Christian Conversion in Kongo",
      description: "King Nzinga converts to Christianity, blending it with local beliefs.",
      region: "Africa",
      category: "Cultural",
      period: 2
    },
    {
      id: 39,
      year: "1492–1750",
      title: "Columbian Exchange",
      description: "Widespread exchange of crops, animals, people, and diseases across hemispheres.",
      region: "Global",
      category: "Environmental",
      period: 2
    },
    {
      id: 40,
      year: "1498–1650",
      title: "Portuguese Indian Ocean Empire",
      description: "Portugal builds coastal trading posts, aiming to control spice routes.",
      region: "Indian Ocean",
      category: "Economic",
      period: 2
    },
    {
      id: 41,
      year: "1500",
      title: "Start of European Colonization in the Americas",
      description: "European powers begin exploiting silver and cash crops in the New World.",
      region: "Americas",
      category: "Economic",
      period: 2
    },
    {
      id: 42,
      year: "1500–1650",
      title: "Global Silver Trade Expands",
      description: "American silver fuels a global economy and contributes to inflation in Europe and China.",
      region: "Global",
      category: "Economic",
      period: 2
    },
    {
      id: 43,
      year: "1500–1750",
      title: "Rise of the Bourgeoisie",
      description: "Trade enriches European merchant class, changing class dynamics.",
      region: "Europe",
      category: "Social",
      period: 2
    },
    {
      id: 44,
      year: "1500–1800",
      title: "Indian Ocean Slave Trade Intensifies",
      description: "European presence boosts slave trading across East Africa and Asia.",
      region: "Africa/Asia",
      category: "Economic",
      period: 2
    },
    {
      id: 45,
      year: "1500–1750",
      title: "Creole Cultures Emerge",
      description: "Blending of African, Indigenous, and European cultures forms distinct traditions.",
      region: "Americas",
      category: "Cultural",
      period: 2
    },
    {
      id: 46,
      year: "1501–1722",
      title: "Safavid Empire Rises",
      description: "Shia Islam unifies Persia under centralized leadership and gunpowder power.",
      region: "Middle East",
      category: "Political",
      period: 2
    },
    {
      id: 47,
      year: "1502–1750",
      title: "Transatlantic Slave Trade Begins",
      description: "First enslaved Africans are brought to the Americas for plantation labor.",
      region: "Atlantic World",
      category: "Economic",
      period: 2
    },
    {
      id: 48,
      year: "1502–1888",
      title: "Chattel Slavery System Develops",
      description: "Africans are enslaved as property, forming a racial caste.",
      region: "Americas",
      category: "Social",
      period: 2
    },
    {
      id: 49,
      year: "1517–1648",
      title: "Protestant Reformation",
      description: "Martin Luther’s challenge leads to religious fragmentation and conflict.",
      region: "Europe",
      category: "Cultural",
      period: 2
    },
    {
      id: 50,
      year: "1520–1750",
      title: "European Domesticated Animals in Americas",
      description: "Horses, pigs, and cattle reshape American agriculture and ecosystems.",
      region: "Americas",
      category: "Environmental",
      period: 2
    },
    {
      id: 51,
      year: "1526–1750",
      title: "Mughal Cultural and Artistic Achievements",
      description: "Architecture and art blend Persian and Indian influences in India.",
      region: "South Asia",
      category: "Cultural",
      period: 2
    },
    {
      id: 52,
      year: "1526–1857",
      title: "Mughal Empire Consolidates Power",
      description: "Religious tolerance and centralized rule dominate Indian subcontinent.",
      region: "South Asia",
      category: "Political",
      period: 2
    },
    {
      id: 53,
      year: "1545–1700",
      title: "Environmental Impact of Silver Mining",
      description: "Mercury pollution and deforestation increase from mining in the Americas.",
      region: "Americas",
      category: "Environmental",
      period: 2
    },
    {
      id: 54,
      year: "1545–1700",
      title: "Catholic Counter-Reformation",
      description: "Jesuits and church reforms respond to Protestant challenges.",
      region: "Europe",
      category: "Cultural",
      period: 2
    },
    {
      id: 55,
      year: "1550–1700",
      title: "Scientific Revolution",
      description: "New approaches to science transform understandings of the universe.",
      region: "Europe",
      category: "Technological",
      period: 2
    },
    {
      id: 56,
      year: "1550–1750",
      title: "American Crops Spread Globally",
      description: "Maize and potatoes increase global food supply and populations.",
      region: "Global",
      category: "Environmental",
      period: 2
    },
    {
      id: 57,
      year: "1550–1750",
      title: "Expansion of Plantation Agriculture",
      description: "Sugar and tobacco plantations drive labor systems and deforestation.",
      region: "Americas",
      category: "Environmental",
      period: 2
    },
    {
      id: 58,
      year: "1550–1800",
      title: "Casta System in Spanish Colonies",
      description: "Spanish authorities classify people by racial ancestry in colonial society.",
      region: "Americas",
      category: "Social",
      period: 2
    },
    {
      id: 59,
      year: "1550–Present",
      title: "Formation of Syncretic Religions",
      description: "Belief systems like Vodou and Santería mix African, Indigenous, and Christian traditions.",
      region: "Americas",
      category: "Cultural",
      period: 2
    },
    {
      id: 60,
      year: "1566",
      title: "Ottoman Peak under Suleiman",
      description: "Ottoman Empire reaches height of power, law, and architecture.",
      region: "Middle East",
      category: "Political",
      period: 2
    },
    {
      id: 61,
      year: "1650–1850",
      title: "Second Agricultural Revolution",
      description: "New farming techniques increase food supply and free labor for industrial work.",
      region: "Europe",
      category: "Environmental",
      period: 3
    },
    {
      id: 62,
      year: "1685–1815",
      title: "The Enlightenment",
      description: "Thinkers advocate liberty, rights, and rational government, challenging monarchies and tradition.",
      region: "Europe",
      category: "Cultural",
      period: 3
    },
    {
      id: 63,
      year: "1750–1850",
      title: "British Industrial Revolution",
      description: "Access to coal, waterways, and colonial resources enables Britain's industrial lead.",
      region: "Europe",
      category: "Economic",
      period: 3
    },
    {
      id: 64,
      year: "1750–1900",
      title: "Global Industrial Impacts",
      description: "Urbanization, deforestation, and pollution increase with global industrialization.",
      region: "Global",
      category: "Environmental",
      period: 3
    },
    {
      id: 65,
      year: "1752–1830",
      title: "Rise of Economic Liberalism",
      description: "Economists like Smith and Ricardo promote free-market theories over mercantilism.",
      region: "Europe",
      category: "Economic",
      period: 3
    },
    {
      id: 66,
      year: "1757",
      title: "British Control in India Begins",
      description: "British East India Company wins Battle of Plassey, starting colonial dominance.",
      region: "South Asia",
      category: "Political",
      period: 3
    },
    {
      id: 67,
      year: "1764",
      title: "Spinning Jenny Invented",
      description: "Multithreaded spinning machine transforms textile production in factories.",
      region: "Europe",
      category: "Technological",
      period: 3
    },
    {
      id: 68,
      year: "1769",
      title: "Watt’s Steam Engine Patented",
      description: "Improved steam engine becomes a key power source for industry.",
      region: "Europe",
      category: "Technological",
      period: 3
    },
    {
      id: 69,
      year: "1769",
      title: "First Factory System",
      description: "Arkwright’s spinning mill organizes labor into mechanized factory production.",
      region: "Europe",
      category: "Technological",
      period: 3
    },
    {
      id: 70,
      year: "1776",
      title: "Wealth of Nations Published",
      description: "Adam Smith outlines principles of capitalism and free enterprise.",
      region: "Europe",
      category: "Economic",
      period: 3
    },
    {
      id: 71,
      year: "1775–1783",
      title: "American Revolution",
      description: "Colonists gain independence from Britain, influenced by Enlightenment ideals.",
      region: "North America",
      category: "Political",
      period: 3
    },
    {
      id: 72,
      year: "1780–1781",
      title: "Túpac Amaru II Rebellion",
      description: "Failed uprising against Spanish rule inspires future anti-colonial movements.",
      region: "South America",
      category: "Political",
      period: 3
    },
    {
      id: 73,
      year: "1789–1799",
      title: "French Revolution",
      description: "Revolution abolishes monarchy, enacts rights, but ends in violence and empire.",
      region: "Europe",
      category: "Political",
      period: 3
    },
    {
      id: 74,
      year: "1791",
      title: "Declaration of Women's Rights",
      description: "Olympe de Gouges demands gender equality during French Revolution.",
      region: "Europe",
      category: "Social",
      period: 3
    },
    {
      id: 75,
      year: "1791–1804",
      title: "Haitian Revolution",
      description: "Enslaved Haitians overthrow French rule and create the first Black republic.",
      region: "Caribbean",
      category: "Political",
      period: 3
    },
    {
      id: 76,
      year: "1792",
      title: "Wollstonecraft Advocates Women’s Rights",
      description: "Her book 'Vindication of the Rights of Woman' calls for educational equality.",
      region: "Europe",
      category: "Social",
      period: 3
    },
    {
      id: 77,
      year: "1794",
      title: "Abolition of Slavery in French Colonies",
      description: "French Republic outlaws slavery during revolutionary upheaval.",
      region: "Europe/Caribbean",
      category: "Political",
      period: 3
    },
    {
      id: 78,
      year: "1804–1815",
      title: "Napoleonic Wars",
      description: "Napoleon spreads nationalism and reforms through European conquests.",
      region: "Europe",
      category: "Political",
      period: 3
    },
    {
      id: 79,
      year: "1806–1882",
      title: "Growth of Public Education",
      description: "National education systems emerge in Europe, Japan, US, and Ottoman Empire.",
      region: "Global",
      category: "Social",
      period: 3
    },
    {
      id: 80,
      year: "1807",
      title: "Abolition of Slave Trade",
      description: "Britain and others begin outlawing transatlantic slave trafficking.",
      region: "Atlantic World",
      category: "Political",
      period: 3
    },
    {
      id: 81,
      year: "1900-1945",
      title: "Imperial Resource Extraction",
      description: "Colonial powers continue to exploit labor and resources from colonies to fuel imperial economies.",
      region: "Global",
      category: "Economic",
      period: 4,
    },
    {
      id: 82,
      year: "1904-1905",
      title: "Russo-Japanese War",
      description: "Japan defeats Russia, signaling a shift in power in East Asia and igniting unrest in Russia.",
      region: "Asia",
      category: "Political",
      period: 4,
    },
    {
      id: 83,
      year: "1908-1913",
      title: "Young Turk Revolution",
      description: "Reforms in the Ottoman Empire promote Turkish nationalism and consolidate political power.",
      region: "Middle East",
      category: "Political",
      period: 4,
    },
    {
      id: 84,
      year: "1910-1920",
      title: "Mexican Revolution",
      description: "Popular uprising overthrows dictatorship, resulting in land reform and a new constitution.",
      region: "Latin America",
      category: "Political",
      period: 4,
    },
    {
      id: 85,
      year: "1912",
      title: "Fall of Qing Dynasty",
      description: "Revolution led by Sun Yat-sen ends imperial rule in China and establishes a republic.",
      region: "Asia",
      category: "Political",
      period: 4,
    },
    {
      id: 86,
      year: "1914-1918",
      title: "World War I",
      description: "Global conflict triggered by alliances, imperial rivalries, and nationalism, causing mass casualties.",
      region: "Global",
      category: "Political",
      period: 4,
    },
    {
      id: 87,
      year: "1915-1920",
      title: "Armenian Genocide",
      description: "Ottoman Empire carries out mass killing and deportation of Armenians.",
      region: "Middle East",
      category: "Social",
      period: 4,
    },
    {
      id: 88,
      year: "1917-1922",
      title: "Russian Revolution",
      description: "Tsarist regime is overthrown; Soviet Union is established under Bolshevik leadership.",
      region: "Europe",
      category: "Political",
      period: 4,
    },
    {
      id: 89,
      year: "1918-1934",
      title: "Women’s Suffrage Expands",
      description: "Many countries grant voting rights to women following their contributions during WWI.",
      region: "Global",
      category: "Social",
      period: 4,
    },
    {
      id: 90,
      year: "1918-1922",
      title: "New Nation States in Europe",
      description: "Collapse of empires leads to formation of Poland, Czechoslovakia, Turkey, and others.",
      region: "Europe",
      category: "Political",
      period: 4,
    },
    {
      id: 91,
      year: "1919",
      title: "Treaty of Versailles",
      description: "Ends WWI, reshapes borders, and imposes heavy reparations on Germany.",
      region: "Europe",
      category: "Political",
      period: 4,
    },
    {
      id: 92,
      year: "1919-1947",
      title: "Indian Independence Movement",
      description: "Nonviolent resistance led by Gandhi challenges British colonial rule in India.",
      region: "South Asia",
      category: "Political",
      period: 4,
    },
    {
      id: 93,
      year: "1921",
      title: "Irish Independence",
      description: "Anglo-Irish Treaty creates the Irish Free State, splitting from the UK.",
      region: "Europe",
      category: "Political",
      period: 4,
    },
    {
      id: 94,
      year: "1922-1945",
      title: "Rise of Italian Fascism",
      description: "Mussolini consolidates power amid postwar instability, establishing a fascist regime.",
      region: "Europe",
      category: "Political",
      period: 4,
    },
    {
      id: 95,
      year: "1928-1942",
      title: "Soviet Industrialization",
      description: "Stalin's Five-Year Plans drive rapid industrial growth but cause mass suffering and famine.",
      region: "Europe",
      category: "Economic",
      period: 4,
    },
    {
      id: 96,
      year: "1929-1939",
      title: "Great Depression",
      description: "Global economic collapse leads to mass unemployment and rise of state intervention in markets.",
      region: "Global",
      category: "Economic",
      period: 4,
    },
    {
      id: 97,
      year: "1933-1945",
      title: "Nazi Regime and Holocaust",
      description: "Germany under Hitler initiates WWII and carries out genocide of Jews and others.",
      region: "Europe",
      category: "Political",
      period: 4,
    },
    {
      id: 98,
      year: "1939-1945",
      title: "World War II",
      description: "Deadliest conflict in history, involving total war and culminating in atomic bomb use.",
      region: "Global",
      category: "Political",
      period: 4,
    },
    {
      id: 99,
      year: "1941-1945",
      title: "Manhattan Project",
      description: "Top-secret U.S. program develops atomic weapons, used on Hiroshima and Nagasaki.",
      region: "North America",
      category: "Technological",
      period: 4,
    },
    {
      id: 100,
      year: "1945",
      title: "United Nations Founded",
      description: "Global organization created to maintain peace and foster international cooperation.",
      region: "Global",
      category: "Political",
      period: 4,
    }
  ]
  


const categories = ["All", "Political", "Economic", "Social", "Cultural", "Environmental", "Technological"]
const periods = ["All", "Period 1", "Period 2", "Period 3", "Period 4"]

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPeriod, setSelectedPeriod] = useState("All")

  const filteredEvents = timelineEvents.filter((event) => {
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory
    const periodMatch = selectedPeriod === "All" || `Period ${event.period}` === selectedPeriod
    return categoryMatch && periodMatch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Political":
        return <Crown className="h-4 w-4" />
      case "Economic":
        return <Banknote className="h-4 w-4" />
      case "Social":
        return <Users className="h-4 w-4" />
      case "Cultural":
        return <HeartHandshake className="h-4 w-4" />
      case "Environmental":
        return <Leaf className="h-4 w-4" />
      case "Technological":
        return <Cpu className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Political":
        return "bg-blue-500"
      case "Economic":
        return "bg-green-500"
      case "Social":
        return "bg-purple-500"
      case "Cultural":
        return "bg-orange-500"
      case "Environmental":
        return "bg-red-500"
      case "Technological":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Interactive Timeline</h1>
        <p className="text-lg text-muted-foreground">
          Explore major events in world history with our interactive timeline. Filter by category and period to focus on
          specific aspects of historical development.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Filter by Category:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Filter by Period:</h3>
          <div className="flex flex-wrap gap-2">
            {periods.map((period, index) => (
              <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              >
              {period === "All" ? "All" : TimePeriods[index - 1]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div
                className={`relative z-10 w-4 h-4 rounded-full ${getCategoryColor(event.category)} flex-shrink-0 mt-6`}
              />

              {/* Event card */}
              <Card className="flex-1 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {event.year}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Period {event.period}
                        </Badge>
                        <Badge variant="outline" className={`text-xs flex items-center gap-1`}>
                          {getCategoryIcon(event.category)}
                          {event.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {event.region}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-muted-foreground">No events match your current filters. Try adjusting your selection.</p>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Category Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <div key={category} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`} />
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
